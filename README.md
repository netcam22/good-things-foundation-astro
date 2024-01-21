# 🧞 Good Things Foundation Astro

by Annette Le Sage version 1.0 (updated 21/1/24)

This is a demo project for a sample charity website in the form of a Single Page Application. It was developed with 'Vue' - Vue, using 'Vite' - Vite and then migrated to Astro.

## Project Structure

Vue Single-File Components are used which incorporate JavaScript, HTML and CSS into one file. A data-driven approach has been taken in the design, with values stored in the state for page content and some css classes.

Components have been built with reusability in mind, allowing the potential for further extension to use in a component library. An example of this flexibility can be demonstrated in the conditional rendering within the HeadlineBlock component, in which paragraphs and buttons are optional.

When developed in Vue, the project used Vue's store library 'Pinia' - Pinia, to enable state to be shared among components. It also used Vue Router to create routes for the navigation menu.

The BEM naming convention has been used to create the css for the project. Components have generally been considered as blocks, although in some cases when components are intended to be used as direct children of parent components, they are considered as elements of their parent block. An example of this can be demonstrated in the NavItem component, where the component is clearly a child of NavMenu. The ability to modify css classes in component use enables flexibility in component styling.

## 🚀 Migration from Vue to Astro

Most of the content created as a Vue.js project was used, with some aspects adapted for use in Astro.

The stores directory which held Pinia stores in Vue was copied to the project, but the data structures in each Pinia stores were adapted into IIFE's (Immediately Invoked Function Expressions) with closures.

The views directory was retained from Vue and matching files for each view were created in Astro's pages directory. The views directory files were renamed so avoid naming conflicts with those in the pages directory.

The content from App.vue and index.html in the Vue application were merged into Layout.astro.

The nav menu in Astro uses the menu items held in the navItems store and. The  Nav menu component was refactored to use html a tags, removing the need for Vue router.

Minor modifications were needed within the components for the functionality to work within Astro. The different data structures used in the store meant that the functions used to access the the closures in the stores needed modifying with braces. In addition, the paths from the components to the store needed to be defined differently since the @ to define the path to the Pinia store was not recognised by Astro.

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

## Potential for Extension

There is potential for components to be separated out further for greater reusability and generic use. An example of this is the opportunity to refactor the button element into a single reusable component, into which preferred css classes and data values could be passed in depending on design and functionality.

Separation of concerns could be developed more extensively. For example, variables for css classes could be separated, with core css for blocks and elements living within the components and modifiers passed into components for flexible reuse.

