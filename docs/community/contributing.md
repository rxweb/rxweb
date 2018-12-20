---
title: Contributing to rxweb framework
author: ajayojha
---
If you are thinking to make rxweb framework better in any area you want to contribute from a single character to core architectural work or important documentation – all with the goal of making a robust rxweb framework which helps for everyone in their projects. Even if you are don’t feel up to writing code or documentation yet, there are a variety of other ways that you can contribute like reporting issues to testing patches. 

Here are some great tips on how you can put your precious efforts on the rxweb framework and contribute in the respective area. We expect from you to follow the rxweb framework code of conduct and follow the commit message conventions. 

# Need Help or Found an Issue
Please refer our issue workflow wiki, where you get complete information on the same.

# Feature request
You can request a new feature by submitting an issue to our GitHub Repository. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it.

# Setting up the code and execute tests
* Make sure you have a [GitHub account](https://github.com/signup/free).
* [Fork the repository] on GitHub.
*	Clone your fork
  ```bash
	$ git clone https://github.com/<your-username>/rxweb.git
  $ cd rxweb
  ```
* Install for development. Use a recent npm version.
  ```bash
  $ npm install
  $ ng test
  ```
# Contributing to rxweb framework Code or Docs
## Changing the Docs
You can help to improve the rxweb guides by making them more coherent, consistent, or readable, adding missing information, correcting factual errors, fixing typos, or bringing them up to date with the latest edge rxweb.

For documentation changes, click on edit icon, located at the top right side of the documentation on rxweb.io site. This will take you to the source file on Github where you can submit a pull request for your changes. For documentation changes, you don’t need to set up in your local machine and do the changes.

## Changing the Code
Checkout a new branch and name it accordingly to what you intend to do:
* Features get the prefix feat-.
* Bug fixes get the prefix fix-.
* Adding missing tests or correcting existing tests, get the prefix test-.
```bash
  $ git checkout -b <branch_name>
```
Open in your favorite editor, make some changes, run the tests, change the code, run the tests, change the code, run the tests, etc.

# Sending a pull request
* Commit your changes (please follow our commit message conventions):
```bash
  $ git commit -m "..."
```
* Push to your github repo:
```bash
  $ git push origin <branch_name>
```
* Go to the GitHub page and click "Open a Pull request".
* Write a good description of the change.

After sending a pull request, our core/maintainers team will review and discuss your change. Please address all the comments. Once everything is all right, then will merge your changes in.
