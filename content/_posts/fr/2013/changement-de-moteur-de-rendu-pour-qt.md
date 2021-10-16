---
title: Changement de moteur de rendu pour QT
description: Digia abandonne le port de WebKit pour chromium au sein de son framework Qt. Depuis son intégration en 2007, le célèbre moteur de rendu a beaucoup évolué. Porté principalement par le projet Chromium (Google), Apple et Nokia, il est devenu un des moteur de rendu les plus utilisé au monde étant intégré au sein de Safari et anciennement Chrome, Opera et Qt.
image: /images/qt.jpg
tags:
  - qt
slug: changement-de-moteur-de-rendu-pour-qt
updated: '2013-09-23'
created: '2013-09-23'
---

Digia abandonne le port de WebKit pour chromium au sein de son framework Qt. Depuis son intégration en 2007, le célèbre moteur de rendu a beaucoup évolué. Porté principalement par le projet Chromium (Google), Apple et Nokia, il est devenu un des moteur de rendu les plus utilisé au monde étant intégré au sein de Safari et anciennement Chrome, Opera et Qt.

Le projet Chromium a joué un rôle non négligeable dans le développement du moteur ayant été le plus gros contributeur au projet (suivi par Apple et Qt). Pour des raisons techniques et pour permettre une meilleur intégration du moteur de rendu au sein du navigateur Chrome, Google décida au printemps dernier de faire un fork de ce dernier qu'il nomma blink. Depuis, le code de blink a énormément divergé par rapport à celui de WebKit.

Les choix qui ont motivé Digia à basculer de moteur de rendu sont assez simples. Le projet Chromium se veut être un moteur multi-plateforme, il est performant et offre un code de qualité, ce qui facilite le développement. Tout ces points permettent aux développeurs de Qt de focaliser leur travail sur le développement de l'API qui facilitera son usage.

Source : [Blog Qt](http://blog.qt.digia.com/blog/2013/09/12/introducing-the-qt-webengine/)
