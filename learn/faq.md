---
sidebar_position: 2
---

# Frequently asked questions

## Why should I use conda?

Conda offers several advantages that make it a popular choice for package management and environment management:

- **Simplified Package Management**: Conda simplifies the installation, management, and updating of software packages and their dependencies. It provides a unified interface for package installation across different programming languages.

- **Cross-Platform Compatibility**: Conda works seamlessly on Windows, macOS, and Linux operating systems. It ensures consistent package installations and avoids compatibility issues across different platforms.

- **Extensive Package Ecosystem**: Conda provides access to a large collection of pre-built packages for various domains, including data science, machine learning, scientific computing, and more. This extensive ecosystem saves time by eliminating the need for manual compilation and configuration.

- **Environment Management**: With conda, you can create isolated environments for different projects. These environments allow you to manage and control the dependencies and versions of packages specific to each project, ensuring reproducibility and avoiding conflicts between different software requirements.

- **Conda Channels**: Conda channels serve as repositories for hosting and managing packages. Channels like [conda-forge](https://conda-forge.org/) offer a wide range of community-maintained packages, expanding the available options for software development and experimentation.

- **The Choice Between Conda and Mamba**: Conda is the default package manager, while Mamba is a high-performance, drop-in replacement for conda. Mamba offers faster package installations and updates, making it a suitable choice for users who prioritize speed and performance.

Using conda provides a streamlined approach to package management, platform compatibility, environment isolation, and access to an extensive package ecosystem. It is particularly beneficial for data scientists, researchers, and developers working with diverse software requirements across different projects.

## How can I start using conda?

To start using conda, specifically Miniconda, there are various options available to you. Follow these steps to begin your conda journey and explore the rich ecosystem of packages:

1. **Installation:** Visit the [installation guide](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html) for detailed instructions on **how to install conda via Miniconda**. It provides step-by-step guidance to get conda up and running on your system. (*[Miniconda](https://docs.conda.io/en/latest/miniconda.html) is a minimal version of conda that includes only the essential components, allowing for a more customized and lightweight installation.*)

2. **Package Search:** Once you have conda installed, you can search for the packages you need. Use the built-in `conda search` functionality to find packages based on your requirements. **For a faster and more comprehensive package search experience, you can visit [Anaconda.org](https://anaconda.org/anaconda/repo)**. (*Anaconda.org is a platform that hosts a vast collection of packages from different channels, allowing you to easily explore and discover the packages you need*).

    Refer to our [FAQ section](./faq.md) for more information on how to search for packages effectively.


3. **Conda Channels:** Discover the power of conda channels. They are repositories that contain pre-built packages for conda users. Learn more about conda channels and how to use them effectively in our [FAQ section](https://conda.org/learn/faq#what-is-a-conda-channel).

4. **Alternative Tools:** In addition to conda, we have alternative tools like [**Mamba**](https://mamba.readthedocs.io/en/latest/user_guide/mamba.html) and [**Micromamba**](https://mamba.readthedocs.io/en/latest/user_guide/micromamba.html). Mamba is a drop-in replacement for conda that offers faster package management, and Micromamba is a pure C++ based CLI. Explore these tools to enhance your conda experience.

5. **Seeking Help:** If you encounter any issues or have questions, we're here to help. Reach out to us through our [contact page](https://conda.org/learn/faq#where-can-i-find-help). Our community is ready to provide assistance and help you overcome any obstacles you may face.

We hope this guidance helps you get started with conda smoothly.

## Can I use conda to manage non-Python packages?

Yes, conda can be used to manage non-Python packages. While conda is widely known for its capabilities in managing Python packages, it is not limited to Python alone. Conda supports package management for multiple programming languages, including R, Java, C/C++, and more. It allows you to install, manage, and update packages from different languages, ensuring consistent package installations and dependencies across your projects.

To install a non-Python package, you can use the following command:

```
conda install <package-name>
```

By default, Conda will search for the package in the default channels. However, you can also obtain non-Python packages from other channels apart from conda-forge. For example, you can specify a different channel using the -c flag:

```
conda install -c <channel-name> <package-name>
```

For example, to install a non-Python package like gcc for C/C++ programming language, from the conda-forge channel, you can run:

```
conda install -c conda-forge gcc
```

Similarly, you can use conda to manage packages for other languages such as R, Java, or any other supported language. Just replace `<package-name> `with the specific package you want to install.
This flexibility makes conda a versatile choice for managing a wide range of software packages, regardless of the programming language.

Feel free to explore different channels to find the desired non-Python packages.

## What is a conda channel?

Conda channels are the locations where conda packages are stored. By default, packages are automatically downloaded and updated from the `default` channel, but other channels (i.e., [conda-forge](https://conda-forge.org/)) can be specified using the `--channel` flag, as shown in the example below:

```
conda install rust --channel conda-forge
```

For more information, please check out the [conda documentation page on channels](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/channels.html).

## What is conda-forge?

[Conda-forge](https://conda-forge.org/) is a [community-led GitHub organization](https://github.com/conda-forge) that provides access to thousands of conda package recipes. All of these recipes are open source and can be installed with the conda package manager by specifying conda-forge as the channel.

## Why does conda have so many meanings in different contexts?

In different contexts, the term "conda" can refer to various aspects:

- **Conda as a tool**: Conda is an open-source, cross-platform package manager used for managing software packages.

- [**Conda packages**](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/packages.html): These are compressed tarballs or .conda files containing system-level libraries, modules, executables, and metadata, installed into the designated prefix.
(Here, "prefix" refers to the installation directory where the packages are installed. It represents the target location on your system where the package files are placed.)

- [**Conda environments**](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/environments.html): Conda environments are directories that contain specific collections of conda packages installed for a particular project or use case.

- **Conda channels**: Conda channels are locations where packages are stored and serve as the base for hosting and managing packages. They can be hosted on various platforms, including [Anaconda.org](https://anaconda.org/) and others.

- **Conda, the package format**: Conda can also refer to the package format itself, which is an archive containing programs and metadata needed by package managers.

- **Conda distributions**: Conda is included in various distributions. [Miniconda](https://docs.conda.io/en/latest/miniconda.html) provides a minimal installation, [Anaconda](https://www.anaconda.com/) includes additional pre-installed packages, and there is also [Micromamba](https://mamba.readthedocs.io/en/latest/user_guide/micromamba.html), a lightweight distribution based on Conda.
- **Miniconda and Anaconda**: These are distributions that include conda as the package manager. [Miniconda](https://docs.conda.io/en/latest/miniconda.html) provides a minimal installation, while [Anaconda](https://www.anaconda.com/) includes additional pre-installed packages.

- **Conda community**: The Conda community includes channels like [conda-forge](https://conda-forge.org/) and [bioconda](https://bioconda.github.io/), which provide additional packages and resources.

- [**Mamba**](https://mamba.readthedocs.io/en/latest/installation.html): Mamba is a high-performance, drop-in replacement for Conda. It is written in C++ and offers faster package management.

- [**Conda Package Specification**](https://conda.io/projects/conda-build/en/latest/resources/package-spec.html): This refers to the contents of an extracted package, regardless of the compression format used.

- **Installing conda or packages**: This context refers to the process of installing conda itself or using conda to install other packages.

You can find more about this [here](https://conda.org/community#the-many-meanings-of-conda).
## What is a feedstock?

A feedstock is a conda package repository.

## How can I search for packages?

There are many ways to search for packages, either in the browser or on the command line. Many package organizations keep lists of their packages on their websites, so you can either use a search engine or go directly to package organization websites like [conda-forge.org](https://conda-forge.org/) and [bioconda.github.io](https://bioconda.github.io/). Anaconda also provides package hosting on [anaconda.org](https://anaconda.org/).

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

## Can I share conda environments with others? If so, how?

Yes, you can share conda environments with others, making it easier to collaborate on projects or reproduce specific software setups. Here's how you can share conda environments:

1. **Exporting the environment:** With conda, you can export the environment to a YAML file that contains a list of all the packages and their versions. Open the terminal or command prompt, activate the environment you want to share, and use the following command:

```
conda env export > environment.yml
```

This command exports the environment to an `environment.yml` file.

2. **Sharing the environment file:** Once you have the `environment.yml` file, you can share it with others through various means, such as email, file sharing services, or version control systems like Git.

The `environment.yml` file contains information about the dependencies required for the environment, including packages, versions, and channels. Make sure to communicate any specific instructions or requirements related to the environment, such as additional dependencies or channels.
3. **Creating the environment from the file:** To create an identical environment on another machine, the other person can use the following command in their terminal or command prompt:

```
conda env create -f environment.yml
```

This command reads the `environment.yml` file and recreates the environment with the same package versions and dependencies. The person building an environment from this file needs to have conda or mamba installed on their system.

Note: If using mamba instead of conda, the command will be:

```
mamba env create -f environment.yml
```

4. **Activating the shared environment:** After the environment is successfully created, the other person can activate it with:

```
conda activate <environment-name>
```

or

```
mamba activate <environment-name>
```

Replace `<environment-name>` with the name of the shared environment.

By following these steps, you can easily share conda environments, ensuring consistent dependencies and versions.
Remember that channels play a crucial role in environment replication. If your environment relies on packages from specific channels other than the defaults, then you might need to add those channels using:

```
conda config --add channels <channel-name>
```

or

```
mamba config --add channels <channel-name>
```

before creating the environment from the YAML file.

## I want to create a conda package for my project. Where do I start?

To create a conda package for your project, you can start by referring to the official documentation provided by [conda-build](https://github.com/conda/conda-build).

For step-by-step guidance on setting up packages, defining dependencies, handling different platforms, and more, you can check out the [documentation for conda-build](https://docs.conda.io/projects/conda-build/en/stable/user-guide/tutorials/building-conda-packages.html).

If you need further assistance or have specific questions related to creating conda packages, visit the [conda community page](https://conda.org/community).

## What is a dependency graph?

A [dependency graph](https://en.wikipedia.org/wiki/Dependency_graph) is a tree-like data structure where each node points to all of the things that it depends on. Then, each of those dependency nodes point at all of their particular dependencies, and so on. Simply put, it's a graph that represents how objects depend on each other.

Each separate conda environment would have its own dependency graph. The items in a dependency graph would be the packages that conda manages and what each of those packages require as a prerequisite to function properly.

## What are the rules for content on conda.org?

[conda.org](https://conda.org) is a website that represents the entire conda community. To make sure that not any one project, company, or organization
gets preferential treatment, we have defined the following guidelines to follow when contributing new content and updating
existing content:

- Content not present in the blog should speak of the wider ecosystem and not prioritize any particular tool, channel, company, or organization.
- The blog is an area where particular tools, channels, companies, or organizations may be promoted.

## How do I submit a blog post to conda.org?

See our [Contributing](https://github.com/conda-incubator/conda-dot-org/blob/main/CONTRIBUTING.md) documentation for more information on submitting blog posts.

## How is the conda community organized?

The conda community is a vibrant and diverse group of users and developers who utilize conda, a popular package management system, for creating, managing, and distributing software environments. The conda community consists of various sub-communities that play an important role in supporting and extending the functionality of conda. Some of these communities include:

- [conda-forge](https://conda-forge.org/): A community-led collection of recipes, build infrastructure, and packages for conda. It provides a wide range of community-maintained packages that can be easily installed using conda.

- [Bioconda](https://bioconda.github.io/): A specialized community for bioinformatics software packages. Bioconda offers a comprehensive collection of bioinformatics tools and libraries that can be easily managed with conda.

- [Micromamba](https://mamba.readthedocs.io/en/latest/user_guide/micromamba.html): A lightweight, fast, and pure C++ based alternative to conda. Micromamba is designed to provide a streamlined package management experience and is compatible with conda environments and packages.

These communities actively contribute to the conda ecosystem, providing additional packages, resources, and support for users and developers.

To contact us, please refer to the [Community Page](https://conda.org/community#how-to-reach-us).

## Does the conda community have online events, meetings, or calls?

The conda community offers diverse events and meetings for engagement:

- **Anaconda** hosts webinars, tutorials, and industry events. Check out the list of upcoming and archived events [here](https://www.anaconda.com/events).

- Regular meetings are conducted by the **conda community** to discuss updates and ideas. [Find the meeting notes here](https://hackmd.io/@conda-community?tags=%5B%22meeting-notes%22%5D).

- **Conda-forge** holds biweekly developer meetings, with [minutes available here](https://conda-forge.org/docs/orga/minutes/00_intro.html).

- **Mamba** also organizes biweekly developer meetings. [Get more information here](https://github.com/mamba-org/mamba#biweekly-dev-meeting).

Participating in these events and meetings provides valuable opportunities to connect and contribute to the conda community.
## I see a problem with the website. How do I report it?

Please create an [issue](https://github.com/conda-incubator/conda-dot-org/issues) in GitHub to report any problems with the website. We also welcome pull requests!

## Where can I find help?

If you need help with any aspect of the conda ecosystem, feel free to reach out to us via any of our online channels.

For more information, read [How to reach us](/community/#how-to-reach-us) on the [Community](/community) page.
