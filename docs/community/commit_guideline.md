---
title: Git Commit Message Conventions
author: ajayojha
category: community
type:simple
linktitle:commit_guideline
---

# The reasons for these conventions:
<ul>
<li>automatic generating of the changelog</li>
<li>simple navigation through git history (e.g. ignoring style changes)</li>
</ul>

# Format of the commit message:
```bash
&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;

&lt;body&gt;

&lt;footer&gt;
```

# Example commit message:

```bash
fix(validator): handle zero value in required validator
control should not be invalid, if control have the value of '0'.

Fixes #58
```

# Message subject (first line)
The first line cannot be longer than 50 characters, the second line is always blank and other lines should be wrapped at 70 characters. The type and scope should always be lowercase as shown below.

## Allowed `&lt;type&gt;` values:
<ul>
<li><b>feat</b> (new feature for the user, not a new feature for build script)</li>
<li><b>fix</b> (bug fix for the user, not a fix to a build script)</li>
<li><b>docs</b> (changes to the documentation)</li>
<li><b>style</b> (formatting, missing semi colons, etc; no production code change)</li>
<li><b>refactor</b> (refactoring production code, eg. renaming a variable)</li>
<li><b>test</b> (adding missing tests, refactoring tests; no production code change)</li>
<li><b>chore</b> (no production code change)</li>
</ul>

## Example `&lt;scope&gt;` values:

<ul>
<li>validator</li>
<li>decorator</li>
<li>template-driven</li>
<li>service</li>
<li>etc.</li>
</ul>

The `&lt;scope&gt;` can be empty (e.g. if the change is a global or difficult to assign to a single component), in which case the parentheses are omitted. 

# Message body
<ul>
<li>uses the imperative, present tense: “change” not “changed” nor “changes”</li>
<li>includes motivation for the change and contrasts with previous behavior</li>
</ul>

For more info about message body, see:

<ul>
<li><a href="http://365git.tumblr.com/post/3308646748/writing-git-commit-messages" target="_blank">http://365git.tumblr.com/post/3308646748/writing-git-commit-messages</a></li>
<li><a href="http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html" target="_blank">http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html</a></li>
</ul>

# Message footer

## Referencing issues
Closed issues should be listed on a separate line in the footer prefixed with "Closes" keyword like this:
```bash
Closes #58
```
or in the case of multiple issues:
```bash
Closes #55, #56, #57
```
## Breaking changes
All breaking changes have to be mentioned in footer with the description of the change, justification and migration notes.
```bash
BREAKING CHANGE: pattern validator regex binding parameter has been changed and 'pattern' parameter has been removed.
To change the code follow below : <br />
Before:
RxwebValidators.pattern({pattern:new RegExp([a-z])})<br />

After:
RxwebValidators.pattern({expression:new RegExp([a-z])}) 
```
This document is based on <a href="https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#" target="_blank">AngularJS Git Commit Msg Convention</a>.  See the <a href="https://github.com/rxweb/rxweb/commits/master" target="_blank">commit history</a>  for examples of properly-formatted commit messages.

