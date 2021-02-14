---
title: Supprimer l’entête server de Nginx
description: L’installation de Nginx par défaut laisse son identité sur l’entête des requêtes HTTP au moyen de l’entête Server. Pour des raisons de sécurités, il est important de laisser transparaître le moins d’informations possible au potentiel attaquant. Nous allons donc voir comment supprimer les informations de Nginx contenues dans ces entêtes.
image: /images/nginx.png
tags:
  - linux
  - nginx
slug: supprimer-lentete-server-de-nginx
updated: '2015-03-08'
created: '2015-03-08'
---

L’installation de Nginx par défaut laisse son identité sur l’entête des requêtes HTTP au moyen de l’entête " Server ". Pour des raisons de sécurités, il est important de laisser transparaître le moins d’informations possible au potentiel attaquant. Nous allons donc voir comment supprimer les informations de Nginx contenues dans ces entêtes.

L’entête `Server` de Nginx donnent deux informations importantes que sont le reverse proxy qui est utilisé (en l'occurrence Nginx), et sa version. Commençons par voir comment supprimer le numéro de version. Vous pouvez supprimer cette information via la ligne de configuration suivante dans le fichier nginx.conf.

```bash
server_tokens off;
```

Vous pouvez également supprimer totalement l’entête `server` au moyen du module [NginxHttpHeadersMoreModule](http://wiki.nginx.org/NginxHttpHeadersMoreModule). Attention ! Ce module n’est pas intégré de base à tout les packaging de Nginx. Pour avoir accès à ce module, vous devrez installer le paquet nginx-extras ou compiler à partir des sources en prenant soin d’intégrer le module à la compilation. Maintenant, pour supprimer l’entête, vous devez ajouter la ligne de configurations suivante à la configuration de vos sites.

```bash
more_clear_headers 'Server';
```

Vous pouvez également modifier l’entête pour la personnaliser à votre `server`.

```bash
more_set_headers 'Server: lemp';
```

Pour appliquer les changements, le service nginx doit être redémarrer.

```bash
sudo service nginx restart
```
