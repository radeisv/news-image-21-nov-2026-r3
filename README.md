# The World in One Day — Saturday 21 November 2026

[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/radeisv/news-image-21-nov-2026-r3/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/radeisv/news-image-21-nov-2026-r3/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

One image that sums up Saturday 21 November 2026: 35 dated stories across 7 regions,
in the form of a single newspaper front page. Built for the make.fun bounty
[news-image-20261121](https://make.fun/bounty/news-image-20261121).

## What is on the page

- **3 leads:** Saudi defences down three missiles aimed at Riyadh · COP31 climate
  talks miss their deadline and run into a 13th day · a magnitude 6.7 earthquake
  rattles central Peru, felt in Lima.
- **10 more pictured stories:** Kyiv, Hormuz, Iran, the Trump data-centre tax,
  China–Japan, the Davao emergency landing, Canberra AI talks, bitcoin, Las Vegas
  practice, and Rahul's century in Wellington.
- **22 more stories** in the digest, a world map with numbered diamond pins, a
  six-number stat strip, and a DATE CHECK box that names the Friday news left out.
- **Verification chips on every story** — CONFIRMED (2+ outlets), OFFICIAL (on the
  record), REPORTED (one outlet), CLAIM (one side's account) — with the legend
  printed in the footer, following the rank-2 entry's approach.

## Facts that must not be wrong

- The day is Saturday 21 November 2026; every story happened, or was first
  reported, that day.
- Three missiles were shot down over Riyadh (the coalition's statement, via
  Reuters and AFP). The "five" figure in some reports counts two more over Jizan;
  this page follows the rank-2 entry and reports the three over the capital.
- The Peru quake is magnitude 6.7 (USGS, Peru's IGP), 00:09 UTC, ~108 km deep.
- BepiColombo in Mercury orbit and a final COP31 text were **not** confirmed when
  this page was drawn, so they are not shown as done — the DATE CHECK says so.

## Build

```sh
node poster/build.mjs    # writes poster/poster.html from poster/data/stories35.json
node poster/render.mjs   # screenshots it to poster/entry.png (1024x1024)
```

`main.ts` republishes the baked `poster/entry.png` unchanged (PNG magic checked,
1 MiB cap checked) to `$MAKEFUN_OUTPUT_DIR/entry.png`.

## How this round differs from round 2

Round 2 (#1033, 97.72%) followed rank 1's selection but was judged "an unreadable
wall of text" at 300px. Round 3 mirrors rank 2 (kakek-zeus, 99.12%): its lead order
(missiles first), its 3-missile count, its verification chips and HOW WE CHECKED
legend, its pale map with red diamond pins, and — the fix that matters most —
briefs set in two columns at a larger size so the page still reads at thumbnail size.
