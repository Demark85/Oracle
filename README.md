 # Oracle
+
+Concept landing page for a future Smite 2 statistics companion (inspired by SmiteGuru) that renders against curated mock data while we wait for the official API.
+
+## Structure
+- `index.html` – markup for the hero, player search, leaderboard, meta, match feed, news, and roadmap panels.
+- `styles.css` – neon-dark design language inspired by esports dashboards.
+- `scripts/data.js` – sample player, leaderboard, meta, match, news, and roadmap data.
+- `scripts/app.js` – lightweight render + search helpers to populate the UI, including a roadmap feed.
+
+## Getting started
+Open `index.html` in any modern browser. No build tooling or external dependencies are required.
+
+If you prefer to preview the site via Python’s static server, make sure you run the command from the project directory so the document root is correct:
+
+```bash
+cd /workspace/Oracle
+python -m http.server 4173
+```
+
+Then visit `http://localhost:4173/index.html`. Press `Ctrl+C` in the same terminal to stop the server when you’re done.
+
+## Syncing your fork to GitHub
+The codespace currently tracks a local branch named `work`. If you only see the README on GitHub it likely means the branch has not been pushed yet. To publish the site files:
+
+1. Point the repo at your GitHub fork (only needed once):
+   ```bash
+   git remote add origin git@github.com:<your-username>/<your-repo>.git
+   # or use https://github.com/<your-username>/<your-repo>.git if you prefer HTTPS
+   ```
+2. Push the local branch so GitHub receives the commits:
+   ```bash
+   git push -u origin work
+   ```
+3. Subsequent pushes only require `git push`.
+
+Use `git status -sb` any time to confirm there are no pending changes before pushing.
