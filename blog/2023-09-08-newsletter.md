---
title: "Conda Newsletter, Issue #2"
slug: "2023-09-08-newsletter"
description: |
    Upcoming Events, conda-store brief, Is conda free?, pre and post plugin hooks, Recent releases, Travis's latest talk on Youtube.
authors: [pinak-datta]
tags: [conda, newsletter]
image: img/blog/2023-09-08-newsletter-2/newsletter.jpg
---

import Image from '@theme/IdealImage';
import banner from '@site/static/img/blog/2023-09-08-newsletter-2/newsletter.jpg';
import packagingcon from '@site/static/img/blog/2023-06-23-newsletter/packagingcon.jpg';
import rse from '@site/static/img/blog/2023-09-08-newsletter/rse_con.jpg';
import yt from '@site/static/img/blog/2023-09-08-newsletter-2/yt.png';


<Image img={banner} alt="Banner image for blog post; Conda Newsletter Issue # 2 - mailboxes"/>
<p>
    <i>
        <small>
            Image credit: <a href="https://unsplash.com/photos/GjFbKfI874o">Letterboxes on an American Street</a>
        </small>
    </i>
</p>

**Welcome to the second issue of the conda Community Newsletter!** We're excited to bring you the latest updates and insights, packed with valuable information and exciting developments.

