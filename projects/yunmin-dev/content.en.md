## Overview

My friends were each buying a domain and building a personal site, so I made one too. **yunmin.dev** is the main space where I build whatever I like. Games live at `game.yunmin.dev` and my CV at `me.yunmin.dev`.

## Design

I love climbing, so the whole site looks like a **climbing gym wall**.

- The dots on the ivory background are the wall's bolt holes (T-nuts).
- Section numbers look like the colored tape that marks where a route starts.
- On the home wall, holds of the same color form one route, and each route's TOP leads to a different page.

## Every hold is drawn in code

There isn't a single hold image. I wrote a small generator that always draws the same shape for the same seed.

1. Scatter a few points around an ellipse and wobble their radius.
2. Join them with a smooth curve (Catmull-Rom → Bézier).
3. Add shadow, highlight, grip texture and a bolt hole.

You can play with it yourself in the [Hold Generator](/lab/holds/).

## Structure

No build tools, just HTML, CSS and JS. All the text on screen lives in one file, `data.js`, and every page reads from it. It's deployed as static files on Cloudflare Workers.

## Log

### 2026.10.09

- First versions of Home, About, Projects, Lab, Climbing and the 404 page
- Filled in my info and added project detail pages

### 2026.10.14

- Cut the home page down to a single wall where you pick a route to climb into a page.

### 2026.11.02

- Added an English version, switchable with the KO / EN button in the top right.
