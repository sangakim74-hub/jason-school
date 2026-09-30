

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


FIX40 2026-09-29
- Fixes Today cross-device sync by releasing local pending state immediately after a successful server POST.
- Keeps rapid taps batched.
- Re-reads server once after save and restores the batch if a near-simultaneous second-device write erased it.
- Pauses the 1-second poll while a checkbox save is in flight.
- Keeps FIX38 Add/Edit behavior unchanged.
