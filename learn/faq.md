---
sidebar_position: 2
---

# Frequently asked questions

## What is a conda channel?

Conda channels are the locations where conda packages are stored. By default, packages are automatically downloaded and updated from the `default` channel, but other channels (i.e., [conda-forge](https://conda-forge.org/)) can be specified using the `--channel` flag, as shown in the example below:

```
conda install rust --channel conda-forge
```

For more information, please check out the [conda documentation page on channels](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/channels.html).

## What is conda-forge?

[Conda-forge](https://conda-forge.org/) is a [community-led GitHub organization](https://github.com/conda-forge) that provides access to thousands of conda package recipes. All of these recipes are open source and can be installed with the conda package manager by specifying conda-forge as the channel.

## What is a feedstock?

A feedstock is a conda package repository.

## How can I search for packages?

There are many ways to search for packages, either in your browser or in the command line. Many package organizations keep lists of their packages on their websites, so you can either use a search engine or go directly to package organization websites like [conda-forge.org](https://conda-forge.org/) and [bioconda.github.io](https://bioconda.github.io/). Anaconda also provides package hosting on [anaconda.org](https://anaconda.org/).

If you want to use conda to search for packages, use the command `conda search`. Enter `conda search -h` for more information.

## What is the difference between `conda create` and `conda env create`?

`conda create` is a command that creates a conda environment with a custom name (listed after the `-n` flag) or full path to environment location, also known as the prefix (indicated by the `-p` flag). This command can also specify packages to install into that environment at the same time as creating it. Below is an example of this command being used to create an environment named `new-env`, installing Python 3.9 along with `package_name1` and `package_name2`:

```
$ conda create -n new-env python==3.9 package_name1 package_name2
```

`conda env create` is a command that [creates a conda environment based on an environment definition file](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-from-an-environment-yml-file). Typically, the environment name is stated in the first line of the `environment.yml` file (this is the default name of an environment definition file), but it can be named other things as long as you specify the file name in the command using the `-f` flag. For example, the following command will enable you to create a conda environment that is defined in a file called `my-exported-env.yml`:

```
$ conda env create -f my-exported-env.yml
```

## Why should I use conda and not just install everything with pip?

Pip can only install Python packages and (unlike conda) cannot account for the dependency graphs connected to each package that it installs, which can break global system dependencies and/or the user's dependency stacks. Even when using pip with a tool like virtualenv, which creates isolated Python environments, it can still inadvertently install Python packages to the wrong places.

On the other hand, conda is a powerful package and environment manager that can install much more than just Python libraries. With conda, users can install entire software stacks (while remaining assured that all dependencies are accounted for and resolved), as well as R programs and libraries, Node.js, Java programs, C++ programs and libraries, Perl programs, and more. Conda has an environment management system that allows users to have all of these installed across multiple different environments; it also enables installation of complex software stacks on a system without needing root privileges, due to it being able to do all of these software and package installations in an isolated, userspace manner.

## Why is it not recommended to install everything into the `base` environment?

The Python packaging system is prone to develop incompatibilities over time; the more packages you install into one conda environment, the more complex the dependency graph gets, which makes the default `base` environment prone to problems and breakage each time another package is installed.

For this reason, it is highly recommended to utilize separate conda environments for each project/purpose in order to mitigate the dependency management issues of the Python packaging system and to keep project dependencies as separate and simple as possible.

## What is a dependency graph?

A [dependency graph](https://en.wikipedia.org/wiki/Dependency_graph) is a tree-like data structure where each node points to all of the things that it depends on. Then, each of those dependency nodes point at all of their particular dependencies, and so on. Simply put, it's a graph that represents how objects depend on each other.

Each separate conda environment would have its own dependency graph. The items in a dependency graph would be the packages that conda manages and what each of those packages require as a prerequisite to function properly.

## What are the rules for content on conda.org?

[conda.org](https://conda.org) is a website which represents the entire conda community. To make sure that not any one project, company or organization
gets preferential treatment, we have defined the following guidelines to follow when contributing new content and updating
existing content:

- Content not present in the blog should speak of the wider ecosystem and not prioritize any particular tool, channel, company or organization.
- The blog is an area where particular tools, channels, companies or organizations may be promoted.

## How do I submit a blog post to conda.org?

See our [Contributing](https://github.com/conda-incubator/conda-dot-org/blob/main/CONTRIBUTING.md) documentation for more information on submitting blog posts.

## I see a problem with the website. How do I report it?

Please create an [issue](https://github.com/conda-incubator/conda-dot-org/issues) in GitHub to report any problems with the website. We also welcome pull requests!

## Where can I find help?

If you need help with any aspect of the conda ecosystem, feel free to reach out to us via any of our online channels.

For more information, read [How to reach us](/community/#how-to-reach-us) on the [Community](/community) page.

 
