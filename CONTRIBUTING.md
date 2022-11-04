[github-forking-how-to]: https://docs.github.com/en/get-started/quickstart/fork-a-repo
[installing-git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[installing-npm]: https://nodejs.org/en/download/
[pro-git]: https://git-scm.com/book/en/v2

# Contributing

Welcome to our contributing guide. In this guide, you will find everything you need
to get up and running as a contributor to conda.org. This is a contributing guide
for individuals contributing content and for those who wish to contribute code.
A more detailed breakdown of these two personas is shown below:

- **Content contributors**
    - These individuals wishing to help contribute content for the actual website
      which can include news and blog posts
- **Technical contributors**
    - These are individuals who want to contribute to the actual code of the website
      or somehow modify the way it looks by using HTML, CSS or Javascript.

In this guide, we will start off by explaining contribution steps that apply
to both personas and then branch off to explain specifics for each.


## Github flow

### Prerequisites

To follow this guide, you will need to have these programs installed on your computer:

- git: [installation link][installing-git]

It is also highly encouraged that you at least have a basic understanding of how to use
git at the command line. If you do not, please read check out the book [Pro Git][pro-git]
available for free from the official git website.

### Github flow

#### 1. Creating a fork

The very first step to contributing is creating your own fork of the conda-dot-org
repository. If you have never done this before, we strongly encourage you to read
the [Fork a repo][github-forking-how-to] guide from GitHub first.

#### 2. Clone your repository

After you have done that, you are ready to clone this repository to your local computer
where you can begin making edits. The commands for doing so will be different depending
on your user name, but a typical example is shown below:

```
$ git clone git@github.com:username/conda-dot-org.git
```

#### 3. Creating a new branch

Once you have cloned this repository, you now need to create a branch that will hold the
work you are planning to contribute. You can do that with the following command:

```
$ git checkout -b my-new-contribution
```

#### 4. Making edits and committing your changes

At this point, you are ready to start editing files. Once you have made the necessary edits,
you can commit these edits by running the following commands. Here, we assume that I have
added a new file called "article.md" to the repository:

```
$ git add article.md 
$ git commit -m "adding my new article"
```

#### 5. Pushing your changes to GitHub

Once that runs, you can "push" these changes to GitHub by running the following command:

```
git push
```

The first time you do this, the output of this command always includes a link you can 
use to open a pull request. Click this link to open a pull request against the main 
branch in the conda-dot-org repository. On the pull request creation form, always
be sure that the "base" branch is the "main" branch for conda-dot-org.

That completes the entire workflow for submitting new changes. After you submit your pull
request, we will try our best to review it in a timely manner. If you need to make any more
edits or changes based on this review, you will just need to repeat steps four and five.

## Setting up a local version of the site

The above steps are great for adding your changes to git and submitting them for review,
but what if you want to preview exactly what your changes will look like on the website?
The answer to this involves running a local version of the website that automatically 
updates as you change and add files on your computer. Below, we will walk through the
steps necessary to do just that.

### Prerequisites

- npm: [installation link][installing-npm]

NPM (Node Package Manager) is a program used for installing Javascript dependencies on your
computer. To follow this guide, it is not necessary that you know Javascript, but you will 
need to be comfortable with running a couple different commands in the terminal that will 
install these dependencies and then run the server locally.

### Installing NPM dependencies

Provide that you have already forked and cloned the repository (see above), the first step 
is running the following command to install all dependencies:

```
npm install 
```

After this command finishes, you can run the following command to get the website running
locally:

```
npm run start
```

That's it! Every time you make edits, the website will dynamically reload showing your
new updates/additions. See something that does not quite look right or is not showing
up how you expect? Be sure to check the error log at the terminal for any information 
that can help you.

## Content contributors

### Creating a news post


### Creating a blog post

*Coming soon! We are still figuring out exactly how this will look*


## Technical contributors

*Coming soon! We are still figuring out exactly how this will look*