---
title: Connecteurs ODBC et PHP
description: Comme vous le savez sans doute déjà, Windows met à disposition des développeurs un moyen simplifié de connexion aux bases de données. Ce moyen s'appel ODBC pour Open DataBase Connectivity et est notament beaucoup utilisé par les outils BI. Cependant, il peut vous être utile de les utiliser au cours de votre développement web pour vous connecter à des bases de données sans avoir à rentrer certaines informations.
image: /images/wamp.jpg
tags:
  - php
  - windows
  - odbc
slug: connecteurs-odbc-et-php
updated: '2014-07-17'
created: '2014-07-17'
---

Comme vous le savez sans doute déjà, Windows met à disposition des développeurs un moyen simplifié de connexion aux bases de données. Ce moyen s'appel [ODBC](http://fr.wikipedia.org/wiki/Open_Database_Connectivity) pour Open DataBase Connectivity et est notament beaucoup utilisé par les outils BI. Cependant, il peut vous être utile de les utiliser au cours de votre développement web pour vous connecter à des bases de données sans avoir à rentrer certaines informations.

En effet, les connecteurs ODBC permettent de mettre en place une pré-configuration de connexion vers une base de données. Cette configuration se fait au moyen d'un driver spécifique à chaque type de base de données. Il vous est possible de mettre en place, par ce moyen, une configuration de connexion vers une base de tout type pour une base de données installée sur votre machine ou accessible par le réseau. La configuration inclue généralement le renseignement des identifiants de connexion, ce qui garantie une sécurité supplémentaire en offrant un moyen de connexion sans paramètre de connexion à rentrer dans chaque programmes. L'autre avantage notable est qu'il ne vous est pas nécessaire d'avoir un driver pluggé à votre langage car vous passez par le driver du connecteur. Pour utiliser ces connecteurs, il vous suffit de les appeler par leur nom avec la méthode propre au langage de programmation que vous utilisez.

En PHP, deux solutions de connexion via ODBC existent. La première s'apparente plus à une connexion ressemblante à [`mysql_connect`](http://php.net/manual/fr/function.odbc-connect.php). Pour l'utiliser vous devez utiliser la fonction [`odbc_connect`](http://fr2.php.net/manual/en/function.odbc-connect.php) comme suivant :

```php
$connection = odbc_connect($dsn, $user, $password);

//exemple
$connection = odbc_connect("Driver={SQL Server Native Client 10.0};Server=$server;Database=$database;", $user, $password);
```

L'autre solution est d'utiliser le classique objet [PDO](http://php.net/manual/fr/ref.pdo-odbc.php>). L'utilisation se fait comme suivant :

```php
try {
  $dbh = new PDO("odbc:MSSQLServer", $username, $password);
} catch (PDOException $e) {
  throw $e->getMessage();
}
```
