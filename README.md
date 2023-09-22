# Conda.org

Welcome to the repository for the Conda.org community website. This is the central hub for the Conda community and serves as a platform for sharing information, resources, and discussions related to Conda.

## Getting involved

To become involved with the Conda community and contribute to the website, there are a few steps you can follow:

- Join the [conda.org chat room](https://app.element.io/#/room/#conda.org:matrix.org), which is part of the [conda space on Matrix](https://app.element.io/#/room/#conda:matrix.org)
- Visit the [Root HackMD page](https://hackmd.io/DGtozSlsSjSokpYAK5-9hw), which links to everything in HackMD.
- Attend our bi-weekly meetings, which are held on Mondays at 9am US Central time / 16:00 Central European Time. - - - Please join the [Matrix room](https://app.element.io/#/room/#conda.org:matrix.org) and we will invite you.


## Implementation details

File Structure
```bash
src
 ┣ components
 ┃ ┣ Features
 ┃ ┃ ┣ index.jsx
 ┃ ┃ ┗ styles.module.css
 ┃ ┣ Header
 ┃ ┃ ┣ index.jsx
 ┃ ┃ ┗ styles.module.css
 ┃ ┣ News
 ┃ ┃ ┣ index.jsx
 ┃ ┃ ┗ styles.module.css
 ┃ ┗ NewsCard
 ┃ ┃ ┣ index.jsx
 ┃ ┃ ┗ styles.module.css
 ┣ css
 ┃ ┗ custom.css
 ┣ pages
 ┃ ┣ community.md
 ┃ ┣ index.jsx
 ┃ ┣ index.module.css
 ┃ ┗ style-guide.mdx
 ┗ sidebars.js
```

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

- `.github/`: Workflows for deployment.
- `blog/`: Blog posts. Can use `.md` (Markdown), `.mdx` (Markdown with react) or `.js` extensions. Complex posts can use their own directory.
- `docs/`: Documentation with navigation and sidebars.
- `src/`: Resources (React components, custom CSS) and logic for standalone pages.
- `src/pages`: Standalone pages. This directory contains the homepage (`index.js`) and other simpler pages (`community.md`).
- `static/`: Static resources like images and icons.
- `babel.config.js`: Configuration to install `docusaurus`.
- `docusaurus.config.js`: Configuration for `docusaurus`. Includes variables like title and description, navigation menu items, etc.
- `package.json`: More configuration to install docusaurus.
- `sidebars.js`: Support for sidebars. We use automatic mode now.


> Please note that any non-listed directories or files are generated automatically and are not relevant for modifications.

## Local Development
To run Conda.org on your local machine, follow these steps:
```bash
$ git clone
$ cd conda-dot-org
$ npm install
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Deployment

Conda.org is deployed using [Netlify](https://www.netlify.com/). Once you are ready to deploy your changes, simply push them to the master branch and Netlify will automatically build and deploy the website.

Thank you for your interest in contributing to the Conda community!

<a href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg" alt="Deploys by Netlify" /> </a>

## Code of Conduct

This repository and the website it generates are governed by the [conda organization code of conduct](CODE_OF_CONDUCT.md). We expect all contributors and participants in the Conda community to adhere to these guidelines and help maintain a welcoming and inclusive environment for all.