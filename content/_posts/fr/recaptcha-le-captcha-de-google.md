---
title: reCAPTCHA (le captcha de google)
description: De nos jours le spamming constitue un réel fléau. Il empoisonne nos réseaux, nos boîtes mail et nos sites web. En ce qui concerne les sites web, cela se caractérise par des inscriptions non désirées de robots dans le but de capturer des informations d'utilisateurs (souvent des adresses mails).
image: /images/recaptcha.jpg
tags:
  - google
  - securite
  - php
slug: recaptcha-le-captcha-de-google
updated: '2013-03-10 14:19'
created: '2013-03-10 14:19'
---

De nos jours le spamming constitue un réel fléau. Il empoisonne nos réseaux, nos boîtes mail et nos sites web. En ce qui concerne les sites web, cela se caractérise par des inscriptions non désirées de robots dans le but de capturer des informations d'utilisateurs (souvent des adresses mails). Il existe de nombreux services performants qui permettent d'éviter ce spamming web. Parmis ceux-ci, il y a reCaptcha.

reCaptcha, c'est quoi ? Vous ne connaissez pas son nom mais pourtant vous l'avez vu au moins une fois sur un site web. Il s'agit des captchas affichés via l'API google.

![reCaptcha](https://developers.google.com/recaptcha/images/smallCaptchaSpaceWithRoughAlpha.png)

### reCaptcha, c'est quoi ?

reCaptcha, c'est une API performante de google possédant une double fonctionnalité. La première fonctionnalité est de lutter contre le spamming des sites web mettant en place un captcha. La deuxième fonctionnalité sert à numériser les livres. Oui, oui vous avez bien entendu, reCaptcha sert aussi à numériser les livres ! En effet, google se sert des capacités humaines de reconnaissances des caractères là où les systèmes de reconnaissances optique de caractères (OCR) ne reconnaissent pas certains caractères ou doutent des résultats de la reconnaissance. Dans le formulaire, il y a donc une image de vérification pour le captcha et une image pour la reconnaissance du mot non reconnu. Le script de google considère alors que si l'utilisateur arrive à déchiffrer le captcha il a aussi réussi à déchiffrer le mot inconnu et ce mot sera considéré comme connu si plusieurs utilisateurs ont répondu le même mot.

Depuis peu, étant données que les logiciels de reconnaissance de caractères sont de plus en plus efficaces, reCaptcha sert aussi à la reconnaissance de caractères dans google maps. Maintenant, reCaptcha peut afficher un texte de vérification pour le captcha et une photo pouvant contenir une plaque de numéro de rue par exemple.

![recaptcha](/images/recaptcha-google.png)

### Pourquoi l'utiliser ?

Le captcha est l'une des méthodes les plus efficace contre le spamming, néanmoins la mise en place de cette protection pose quelques problèmes. En effet, afin de générer un captcha, en php, l'utilisation de la bibliothèque GD est obligatoire or elle souvent désactivé par défaut sur les serveurs gratuit du fait qu'elle est très consommatrice de
ressources du processeur.

Même si maintenant de nombreux scripts peuvent se trouver sur internet, avoir un vrai bon script capable de générer un captcha efficace (et lisible) n'est pas trouvable partout. De plus, reCaptcha a l'avantage d'être accessible pour les déficients visuels car dans le cas de déficience visuel, le test visuel est remplacer par un test auditif. Et puis, c'est un service gratuit !

### Préparation à l'utilisation de reCaptcha

Pour commencer, inscrivez-vous sur le site [google reCaptcha](https://www.google.com/recaptcha/admin/create) afin
d'obtenir une clé. Gardez cette clé ! Elle servira pour utiliser l'API.

Puis, si vous voulez utiliser reCaptcha avec du php allez à la partie avec le plugin. Si vous voulez l'utiliser en javascript, passez directement à la partie sans le plugin.

### reCaptcha avec le plugin

Tout d'abord, téléchargez le [plugin](http://code.google.com/p/recaptcha/downloads/list?q=label:phplib-Latest). Puis, afin d'afficher le
captcha, insérez le code suivant dans votre code :

```php
<?php

require_once('recaptchalib.php');
$publickey = "votre clé"; // clé récupérée à la partie précédente

echo recaptcha_get_html($publickey);

```

Voici une page html type qui afficherait seulement le captcha :

```html
<!-- the body tag is required or the CAPTCHA may not show on some browsers -->;
<!-- your HTML content -->;
<form action="verify.php" method="post">
  ;
  <?php 
        require_once('recaptchalib.php');  
    
        $publickey = "your_public_key"; // you got this from the signup page 
        echo recaptcha_get_html($publickey); 
    ?>

  <input type="submit" />
</form>
<!-- more of your HTML content -->
```

Maintenant que le captcha s'affiche, on voudrait bien savoir si les utilisateurs rentrent correctement le captcha. Afin d'effectuer cette vérification, utilisez le code suivant :

```php
<?php

require_once('recaptchalib.php');
$privatekey = "votre cle";
$resp = recaptcha_check_answer (
    $privatekey, $_SERVER["REMOTE_ADDR"],
    $_POST["recaptcha_challenge_field"],
    $_POST["recaptcha_response_field"]
);

if (!$resp->is_valid) {
    // si le captcha rentré n'est pas bon
    die ("Vous n'avez pas rentré le bon captcha." . "(reCAPTCHA à dit : " . $resp->error . ")");
} else {
    // si le captcha est bon
}

```

### reCaptcha sans le plugin

Si vous ne connaissez pas php ou si tout simplement vous n'utilisez pas ce langage pour votre application, vous pouvez tout de même utiliser reCaptcha mais cette fois-ci sans télécharger le plugin.

Dans ce cas vous allez devoir demander le formulaire via du code html ou du JavaScript. Voyons tout d'abord le code pour afficher le captcha juste avec du html :

```html
<script
  type="text/javascript"
  src="http://www.google.com/recaptcha/api/challenge?k=your_public_key"
></script>
<noscript>
  <iframe
    src="http://www.google.com/recaptcha/api/noscript?k=your_public_key"
    height="300"
    width="500"
    frameborder="0"
  ></iframe>
  <textarea name="recaptcha_challenge_field" rows="3" cols="40"></textarea>
  <input
    type="hidden"
    name="recaptcha_response_field"
    value="manual_challenge"
  />
</noscript>
```

Maintenant on veut vérifier si le captcha rentré est bon mais cette fois-çi sans utiliser du PHP. Pour ce faire nous allons devoir envoyer une requête POST à la page suivante
: [http://www.google.com/recaptcha/api/verify](http://www.google.com/recaptcha/api/verify)

Voici regroupé dans un tableau les paramètres à passer en POST :

| Nom des paramètres |                        Valeurs                        |
| ------------------ | :---------------------------------------------------: |
| privatekey         |                       Votre clé                       |
| remoteip           | l'adresse ip de l'utilisateur qui à rempli le captcha |
| challenge          |                                                       |
| response           |  la valeur du champ nommé "recaptcha_response_field"  |

Après requête, google répondra de la façon suivante :

| Ligne 1 | "true" ou "false". "true" indique que le captcha rentré est correct
| Ligne 2 | Si la ligne 1 est "false", un code d'erreur sera retourné pour indiqué de quel erreur il s'agit

### Customiser son formulaire

Et oui ! Si le design du formulaire n'est pas à votre goût, ou tout simplement ne s'accorde pas du tout avec le design de votre site, google met à disposition la possibilitée de customiser le formulaire. Vous pouvez choisir parmis plusieurs design de formulaire prédéfini à partir du script suivant :

```javascript
var RecaptchaOptions = {
  theme: 'nom_du_theme',
}
```

Pour voir quel design sont disponibles et aussi comment fabriquer son propre design je vous invite à regarder sur cette page : [https://developers.google.com/recaptcha/docs/customization](https://developers.google.com/recaptcha/docs/customization).

Mais mon site est en français, pourquoi le formulaire est en anglais ? Mes visiteurs ne vont rien comprendre ! Pas d'inquiétude, vous pouvez changer la langue du formulaire. Si vous voulez que votre formulaire soit en français, utilisez le code suivant :

````javascript
var RecaptchaOptions = { lang : 'fr' };
``` 

### Liens connexes
* [site officiel](http://recaptcha.net)
* [Documentation](https://developers.google.com/recaptcha/)
````
