---
title: Update NodeJS with npm
description: New NodeJS releases are done often, so you need to keep your installation up to date. To do so, you can use your Linux distribution package manager (apt, dnf, ...) or brew for OSX. Another way is to use npm..
image: /images/nodejs.jpg
tags:
  - javascript
  - nodejs
slug: update-nodejs-with-npm
alternate:
  fr: mettre-a-jour-nodejs-via-npm
updated: '2021-02-20'
created: '2014-10-26'
---

**Update** : Now, [nvm](https://github.com/creationix/nvm) can be simpler to manage NodeJS versions. You can install the version you want and those versions can be differents across all your projects and shared with the file `.nvmrc`. More informations on the nvm [README](https://github.com/creationix/nvm/blob/master/README.md)

New NodeJS releases are done often, so you need to keep your installation up to date. To do so, you can use your Linux distribution package manager (apt, dnf, ...) or brew for OSX. Another way is to use npm.

Here some command lines to update NodeJS on your dev environment. The update will take the latest stable version of NodeJS.

```shell
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

If you only want to switch from one version to another, just replace the previous line with the following line. Of course, you can update the version number depending on your need.

```shell
sudo n 0.10.33
```

If the installation is done, check the version number with the following command :

```shell
node -v
```
