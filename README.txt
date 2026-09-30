

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
