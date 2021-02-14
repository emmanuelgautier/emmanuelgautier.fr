---
title: Configurer la ligne de commande PHP sous windows
description: Lorsque vous installez PHP que ce soit avec WAMP, XAMPP, ou tout simplement en installant le binaire de php pour windows, il ne vous est pas possible d’utiliser php en ligne de commande sous windows, il vous faut obligatoirement configurer la ligne de commande.
image: /images/php.jpg
tags:
  - php
  - windows
slug: configurer-la-ligne-de-commande-php-sous-windows
updated: '2014-11-12'
created: '2014-11-12'
---

Lorsque vous installez PHP que ce soit avec WAMP, XAMPP, ou tout simplement en installant le binaire de php pour windows, il ne vous est pas possible d’utiliser php en ligne de commande sous windows, il vous faut obligatoirement configurer la ligne de commande.

La méthode à suivre pour ajouter un programme à la ligne de commande est d’ajouter celui-ci dans les variables d’environnements de Windows. Voici les étapes à suivre pour ajouter php aux variables d’environnements.

Allez dans Panneau de configuration puis Système et sécurité puis Système (Panneau de configuration\Système et sécurité\Système). Sur la gauche de votre fenêtre devrait se trouver un bouton Paramètre de système avancé

![administration widget](/images/php-cmd-windows1.jpg)

Cliquez sur variables d’environnement

![administration widget](/images/php-cmd-windows2.jpg)

Il vous faut maintenant rajouter le chemin d’accès vers votre exécutable PHP à la variable d’environnement PATH. J’attire votre attention sur le fait que les chemins contenus dans cette variables sont séparés par un point-virgule.

![administration widget](/images/php-cmd-windows3.jpg)
![administration widget](/images/php-cmd-windows4.jpg)

Une fois l’ajout effectué, il ne vous reste plus qu’à tester en tapant la ligne de commande ci-dessous.

```bash
php -v
```

Si tout fonctionne, le numéro de version de votre installation de php devrait s’afficher.
