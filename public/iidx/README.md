Industrial Internet System (IIDS) README
========================================

This implementation of the Industrial Internet Design System (IIDS) consists of:

- [**Twitter Bootstrap**](http://twitter.github.com/bootstrap/) for the overall page layout, scaffolding, and basic components
- [**GE Bootstrap**](http://3.39.74.92:7990/projects/DXC/repos/ge-bootstrap), an extension of Twitter Bootstrap supporting GE's brand
- [**Modernizr**](http://modernizr.com/) to detect HTML5 and CSS3 features in the user's browser
- [**jQuery**](http://jquery.com/) for DOM manipulation and general front-end utility use
- [**RequireJS+jQuery**](https://github.com/jrburke/require-jquery) for Javascript code modularity.

Release Distribution
--------------------
The IIDS release distribution includes the following:

- `docs` contains all assets used by the IIDS documentation pages
- `less` contains the IIDS stylesheets, in LESS format
- `js` contains the master IIDS application JavaScript and the configuration file used by RequireJquery

## Structure

- **README.md** — A starter readme file in Markdown format.
- **History.md** — A starter history/changelog file, also in Markdown format.
- **package.json** — An [npm](https://npmjs.org/) package file for specifying information and dependencies.
- **bower.json** — A [Bower](http://bower.io/) package file for specifying information and dependencies.
- **.bowerrc** — A configuration file for Bower which tells it to look for modules on our Stash server.
- **.jshintrc** — [JSHint](http://www.jshint.com/) configuration file for managing JavaScript code quality.
- **.editorconfig** — [EditorConfig](http://editorconfig.org/) configuration file for managing coding styles within IDEs.
- **docs/**- This folder contains documentation and examples of IIDS layouts, elements, and components.
- **js/** — This folder contains a [RequireJS](http://requirejs.org/) config file.
- **less/** — This folder contains [LESS](http://lesscss.org/) stylesheets for basic and responsive styles. It also includes some variables.

## Migrating from 0.9.x/0.10.x to 1.0.0

This guide is also available on [the IIDS Confluence Page.](https://devcloud.swcoe.ge.com/devspace/display/IIDS/Migrating+from+0.9.x+to+0.10.0)

- Update script and link tags to point at the components folders. Consult `/docs/examples/` or the examples in the tearsheets for models on how to use the components.

- Make sure RespondJS is at the bottom of the page, just before</body>:

```
      <script src="./components/respond/respond.src.js"></script>
```

- In IIDS 1.0.0, common.js was renamed to require.config.js

- Note that the markup for the masthead has changed in subtle ways:

```
     <div class="navbar navbar-static-top">
          <div class="navbar-inner">
             <div class="container">...
            </div>
        </div>
     </div>
```

Refer to the sample code under "Navigation >Masthead & Navigation Bar" in `/docs/tearsheets/components.html` for a full example.

- It should be simpler to use RequireJS now. To initialize, do the following. Make sure the paths to the js and components folders are correct:

```
  <script src="./components/requirejs/require.js"></script>
  <script src="./js/require.config.js"></script>
  <script>
  require(['...'], function(...) { /* your app logic */ });
  </script>
```

## Developing the IIDS

Documentation regarding how to develop the IIDS and contribute to the project can be found at the following link:

- [Developing the IIDS](https://devcloud.swcoe.ge.com/devspace/display/IIDS/Developing+the+IIDS)

- To log a bug or request a feature please see the [IIDS JIRA page](https://devcloud.swcoe.ge.com/tracker/browse/IIDS).

© General Electric
