---
title: Désactiver des plugins wordpress en SQL
description: Il est parfois nécessaire pour des raisons diverses, tel que l’impossibilité de se connecter à son espace admin, de vouloir désactiver des plugins directement en SQL. Pour ce faire nous allons voir la requête qui permet de le faire.
image: /images/wordpress.png
tags:
  - wordpress
  - sql
slug: desactiver-des-plugins-wordpress-en-sql
updated: '2013-12-13'
created: '2013-12-13'
---

Il est parfois nécessaire pour des raisons diverses, tel que l’impossibilité de se connecter à son espace admin, de vouloir désactiver des plugins directement en SQL. Pour ce faire nous allons voir la requête qui permet de le faire.

Pour commencer, il est bon de regarder dans la table `wp_options` afin de voir à quoi ressemble les valeurs définissant l’activation des plugins. Pour regarder ce que contient le champ des plugins, exécutez la requête SQL suivante :

```sql
SELECT option_value FROM wp_options WHERE option_name = 'active_plugins';
```

Maintenant pour désactiver l’ensemble des plugins exécutez la requête suivante :

```sql
UPDATE wp_options SET option_value = 'a:0:{}' WHERE option_name = 'active_plugins';
```
