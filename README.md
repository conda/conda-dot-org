# conda-dot-org

This is the repository for the conda.org community website. 

* Join the [conda Slack Workspace](https://join.slack.com/t/conda/shared_invite/zt-1ik6vglro-AdmjqKxjTbD7D0eRBfMr6A)
    * and then the [conda-dot-org channel](https://conda.slack.com/archives/C03Q9KCJPH8)
* [Root HackMD page](https://hackmd.io/DGtozSlsSjSokpYAK5-9hw) - links to everything in HackMD.
* We meet every two weeks on Monday at 9am US Central time / 16:00 Central European Time. Please join the Slack Channel and we will invite you.

### Join the Design Team

* Join the [conda Slack Workspace](https://join.slack.com/t/conda/shared_invite/zt-1ik6vglro-AdmjqKxjTbD7D0eRBfMr6A)
    * and then the [conda-dot-org-design channel](https://conda.slack.com/archives/C0408NMPJ5S)
* [Design Team Root HackMD page](https://hackmd.io/XxHGKH33TRqKJaWKGUNppw) - links to every design document in HackMD.

### Join the Content Team

* Join the [conda Slack Workspace](https://join.slack.com/t/conda/shared_invite/zt-1ik6vglro-AdmjqKxjTbD7D0eRBfMr6A)
    * and then the [conda-dot-org-content channel](https://conda.slack.com/archives/C03V5NSRNH5)
* [Content Team Root HackMD page](https://hackmd.io/V6mHdS7iSuSHchEVjVjcKQ) - links to every design document in HackMD.
* We meet every two weeks on Tuesday at 9am US Central time / 16:00 Central European Time. Please join the Slack Channel and we will invite you.

### Join the Implementation Team

* Join the [conda Slack Workspace](https://join.slack.com/t/conda/shared_invite/zt-1ik6vglro-AdmjqKxjTbD7D0eRBfMr6A)
    * and then the [conda-dot-org-implementation channel](https://conda.slack.com/archives/C03V5P9KSQ7)
* [Implementation Team Root HackMD page](https://hackmd.io/e8Y26n9gQWeUeSojkqlv5w) - links to every Implementation document in HackMD.

## Implementation details

It is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator. The
contents are structured like this:

- `.github/`: Workflows for deployment.
- `blog/`: Blog posts. Can use `.md` (Markdown), `.mdx` (Markdown with react) or `.js` extensions.
   Complex posts can use its own directory.
- `docs/`: Documentation with navigation and sidebars.
- `src/`: Resources (React components, custom CSS)  and logic for standalone pages
   - `src/pages`: Standalone pages. This directory contains the homepage (`index.js`) and other simpler pages (`community.md`).
- `static/`: Static resources like images and icons.
- `babel.config.js`: Configuration to install `docusaurus`.
- `docusaurus.config.js`: Configuration for `docusaurus`. Includes variables like title and description, navigation menu items, etc.
- `package.json`: More configuration to install `docusaurus`.
- `sidebars.js`: Support for sidebars. We use in automatic mode now.

> Non listed directories or files are generated automatically are not relevant for modifications.

## Local Development

```bash
$ git clone
$ cd conda-dot-org
$ npm install
$ npm run start
```

This command starts a local development server and opens up a browser window. 
Most changes are reflected live without having to restart the server.

## Deployment

<a href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg" alt="Deploys by Netlify" /> </a>

