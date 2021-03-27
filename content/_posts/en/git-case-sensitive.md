---
title: Git case sensitive
description: Today, I was wondering to know why on the CI pipeline, tests were failing due to missing files but those files are on the file system locally and push on the GIT repository. This issue came from files renamed updating from lowercase to uppercase.
image: /images/git.jpg
tags:
  - git
  - osx
  - windows
slug: git-case-sensitive
alternate:
  fr: git-sensibilite-casse
featured: true
updated: '2018-11-06'
created: '2018-11-06'
---

Today, I was wondering to know why on the CI pipeline, tests were failing due to missing files but those files are on the file system locally and push on the GIT repository. This issue came from files renamed updating from lowercase to uppercase.

Windows & OSX file systems are not case sensitive. So if you are one user of one of these two operating systems, here the two solutions you can use.

One simple workaround is to use the `git mv` command as follows:

```git
git mv camelcase camelCase
git commit -m "fix camelCase name"
```

Another solution you can use is to configure GIT to be case sensitive with the current files system type.

From this documentation de [git-config](https://gitirc.eu/git-config.html)

> Internal variable which enables various workarounds to enable Git to work better on filesystems that are not case sensitive, like APFS, HFS+, FAT, NTFS, etc. For example, if a directory listing finds "makefile" when Git expects "Makefile", Git will assume it is really the same file, and continue to remember it as "Makefile".

To enable it, assign the value `false` to `core.ignoreCase` config

```git
git config core.ignorecase false
```
