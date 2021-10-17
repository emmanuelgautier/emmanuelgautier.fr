---
title: 'Creer un serveur Linux, Nginx, MySQL, PHP'
description: Apache n'est pas le seul serveur HTTP existant pour desservir des applications écrites en PHP, de nombreux autre existent dont Nginx. Dans le cas de l'utilisation de Nginx pour desservir des applications PHP on appellera cela une pile LEMP pour Linux, Nginx, Mysql et PHP.
image: /images/nginx.png
tags:
  - linux
  - ubuntu
  - nginx
  - mysql
  - mariadb
  - sql
  - php
slug: creer-un-serveur-linux-nginx-mysql-php
updated: '2015-02-15'
created: '2015-02-15'
---

Apache n'est pas le seul serveur HTTP existant pour desservir des applications écrites en PHP, de nombreux autre existent dont Nginx. Dans le cas de l'utilisation de Nginx pour desservir des applications PHP on appellera cela une pile LEMP pour Linux, Nginx, Mysql et PHP.

### Nginx

[Nginx](http://nginx.com/) est un serveur HTTP créé en 2002 par Igor Sysoev. Devenu populaire peu après 2006, le nombre de serveurs web l'utilisant est en constante augmentation et il séduit de plus en plus de développeurs et administrateurs système. Selon un récent sondage de [Netcraft](http://news.netcraft.com/archives/category/web-server-survey/), on dénombrerait près de 15% de l'ensemble des serveurs utilisant comme serveur HTTP Nginx. Il a pour avantage principal d'être léger et modulaire se qui est atout de performance non négligeable. Il peut également avec le rôle de proxy inversé à travers l'utilisation d'une interface FastCGI.

Dans ce tutoriel nous allons vous faire installer la dernière version du serveur. Pour ce faire nous n'utiliserons pas les dépôts officiels de la distribution linux mais les dépôts de Nginx eux-mêmes. Il vous faudra remplacer codename par le nom de version de Ubuntu dans les lignes de commandes suivantes.

Attention les dépôts pris dans ce tutoriel fonctionnent pour la distribution Ubuntu. Pour toute autre distribution, vous pouvez trouver le lien vers les dépôts correspondants sur la [documentation](http://nginx.org/en/linux_packages.html)

```bash
sudo echo "deb http://nginx.org/packages/ubuntu/ $(lsb_release -sc) nginx
    deb-src http://nginx.org/packages/ubuntu/ $(lsb_release -sc) nginx" > /etc/apt/sources.list.d/nginx-stable.list
wget -O - http://nginx.org/keys/nginx_signing.key | sudo apt-key add -
sudo apt-get update && sudo apt-get install nginx
```

Pour certaines raisons il est possible que la ligne d'ajout de clé ne fonctionne pas. Si tel est le cas, il vous faut remplacer la ligne précédante par la suivante.

```bash
wget -O - http://nginx.org/keys/nginx_signing.key > key.gpg && sudo apt-key add key.gpg
```

Pour les utilisateurs d'ubuntu, vous avez également la possibilité d'utiliser le [dépot Launchpad](https://launchpad.net/~nginx/+archive/ubuntu/stable) de Nginx. Voici comment procéder.

```bash
sudo add-apt-repository ppa:nginx/stable
sudo apt-get update && sudo apt-get install nginx
```

### MySQL

Afin de continuer la construction de notre pile applicative, nous avons besoin d'installer la base de données MySQL. Pour rappel MySQL est une base de données relationnelle (SGBDR) détenue par Oracle. Elle nous servira plus tard à stocker nos informations et les requêter à partir de PHP.

```bash
sudo apt-get install mysql-server mysql-client
```

Il s'agit maintenant d'avoir une base d'installation saine et sécurisée. Des utilitaires fournis avec le logiciel vous permette de mettre en place des configurations et des stratégies de sécurité de base.

```bash
sudo mysql_install_db
sudo /usr/bin/mysql_secure_installation
```

### PHP-FPM

L'installation de PHP au sein d'un serveur web est souvent associée à l'installation d'un module apache, or l'interpréteur de ce langage peut bien entendu être exécuté hors du contexte de Apache. [PHP-FPM](http://php-fpm.org) est une interface de communication avec PHP par le protocole FastCGI. Dans notre cas Nginx pourra donc communiquer avec PHP via le protocole FastCGI grâce à PHP-FPM.

Voici maintenant comment installer PHP-FPM :

```bash
sudo apt-get install php5-fpm
```

Pour pouvoir faire la relation avec la base de données mysql, il convient d'installer le module php correspondant :

```bash
sudo apt-get install php5-mysql
```

En fonction de vos besoins, vous avez la possibilité d'installer des modules complémentaires à votre instance PHP.

```
sudo apt-get install php5-mcrypt php5-curl php5-gd
```

### Configuration de PHP-FPM

Afin de pouvoir exécuter du PHP à partir de requête fait par Nginx, quelques configurations préalables sont nécessaires.

La configuration suivante concerne un point de sécurité. Dans le cas où la variable `fix_pathinfo` est à 1, l’interpréteur essayera de trouver un chemin de fichier le plus proche possible de celui demandé. En désactivant cette option, nous obligeons à prendre en compte les chemins de fichiers exactes uniquement. Il se peut que cette configuration de sécurité soit déjà active sur les dernières versions de php-fpm.

```bash
# /etc/php5/fpm/php.ini
cgi.fix_pathinfo = 0
```

Afin de faire communiquer PHP-FPM et Nginx, nous allons utiliser des sockets Unix. Pour ce faire, voici la configuration à effectuer :

```bash
#/etc/php5/fpm/pool.d/www.conf
listen = /var/run/php5-fpm.sock
```

Redémarrez ensuite le processus php

```bash
sudo service php5-fpm restart
```

### Création d'un site

Nous allons modifier le site par défaut de Nginx afin qu'il puisse permettre l'exécution de php. Pour ce faire voici la configuration de notre site par défaut :

```bash
#/etc/nginx/sites-available/default

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.php index.html index.htm;

    # Make site accessible from http://example.com/
    server_name example.com;

    location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;

    # redirect server error pages to the static page /50x.html
    #

    error_page 500 502 503 504 /50x.html;

    location = /50x.html {
        root /var/www/html;
    }

    # pass the PHP scripts to FastCGI server
    #
    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;

        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

        include fastcgi_params;
    }
```

Redémarrez Nginx

```bash
sudo service nginx restart
```

Les dernières lignes de notre configuration spécifient que pour tout chemin se terminant par .php, nous envoyons par FastCGI une commande d'exécution ayant un index et des paramètres définis. Comme vous le constatez, nous utilisons le chemin du socket unix que nous avons spécifié un peu plus tôt dans la configurations de PHP-FPM.

Il nous faut maintenant vérifier notre configuration. Pour ce faire nous allons créer un simple fichier PHP que nous mettrons à la racine du site par défaut de Nginx (`/var/www/html`).

```php
<?php phpinfo(); ?>
```
