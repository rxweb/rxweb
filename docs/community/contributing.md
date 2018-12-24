---
title: Contributing to rxweb framework
author: ajayojha
category: community
type:simple
linktitle:contributing
---
If you are thinking to make rxweb framework better, that's truly great. You can contribute from a single character to core architectural work or significant documentation – all with the goal of making a robust rxweb framework which helps for everyone in their projects. Even if you are don’t feel up to writing code or documentation yet, there are a variety of other ways that you can contribute like reporting issues to testing patches. 

Here are some great tips on how you can put your precious efforts on the rxweb framework and contribute in the respective area. We expect from you to follow the rxweb framework code of conduct and follow the <a href="https://rxweb.io/community/commit_guideline">commit message conventions.</a> 

# Need Help or Found an Issue
Please refer our <a href="https://github.com/rxweb/rxweb/wiki/rxweb-issue-workflow" target="_blank">issue workflow wiki</a>, where you get complete information on the same.

# Feature request
You can request a new feature by submitting an issue to our <a href="https://github.com/rxweb/rxweb/issues/new/choose" target="_blank">GitHub Repository</a>. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it.

# Setting up the code and execute tests
<ul>
<li>Make sure you have a <a href="https://github.com/signup/free" target="_blank">GitHub account</a>. </li>
<li><a href="https://github.com/rxweb/rxweb/fork" target="_blank">Fork the repository</a> on GitHub.</li>
<li>	Clone your fork
```bash
  $ git clone https://github.com/&lt;your-username&gt;/rxweb.git
  $ cd rxweb
```
</li>
<li>Install for development. Use a recent npm version. 
```bash
  $ npm install
  $ ng test
```
  </li>
</ul>
# Contributing to rxweb framework Code or Docs
## Changing the Docs
You can help to improve the rxweb guides by making them more coherent, consistent, or readable, adding missing information, correcting factual errors, fixing typos, or bringing them up to date with the latest edge rxweb.

For documentation changes, click on edit icon, located at the top right side of the documentation on <a href="https://rxweb.io">rxweb.io</a> site. This will take you to the source file on Github where you can submit a pull request with your changes. For documentation changes, you don’t need to set up in your local machine and do the changes.

## Changing the Code
Checkout a new branch and name it accordingly to what you intend to do:
<ul>
<li>Features get the prefix feat-.</li>
<li>Bug fixes get the prefix fix-.</li>
<li>Adding missing tests or correcting existing tests, get the prefix test-.
```bash
  $ git checkout -b <branch_name>
```
</li>
Open in your favorite editor, make some changes, run the tests, change the code, run the tests, change the code, run the tests, etc.

# Sending a pull request
<ul>
<li>Commit your changes (please follow our commit message conventions):
```bash
  $ git commit -m "..."
```
</li>
<li>Push to your github repo:
```bash
  $ git push origin <branch_name>
```
</li>
<li>Go to the GitHub page and click "Open a Pull request".</li>
<li>Write a good description of the change.</li>
</ul>

After sending a pull request, our core team or maintainers will review and discuss your change. Please address all the comments. Once everything is all right, then will merge your changes in.
