---
title: Créer un widget Wordpress
description: Lors de l’utilisation de wordpress, il peut s’avérer, dans certain cas, être frustré qu’un widget n’existe pas. Une première solution est de chercher si un plugin pouvant générer votre widget n'a pas déjà été créé par la communauté. Seulement si votre besoin est spécifique vous avez très peu de chance de trouver votre bonheur, besoin spécifique demande développement spécifique. Mais, heureusement, wordpress offre la possibilité de créer ses propres widgets et cela en tout simplicité.
image: /images/wordpress.png
tags:
  - wordpress
  - php
slug: creer-un-widget-wordpress
updated: '2013-09-28'
created: '2013-09-28'
---

Lors de l’utilisation de wordpress, il peut s’avérer, dans certain cas, être frustré qu’un widget n’existe pas. Une première solution est de chercher si un plugin pouvant générer votre widget n'a pas déjà été créé par la communauté. Seulement si votre besoin est spécifique vous avez très peu de chance de trouver votre bonheur, besoin spécifique demande développement spécifique. Mais, heureusement, wordpress offre la possibilité de créer ses propres widgets et cela en tout simplicité.

### Qu’est ce qu’un widget ?

On parle de widget mais il serait bon de définir ce qui ce cache derrière ce terme. Le mot widget est en fait l’association de deux mots anglais, “ window “ et “ gadget “, il peut définir un peu tout et n’importe quoi en informatique mais on est sûr d’au moins une chose, c’est que les widgets possèdent une et une seul fonctionnalité. Sous wordpress, les widgets se différencient de simples codes html par le fait qu’ils sont totalement intégrés au CMS. Pour être simple, un widget est un bloc que vous pouvez administrer, trier, supprimer à partir de l’espace d’administration.

### Créer son premier widget

Rentrons dans le vif du sujet, à quoi ressemble le code d’un widget ? En fait, le widget est au départ une classe php étendu de la classe parente WP_Widget. Pour être plus claire voici le code d’un widget simple :

```php
<?php

class Follow_widget extends WP_Widget {
  function Follow_Widget() {
    parent::__construct( 'follow-widget', 'Follow Widget', array(
      'classname' => 'follow-widget',
      'description' => 'Mon widget pour me suivre :P'
    ));
  }

  function widget($args, $instance) {
    echo '<div class="follow-widget">
      <script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
      <div class="g-person" data-width="295" data-href="//plus.google.com/116179883294469011493" data-theme="dark" data-layout="landscape" data-rel="author"></div>
    </div>';
  }

  public function update() {}

  public function form() {}
}

```

Ici le rôle de notre widget est d’afficher un bloc permettant de suivre une personne sur google+. Le constructeur va vous permettre de donner des informations au CMS sur le widget. Décortiquons cette fonction, le premier paramètre détermine l’id de notre widget que l’on pourra retrouver dans l’attribut " class " de notre bloc une fois qu'il sera généré. Le second détermine le nom du widget qui s’affichera dans l’espace d’administration. Le troisième concerne des arguments secondaires tel la description.

![exemple widget](/images/widget1.jpg)

### Référencer son widget

Car créer un widget c’est bien, mais faire en sorte qu’il soit utilisable c’est encore mieux et pour ce faire nous allons devoir indiquer à wordpress son existence. Tout d’abord, placez-vous dans le fichier functions.php de votre thème et incluez le fichier contenant le widget (fonction php require ou include ) de manière à pouvoir accéder à notre classe. Ensuite, dans ce même fichier `functions.php`, repérer la fonction où sont déclarés widget et sidebar. Si vous ne la trouvez pas, aidez-vous de la fonction :

```php
<?php add_action('widgets_init', 'le nom de la fonction recherché'); ?>
```

Si aucune fonction d’initialisation de widget n’existe, créez-en une vous même et rajoutez après cette fonction la ligne de code précédemment donnée en remplaçant le deuxième argument par le nom de votre fonction. Que ce soit dans une fonctions déjà présente ou votre propre fonction, rajouté la ligne de code suivante :

```php
<?php register_widget('id du widget'); ?>
```

Cette ligne de code est primordiale, elle permet d’indiquer à wordpress l’existence du widget et de l’enregistrer en tant que tel parmi ceux déjà existants.

### Utiliser son widget

Plus haut, nous avons dit qu’un widget était administrable, il est donc temps de le vérifier. Rendez-vous à l’onglet de widget dans votre panneau d’administration. Si tout c’est bien passé vous devriez le voir parmi les widgets de base de wordpress. Vous pouvez l’ajouter à une de vos sidebar ou la supprimer comme tout widget qui se respecte.
Mais, ce n’est pas la seul possibilité d’utiliser le bloc. Vous pouvez tout à fait l’appeler dans le code d’une page comme par exemple un template que vous auriez créé. La fonction qui permet cette prouesse est la fonction `the_widget()` à utiliser de la manière suivante :

```php
<?php the_widget('nom du widget'); ?>
```

![administration widget](/images/widget2.jpg)
