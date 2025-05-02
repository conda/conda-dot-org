# conda-dot-org

[![Netlify Status](https://api.netlify.com/api/v1/badges/2db454b7-f4c7-409c-8f0d-29bcb5029577/deploy-status)](https://app.netlify.com/sites/conda-dot-org/deploys)

This is the repository for the conda.org community website. To become involved:

- Join the [conda-dot-org channel](https://conda.zulipchat.com/#narrow/channel/471465-conda-dot-org), which is part of the [conda organization on Zulip(https://conda.zulipchat.com)
- Visit the [Root HackMD page](https://hackmd.io/DGtozSlsSjSokpYAK5-9hw), which links to everything in HackMD.

## Code of Conduct

This repo and the web site it generates are governed by the [conda organization code of conduct](CODE_OF_CONDUCT.md).

## Implementation details

It is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator. The
contents are structured like this:

- `.github/`: Workflows for deployment.
- `blog/`: Blog posts. Can use `.md` (Markdown), `.mdx` (Markdown with react) or `.js` extensions.
  Complex posts can use its own directory.
- `docs/`: Documentation with navigation and sidebars.
- `src/`: Resources (React components, custom CSS) and logic for standalone pages
  - `src/pages`: Standalone pages. This directory contains the homepage (`index.js`) and other simpler pages (`community.md`).
- `static/`: Static resources like images and icons.
- `babel.config.js`: Configuration to install `docusaurus`.
- `docusaurus.config.js`: Configuration for `docusaurus`. Includes variables like title and description, navigation menu items, etc.
- `package.json`: More configuration to install `docusaurus`.
- `sidebars.js`: Support for sidebars. We use in automatic mode now.

> Non listed directories or files are generated automatically are not relevant for modifications.

## Local Development

### Using build commands
```bash
$ git clone
$ cd conda-dot-org
$ npm install
$ npm run start
```

This command starts a local development server and opens up a browser window.
Most changes are reflected live without having to restart the server.

### Using Docker
To use this application on your local machine, you need to have Docker installed. Docker is a platform for building, shipping, and running applications in containers.

Once you have Docker installed, navigate to the `root` folder of the application and run the command `docker compose up`. This command will install all the necessary dependencies and start the development server at `localhost:3000`.

Note that if you're running Docker on Windows, you may need to use `docker-compose` instead of `docker compose`.

After running the command, you should see the output in your terminal indicating that the application is up and running. You can then access the application by navigating to `localhost:3000` in your web browser

## Deployment

<a href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg" alt="Deploys by Netlify" /> </a>
