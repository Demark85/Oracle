# Oracle

Concept landing page for a future Smite 2 statistics companion (inspired by SmiteGuru) that renders against curated mock data while we wait for the official API.

## Structure
- `index.html` – markup for the hero, player search, leaderboard, meta, match feed, service health, news, roadmap, toolkit, docs, community, FAQ panels, plus the new Create Profile modal shell.
- `styles.css` – neon-dark design language inspired by esports dashboards with extra layouts for the toolkit cards, onboarding steps, signup form, FAQ grid, and modal treatment.
- `scripts/data.js` – sample player, leaderboard, meta, match, service health, news, roadmap, toolkit, onboarding, and FAQ data.
- `scripts/app.js` – lightweight render + search helpers powering every panel, including the toolkit grid, onboarding list, FAQ entries, signup form messaging, and the Create Profile workflow.

## Getting started
Open `index.html` in any modern browser. No build tooling or external dependencies are required.

If you prefer to preview the site via Python’s static server, make sure you run the command from the project directory so the document root is correct:

```bash
cd /workspace/Oracle
python -m http.server 4173
```

Then visit `http://localhost:4173/index.html`. Press `Ctrl+C` in the same terminal to stop the server when you’re done.

## Syncing your fork to GitHub
The codespace currently tracks a local branch named `work`. If you only see the README on GitHub it likely means the branch has not been pushed yet. To publish the site files:

1. Point the repo at your GitHub fork (only needed once):
   ```bash
   git remote add origin git@github.com:<your-username>/<your-repo>.git
   # or use https://github.com/<your-username>/<your-repo>.git if you prefer HTTPS
   ```
2. Push the local branch so GitHub receives the commits:
   ```bash
   git push -u origin work
   ```
3. Subsequent pushes only require `git push`.

Use `git status -sb` any time to confirm there are no pending changes before pushing.

## Launch checklist
Follow the in-app “Stand Up Oracle for Your Team” section or mirror the steps below to make the concept site production-ready for your community:

1. **Clone + install** – `git clone` your fork and optionally run `npm install` if you plan to add tooling. Everything works out of the box with static hosting.
2. **Replace mock data** – swap the arrays in `scripts/data.js` for real fetchers once Hi-Rez drops the Smite 2 API.
3. **Brand it** – update the logo text, hero copy, and CSS tokens to match your team colors.
4. **Deploy** – push to Netlify, Vercel, or GitHub Pages. The site is 100% static so deploys finish in seconds.

Use the new Launch Toolkit, Quickstart docs, and FAQ sections on the page itself as living documentation for collaborators who need context without opening this README.
