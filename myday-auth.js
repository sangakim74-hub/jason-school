/* My Day login uses the existing registered school web callback. */
(function(global){
'use strict';
const ORIGIN='https://jason-school.netlify.app', API='https://eizzn21-eizzn-bdffcx.laravel.cloud', CLIENT='01a0b371-adc6-70c4-a0c0-ba4bca2d3355', CALLBACK=ORIGIN+'/auth/callback', KEY='jason-myday-login';
function create(env){
 const {local,session,crypto,request,navigate,replaceUrl,writeSchool}=env;
 function random(n){const b=new Uint8Array(n);crypto.getRandomValues(b);return Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');}
 async function begin(){
  if(env.origin!==ORIGIN)throw Error('PREVIEW_ONLY');
  const verifier=random(48),state=random(24),hash=new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));
  const challenge=env.base64(Array.from(hash,x=>String.fromCharCode(x)).join('')).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  session.setItem('pkce_code_verifier',verifier);session.setItem('oauth_state',state);
  session.setItem(KEY,JSON.stringify({state,created:env.now()}));
  navigate(API+'/oauth/authorize?'+new URLSearchParams({client_id:CLIENT,redirect_uri:CALLBACK,response_type:'code',scope:'',state,code_challenge:challenge,code_challenge_method:'S256'}));
 }
 async function callback(search){
  let context;try{context=JSON.parse(session.getItem(KEY)||'null');}catch(e){context=null;}
  if(env.origin!==ORIGIN)throw Error('PREVIEW_ONLY');
  if(context&&context.state!==session.getItem('oauth_state')){session.removeItem(KEY);context=null;}
  // School-initiated authentication still runs the unchanged original school page.
  if(!context){const r=await request('/index.html',{cache:'no-store'});if(!r.ok)throw Error('SCHOOL_PAGE_UNAVAILABLE');writeSchool(await r.text());return 'school';}
  const q=new URLSearchParams(search),code=q.get('code'),state=q.get('state'),expected=session.getItem('oauth_state'),verifier=session.getItem('pkce_code_verifier');
  replaceUrl('/auth/callback');
  const cleanup=()=>{session.removeItem(KEY);session.removeItem('oauth_state');session.removeItem('pkce_code_verifier');};
  const fail=()=>{cleanup();navigate('/myday.html?myday_login=failed',true);return 'failed';};
  if(q.has('error')||!code||!state||!expected||state!==expected||state!==context.state||!verifier||!Number.isFinite(context.created)||env.now()-context.created>600000||env.now()<context.created)return fail();
  try{
   const r=await request(API+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded',Accept:'application/json'},body:new URLSearchParams({grant_type:'authorization_code',client_id:CLIENT,redirect_uri:CALLBACK,code,code_verifier:verifier})});
   const data=await r.json();if(!r.ok||typeof data.access_token!=='string'||!data.access_token||typeof data.refresh_token!=='string'||!data.refresh_token)return fail();
   local.setItem('access_token',data.access_token);local.setItem('refresh_token',data.refresh_token);
   cleanup();navigate('/myday.html?myday_login=success',true);return 'myday';
  }catch(e){return fail();}
 }
 return {begin,callback};
}
global.JasonMyDayAuth={create};
if(global.location)Object.assign(global.JasonMyDayAuth,create({origin:global.location.origin,local:global.localStorage,session:global.sessionStorage,crypto:global.crypto,request:(...a)=>global.fetch(...a),now:()=>Date.now(),base64:s=>global.btoa(s),navigate:(url,replace)=>replace?global.location.replace(url):global.location.assign(url),replaceUrl:url=>global.history.replaceState({},'',url),writeSchool:html=>{global.document.open();global.document.write(html);global.document.close();}}));
})(typeof window!=='undefined'?window:globalThis);
