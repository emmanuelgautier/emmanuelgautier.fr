---
title: L’opérateur ternaire en PHP
description: L’utilisation de l’opérateur ternaire n’est certes pas la méthode de développer la plus lisible dans la majorité des cas mais elle s’avère pratique dans lisibilité de conditions simples et elle offre de meilleurs performances. L’implémentation de cet opérateur peut différer selon les langages, voyons dans le cas de PHP.
image: /images/php.jpg
tags:
  - php
slug: loperateur-ternaire-en-php
updated: '2014-10-31'
created: '2014-10-31'
---

L’utilisation de l’opérateur ternaire n’est certes pas la méthode de développer la plus lisible dans la majorité des cas mais elle s’avère pratique dans lisibilité de conditions simples et elle offre de meilleurs performances. L’implémentation de cet opérateur peut différer selon les langages, voyons dans le cas de PHP.

### Qu’est ce que l’opérateur ternaire ?

Simplement, il s’agit de mettre une condition logique sur un seul ligne. Voyons par exemple :

```php
if($boolean)
  echo ‘true’;
else
  echo ‘false’;
```

Cette condition est relativement simple et prend tout de même 4 lignes de code. L’opérateur ternaire va nous permettre de mettre cette condition sur une seul ligne de la manière suivante :

```php
echo ($boolean ? ‘true’ : ‘false’);
```

Vous pouvez faire ceci à l’infini mais ceci dégrade, bien évidement la lisibilité du code et peut s’avérer un frein dans la maintenance d’une application.

```php
echo ($boolean ? ($boolean2 ? ‘true true’ : ‘true false’) : ‘false’);
```

L’opérateur ternaire peut également se représenter de la forme suivante

```php
$value = $value ?: $othervalue;
```

Cette méthode peut être pratique dans le cas de l’assignation d’une valeur par défaut. Prenons comme exemple le cas où l’on veut afficher comme nom le nom de famille s’il existe sinon le nom d’utilisateur :

```php
$display_name = $lastname ?: $username;
```

[Documentation](http://php.net/manual/fr/language.operators.comparison.php#language.operators.comparison.ternary)
