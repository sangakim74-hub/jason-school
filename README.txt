

FIX36 2026-09-29
- Fixes Mom Add/Edit activation: triple-tap listener now attaches to the actual #appTitle element.
- Keeps FIX35 Today sync retry/verification logic unchanged.


FIX37 2026-09-29
- Today checkbox sync now stores a timestamp per checkbox and merges by newest change.
- Prevents one phone's stale whole-state refresh from erasing the other phone's Today check.
- Keeps FIX36 Mom Add/Edit activation and Tomorrow behavior.


FIX38 2026-09-29
- Makes Mom Add/Edit open reliably on Today with both click and touch handling.
- Opens editor before running editor refresh logic so a secondary UI error cannot block the button.
- Keeps FIX37 Today sync timestamp merge logic unchanged.


FIX39 2026-09-29
- Rapid Today/Tomorrow checkbox taps are batched for 320ms and saved together.
- Pending local checks are always overlaid on incoming server data, preventing on/off flicker.
- A whole batch is verified before pending checks are cleared, so rapid taps cannot all disappear.
- Keeps FIX38 Add/Edit behavior unchanged.


FIX41 2026-09-29
- Based on FIX39, where local Today checkbox taps stayed checked.
- Forces every sync GET to bypass browser/intermediary cache using cache:no-store, no-cache headers, and a timestamp query.
- Prevents a freshly saved Today state from being replaced by an older cached server response.
- Keeps rapid-tap batching and Add/Edit behavior.

FIX41: force fresh sync reads with no-store/no-cache and cache-busting timestamp.


FIX42 2026-09-30
- Today and Tomorrow checkbox state now sync through stable live slots instead of depending only on future calendar-date buckets.
- At midnight, yesterday's Tomorrow slot is promoted to Today's slot automatically.
- Current live slots are also copied back into dated history on save.
- Keeps FIX41 no-cache reads, rapid tap batching, and Add/Edit behavior.
