

FIX31 2026-09-29
- Restores the registered Production OAuth callback.
- Temporary Netlify Preview no longer attempts Sign in, preventing invalid_client.
- Preview is for visual QA: Add/Edit visibility, layout, and removal of kkkkk test items.
- Live Sync sign-in remains a Production-only test after Preview passes.


FIX32 2026-09-29
- Aligns class supply checkboxes with the first line of supply text on mobile.
- Keeps Add/Edit visible in Preview and keeps kkkkk cleanup from FIX31.


FIX33 2026-09-29
- Vertically centers each class-supply checkbox with its matching text block.
- Removes the top-offset that made checkbox/text rows look uneven.


FIX34 2026-09-29
- Aligns each supply checkbox with the FIRST text line, including wrapped Science Book text.
- Uses top alignment with a 4px text offset so single-line and two-line supply labels share one visual baseline.
