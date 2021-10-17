---
title: Créer un plugin Wordpress
description: Nous avons vu dans les derniers cours comment manipuler quelques fonctionnalités importantes  pour personnaliser votre site au maximum. Aujourd’hui nous allons nous intéresser à la base de la création d’un plugin wordpress. Il est en effet important, de savoir manipuler les fonctionnalités de base, mais ce qui nous intéresse généralement est de pouvoir intégrer de façon propre et en click vos ajouts ou changements sur n’importe quel site.
image: /images/wordpress.png
tags:
  - php
  - wordpress
slug: creer-un-plugin-wordpress
updated: '2013-10-27'
created: '2013-10-27'
---

Nous avons vu dans les derniers cours comment manipuler quelques fonctionnalités importantes pour personnaliser votre site au maximum. Aujourd’hui nous allons nous intéresser à la base de la création d’un plugin wordpress. Il est en effet important, de savoir manipuler les fonctionnalités de base, mais ce qui nous intéresse généralement est de pouvoir intégrer de façon propre et en click vos ajouts ou changements sur n’importe quel site.

### Plugin Wordpress ?

Un plugin wordpress est une extension, ou en d’autre termes, un ensemble de codes rendant possible l’extension des fonctionnalités de votre CMS. Car Wordpress ne peut pas tout faire, il permet donc qu’on puisse étendre ses fonctionnalités suivant nos besoins. La plupart des plugins sont disponibles sur le site même de Wordpress, à ce lien : [http://wordpress.org/plugins/](http://wordpress.org/plugins/).

Dans les plugins de la galerie, on peut trouver un peu de tout. Certains permettent l’ajout de slider, de formulaires ou de widget. Certains autres vont améliorer le CMS au point de vu de la performance ou de la sécurité. D’autre pourront vous permettre de créer un forum.

### Créer un Plugin

Pour créer un plugin, comme tout ce qui se fait avec Wordpress, c’est assez simple. Pour commencer créez un dossier où nous mettrons tout les fichiers de notre plugin. En premier lieu, il vous faudra créer un fichier `readme.txt` à mettre à la racine de votre dossier. Pour ce faire, la communauté Wordpress met à disposition un générateur pour vous aider dans cette tâche, vous pouvez le retrouver au lien suivant : [http://generatewp.com/plugin-readme/](http://generatewp.com/plugin-readme/). Maintenant, créons nôtre fichier principal qui contiendra certaines informations de notre plugins ainsi que ses fonctions principales.

Penchons-nous sur l’entête de ce fichier. L’entête suivant, est l’entête type pour tout plugin, il vous faut l’adapter selon les informations que vous voulez donner à votre plugin, ces informations se verront sur la page des plugins dans l’espace d’administration de votre site.

```php
    /**
     * Plugin Name: Name Of The Plugin
     * Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
     * Description: A brief description of the Plugin.
     * Version: The Plugin's Version Number, e.g.: 1.0
     * Author: Name Of The Plugin Author
     * Author URI: http://URI_Of_The_Plugin_Author
     * License: A "Slug" license name e.g. GPL2
     */
```

![Exemple d'affichage de plugin](/images/creer-plugin-wordpress1.jpg)

Mon fichier principal contiendra donc le code suivant :

```php
    <?php
    /**
     * Plugin Name: Follow me
     * Plugin URI: http://emmanuelgautier.fr
     * Description: Plugin to follow me
     * Version: 1.0
     * Author: Emmanuel Gautier
     * Author URI: http://emmanuelgautier.fr
     * License: GPL2
     */

    class Follow_widget extends WP_Widget{
        function Follow_Widget(){
            parent::__construct( 'follow-widget', 'Follow Widget', array(
                'classname' => 'follow-widget',
                'description' => 'Mon widget pour me suivre :P'
            ));
        }

        function widget($args, $instance){
            echo '<div class="follow-widget">
                <script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
                <div class="g-person" data-width="295" data-href="//plus.google.com/' . esc_attr( $instance['id'] ) . '" data-theme="dark" data-layout="landscape" data-rel="author"></div>
            </div>';
        }

        public function update( $new_instance, $old_instance ) {
            $instance = array();
            $instance['id'] = ( ! empty( $new_instance['id'] ) ) ? strip_tags( $new_instance['id'] ) : '';

            return $instance;
        }

        public function form(){
            if (isset($instance['id'])){
                $id = $instance['id'];
            } else {
                $id = 'me';
            }

            ?>

            <p><label for="<?php echo $this->get_field_id( 'id' ); ?>"><?php _e( 'ID Google+: ' ); ?></label><input id="<?php echo $this->get_field_id( 'id' ); ?>" name="<?php echo $this->get_field_name( 'id' ); ?>" type="text" value="<?php echo esc_attr( $id ); ?>" /></p>

            <?php
        }
    }

    function widget_init(){
        register_widget('follow_widget');
    }

    add_action('widgets_init', 'widget_init');
```

Et voilà, vous avez fait votre premier plugin, il ne reste plus qu’à l’installer via la page d’installation de plugin de votre espace d’administration. Les fichiers de votre plugin se retrouveront là où vous l’avez demandé dans le `readme.txt` au début de ce tutoriel.

![Installation de plugin wordpress](/images/creer-plugin-wordpress2.jpg)