In this issue, we've got a diverse range of topics to cover, including [Upcoming Events](#Upcoming-Events), new tools like [conda-store](#conda-store), thought-provoking discussions on [conda's free nature](#Is-conda-Free?), [plugin hooks](#New-pre-and-post-command-plugin-hooks), and intriguing projects like [Pandata](#Pandata). Plus, we'll delve into [recent releases](#Releases) that promise to enhance your conda experience.

But that's not all! We'll also highlight one [job opportunity](#Job-still-Open-at-sfbi!) and share news about [Travis's recent talk](  #Writing-Plugin-Friendly-Python-Applications:-by-Travis), now available for public consumption.


And if you don't want to miss out on future editions, be sure to **Sign-up for the conda Announce Mailing List**.

So, without further ado, let's dive into this issue and explore the exciting developments happening in the world of conda. 

Happy reading!

---

## Upcoming Events

[<Image img={rse} alt="Banner image for RSE-Con 2023"/>](https://rsecon23.society-rse.org/)

### [Conda-forge guide at RSE 2023](https://us-rse.org/usrse23/program/tutorials/#publish-your-software-in-conda-forge)

Dave will be guiding you to make your open-source software easily accessible to others by publishing it on conda-forge. Conda-forge is a thriving community-managed channel within the conda ecosystem, boasting over 20,000 packages and serving billions of downloads annually. In this hands-on tutorial, you'll grasp the fundamentals of software packaging, understand the conda ecosystem, and explore the process of preparing and publishing your software on conda-forge.

**Key Highlights:**

- Introduction to software packaging concepts and challenges.
- Dive into the conda ecosystem.
- Step-by-step guide to preparing a sample software package for conda-forge.
- Building your package using conda-build.
- Submission and publication of your package on conda-forge.
- Porting packages from PyPA/pip (Python) or CRAN (R) to conda.

**To know more about this tutorial, visit the [US-RSE Page](https://us-rse.org/usrse23/program/tutorials/#publish-your-software-in-conda-forge)**.


[<Image img={packagingcon} alt="Banner image for PackagingCon 2023"/>](https://packaging-con.org/)

### PackagingCon 2023

 - **When**: October 26-28, 2023
 - **Where**: Berlin (Hybrid, so online is an option too !)
 - **Early Registration Ends**: September 8, 2023

[**PackagingCon 2023**](https://packaging-con.org/) is your opportunity to connect with software packaging experts, discuss best practices, and tackle common challenges. Whether you're a developer, packager, or part of a packaging community, this conference is a must-attend.

[**Registration**](https://ti.to/packagingcon/packagingcon-2023): Early bird rates start at €37.50 for virtual and €150 for in-person. Discounts available for students and early registrants. *Early registration ends on September 8!*.

For more information, you can also check out [**Dave's post on PackagingCon**](https://conda.org/blog/2023-07-25-packagingcon/). 

---

## Recent News

### [conda-store](https://conda.store/en/latest/)

Experience enhanced flexibility and reliability with conda-store, a powerful tool that simplifies conda environment management.

**What is conda-store?**

[conda-store](https://conda.store/en/latest/) seamlessly integrates conda environments, offering flexibility for individual data scientists and administrators alike. It streamlines environment lifecycle management, adhering to best practices.

**Key Features:**

🔑 **Flexibility**: Customize environments with a GUI or YAML editor, adapting them to your specific needs.

🔑 **Reproducibility**: conda-store generates auto-artifacts for sharing and exact version control, ensuring reproducibility.

🔑 **Governance**: Admin-approved packages, version control, and channel management promote organization-wide consistency.

🔑 **Namespace Management**: Securely share environments within designated teams for enhanced collaboration.

**Get Started:**

[Explore comprehensive documentation at conda.store](https://conda.store/en/latest/user_guide.html) for installation, usage, and contributions.

Whether you're a data scientist or an administrator, conda-store revolutionizes conda environments. Make sure to check them out!

### Is conda Free?

[**In Dave's latest blog post**](https://www.anaconda.com/blog/is-conda-free#summarize), he clarifies the question that's on everyone's mind: "*Is conda truly free?*" Here's a brief overview:

- Conda, the package and environment management software, is open source and free for anyone to use.

- Conda-compatible packages from conda-forge, Bioconda, and other public channels are also free for all users.

- For packages in the default channel and Anaconda Distribution:

    -    Organizations with less than 200 people can use them for free.
    -    Larger organizations can still qualify for free use if they meet Anaconda's terms of service exemptions, including developers, students, teachers, academic institutions, non-commercial open source software projects, and small businesses.
      
For an in-depth look at conda's free offerings and the finer details, dive into [**Dave's full blog post here**](https://www.anaconda.com/blog/is-conda-free#summarize).

### New pre and post command plugin hooks

Discover the latest in conda extensibility with the introduction of **"pre command" and "post command" plugin hooks**. These powerful additions, available since conda release 23.7.2, allow plugin authors to execute code before and after conda commands, expanding the possibilities for customizing your conda experience.

[**Key Highlights from Travis's Blog:**](https://conda.org/blog/2023-07-31-latest-conda-release-includes-new-plugin-hooks/)

**Pre Command Hook**: This hook enables you to execute code before specified conda commands run. It's a game-changer for customizing and extending conda's default behavior. An excellent example of its practical application can be found in the conda-protect project, where it's used to safeguard conda environments.

**Post Command Hook**: Similar to the pre command hook, the post command hook lets you run code after conda commands have successfully executed. This opens up exciting opportunities, like creating a simple command counter to analyze your conda usage.

For detailed implementation examples and insights into these new plugin hooks, [dive into Travis's blog post here](https://conda.org/blog/2023-07-31-latest-conda-release-includes-new-plugin-hooks/).

### Pandata

**Pandata** is a collaborative effort of various Python libraries. These libraries are carefully crafted to seamlessly complement each other, ensuring scalability, interactivity, and more.

In essence, Pandata serves as your guide to a suite of libraries designed to work harmoniously. By using any of these libraries, you can rest assured that they're tailored to fit together seamlessly, preserving scalability and interactivity.

**[Discover more about Pandata here](https://github.com/panstacks/pandata)**.

---

## Releases

**[Conda 23.7.2](https://conda.org/blog/2023-07-28-july-2023-releases#changes-in-conda-237023712372)**: Introduces pre- and post-command plugin hooks, improved subcommand plugin infrastructure, and a health check for altered packages in environments.

[**Conda Build 3.26.0**](https://conda.org/blog/2023-07-28-july-2023-releases#changes-in-conda-237023712372): Logs extra-meta data for package verification, adds pip to env-doc make command, and fixes various bugs related to handling unknown binaries and Git cloning with submodules.

[**constructor 3.4.5**](https://github.com/conda/constructor/releases/tag/3.4.5): Constructor 3.4.5 enhances support for .yaml and .txt files in the environment_file key while ensuring accurate conda metadata in installer creation from existing environments on Windows.

[**conda-libmamba-solver 23.7.0**](https://github.com/conda/conda-libmamba-solver/releases/tag/23.7.0): Libmamba Solver 23.7.0 introduces local channel integrations in conda-build, fixes for namespaced settings, CLI argument handling, authentication in package downloads, and improved handling of channels in conda-lock, among other enhancements and bug fixes.

[**conda-lock 2.1.2**](https://github.com/conda/conda-lock/releases/tag/v2.1.2): conda-lock 2.1.2 resolves Pydantic v2 warnings, implements auth stripping for private PyPi packages, and enhances compatibility with Mamba>=1.4.6. Additionally, it includes infrastructure improvements, dependency updates to pydantic 2.0, and the removal of deprecated pkg_resources, among other changes.

[**conda-package-streaming 0.9.0**](https://github.com/conda/conda-package-streaming/releases/tag/v0.9.0)

[**conda-package-handling 2.2.0**](https://github.com/conda/conda-package-handling/releases/tag/2.2.0)

[**Pixi**](https://github.com/prefix-dev/pixi/releases/tag/v0.2.0): Pixi 0.2.0 introduces a new "pixi search" command for package searching and target-specific tasks. It also includes several bug fixes, installation improvements, and enhancements like a reduction in binary size, updated banner, and contribution guidelines.

---

## [Job still Open at sfbi!](https://www.sfbi.fr/emplois/offre/202308020700-cdd-ingenieur-e-en-developpement-logiciel)

**Job Role**: Software Development Engineer

**Contract Type**: Fixed-Term (12 months)

**Location**: Versailles, France

**Starting Date**: October 1, 2023

**Education**: Bac+5 / Master's Degree

Join in revolutionizing genomics research! They're looking for a Software Development Engineer to enhance our flagship tool, REPET. 

**Your mission**: improve portability and scalability. If you have skills in Python, conda, Snakemake, and more, apply by September 20, 2023. [**Learn more**](https://www.sfbi.fr/emplois/offre/202308020700-cdd-ingenieur-e-en-developpement-logiciel).

---

<Image img={yt} alt="Image of the talk on Youtube"/>

## [Writing Plugin Friendly Python Applications: by Travis](https://youtu.be/d40tBcqopAI?feature=shared)

In this talk, Travis explores the art of **designing plugin-friendly Python applications**. He emphasizes the importance of well-defined contracts between core software and plugins, fostering modular organization.

Throughout the session, Travis demonstrates these principles using the pluggy library. He also shares a case study on conda, showcasing how it's adapting its codebase to embrace plugin-friendly practices.

**[Watch the video](https://youtu.be/d40tBcqopAI?feature=shared)** to learn how to enhance your Python applications with plugin-friendliness.