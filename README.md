# 🧞 Good Things Foundation

by Annette Le Sage version 1.0 (updated 19/1/24)

The Good Things Foundation project was developed in Vue.js and then migrated to Astro.

## 🚀 Migration from Vue to Astro

Most of the content created as a Vue.js project was used, with some aspects adapted for use in Astro.

The stores directory which held Pinia stores in Vue was copied to the project, but the data structures in each Pinia stores were adapted into IIFE's (Immediately Invoked Function Expressions) with closures.

The views directory was retained from Vue and matching files for each view were created in Astro's pages directory. The views directory files were renamed so avoid naming conflicts with those in the pages directory.

The content from App.vue and index.html in the View application were merged into Layout.astro.

The nav menu used the menu items held in the navItems store and the Nav menu component was modified to use html a tags, removing the need for Vue router.

Some modifications were needed to the components to correspond with the changes. The different data structures used in the store meant that the functions used to access the the closures in the stores needed modifying with braces. In addition, the paths from the components to the store needed to be defined fully.

Overall, the structure and content of the app created in Vue provided content suitable to migrate to an Astro app with the above changes.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |



