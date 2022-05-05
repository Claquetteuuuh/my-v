<p align="center">
  <a href="https://my-v.xyz">
    <img src="https://my-v.xyz/img/logos/logo-gradient.png" height="96">
    <h3 align="center">MyV</h3>
  </a>
</p>

<p align="center">
   Postez. Visionnez. Partagez
</p>

# MyV
MyV est une plateforme de visionnage de video en ligne gratuite, créé pour le concour Les Trophées NSI en utilisant **<a href="https://fr.reactjs.org/">ReactJS</a>** et **<a href="https://nextjs.org/">NextJS</a>**. Grâce à MyV, vous pouvez **publier**, **visionner** et **partager** des videos avec vos amis.

- [Documentation](#documentation)
  - [Installation](#installation)
    - [NodeJS](#nodejs)
    - [Telecharger Le Code](#telecharger-le-code)
    - [Dependances](#dependances)
    - [Demarrage](#demarrage)
  - [Utilisation](#utilisation)
    - [Server](#server)
    - [Router](#router)
    - [Composant](#composant)
    - [Route API](#route-api)
    - [Utilisation du site](#utilisation-du-site)

## Documentation

## Installation
Pour lancer le code chez vous il vous sera indispensable d'installer tout les outils nécessaire.

## NodeJS
Dans un premier temps vous devez installer <a href="https://nodejs.org/en/download/">NodeJS</a>, et suivre les instructions en oubliant pas d'installer `npm`.

## Telecharger Le Code
Pour telecharger le code, vous devez vous rendre sur *https://github.com/Claquetteuuuh/my-v* et cliquer sur Code puis sur ZIP.

## Dependances
Une fois votre dossier dézippé, vous remarquerez dans le fichier <a href="https://github.com/Claquetteuuuh/my-v/blob/main/package.json">`package.json`</a> qu'il y a la liste des dépendances du projet. Rendez vous sur votre terminal dans le chemin du dossier puis effectuer la commande `npm install` pour les installer.

## Demarrage
Pour executer le code du site vous devez vous rendre sur votre terminal dans le chemin du dossier puis effectuer la commande `npm run dev` qui lancera le site en mode développement. Vous pourrez donc modifier des fichiers et observer le resultat directement sur `http://localhost:PORT`.

## Utilisation
Comment utiliser MyV ?

## Server
Grâce à <a href="https://nextjs.org/">NextJS</a> le server est directement lancé sans code de notre part, cependant il vous est possible de creer votre server custom, pour en savoir plus rendez vous sur *https://nextjs.org/docs/advanced-features/custom-server*.

## Router
Le router de MyV est constitué de:
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/index.js">`La page d'accueil`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/signup.js">`La page d'enregistrement`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/login.js">`La page de connection`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/channel.js">`La page de chaine`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/post-video.js">`La page d'envois de video`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/research.js">`La page de recherche de video`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/view.js">`La page de visionnage de video`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/404.js">`La page 404`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/tree/main/pages/api">Toutes les routes de l'<a href="#route-api">api</a></a>

## Composant
Les composants React sont au coeur du projet MyV. Pour comprendre leurs fonctionnement, rendez-vous sur *https://fr.reactjs.org/docs/components-and-props.html*.
Tout les composants sont situer dans le dossier <a href="https://github.com/Claquetteuuuh/my-v/tree/main/components">`components`</a> et sont liée à un fichier css sous la forme `<COMPOSANT>.module.css` afin de generer un nom de classe unique.

## Route API
Après les routes "classique" renvoyant une page HTML, le router offre des routes dédier à l'API et chargé de renvoyer des donnés en JSON.
Les routes de l'API sont:
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/mongo-stream.js">`L'envois des videos au client`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/signup.js">`La creation de compte`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/login.js">`La connection à votre compte`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/logout.js">`La déconnection`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/get-picture.js">`La récuperation de la photo de profil d'un utilisateur`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/push-video.js">`La publication d'une video`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/add-comment.js">`La publication de commentaire sur une video`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/add-view-or-like.js">`L'ajout de like ou de vue sur une video`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/dislike.js">`La suppression d'un like sur une video`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/has-like.js">`La verification de la présence d'un like sur une video`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/isuser.js">`La comparaison de 2 utilisateur pour savoir si ils sont les mêmes`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/get-video-of.js">`La recuperation des videos d'un utilisateur`</a>
  - <a href="https://github.com/Claquetteuuuh/my-v/blob/main/pages/api/get-comment-of/%5Bpid%5D.js">`La récuperation des commentaires d'une video`</a>

## Utilisation du site
Pour en savoir plus sur l'utilisation du site, visionnez cette <a>video</a>
