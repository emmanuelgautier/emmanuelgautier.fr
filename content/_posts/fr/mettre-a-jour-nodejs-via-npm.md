---
title: Mettre à jour NodeJS via npm
description: De nouvelles versions du langage NodeJS sortent régulièrement et il vous faut donc mettre à jour votre instance. Pour ce faire vous avez bien entendu la possibilité de le faire via le gestionnaire de paquets de votre distribution si vous êtes sous linux. Une autre manière simple est d'utiliser npm.
image: /images/nodejs.png
tags:
  - nodejs
slug: mettre-a-jour-nodejs-via-npm
updated: '2018-11-24'
created: '2014-10-26'
---

De nouvelles versions du langage NodeJS sortent régulièrement et il vous faut donc mettre à jour votre instance. Pour ce faire vous avez bien entendu la possibilité de le faire via le gestionnaire de paquets de votre distribution si vous êtes sous linux. Une autre manière simple est d'utiliser npm.

Voici le détail en lignes de commande pour mettre à jour NodeJS sur votre machine. La mise à jour prendra la dernière version stable du langage.

```shell
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

Si vous désirez simplement changer de version, remplacez la ligne suivante par la ligne ci-dessous, en modifiant bien entendu le numéro de version que vous souhaitez utiliser.

```shell
sudo n 0.10.33
```

Maintenant que l'installation est effectuée, vérifiez le numéro de version avec la commande suivante :

```shell
node -v
```

**Mise à jour** : Il est plus simple désormais d'utiliser [nvm](https://github.com/creationix/nvm). Vous pouvez installer la version que vous souhaitez et fixer une version par projet à l'aide du fichier `.nvmrc`. Plus d'informations sur le [README](https://github.com/creationix/nvm/blob/master/README.md) de nvm.
