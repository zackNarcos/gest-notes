# Gestionnaire de Notes (gest-notes)

![Preview](preview.png)

## Description
Le Gestionnaire de Notes (gest-notes) est une application web développée avec Vue.js,
conçue pour simplifier la gestion des notes de classe pour les enseignants dans le
contexte universitaire. Ce projet vise à fournir une interface conviviale permettant
aux enseignants de suivre les notes des étudiants pour différentes matières, niveaux
et années académiques, conformément au système LMD (Licence-Master-Doctorat).

Le projet propose une architecture basée sur Vue.js avec l'utilisation de Vuex pour
la gestion de l'état et Pinia pour le stockage des données. Les fonctionnalités
principales comprennent la création, la lecture, la mise à jour et la suppression
(CRUD) des notes pour chaque entité (matière, niveau, année académique).
e pas à ajuster le contenu en fonction de tes besoins spécifiques et de l'évolution
de ton projet. Dis-moi si tu veux que nous ajoutions plus de sections à la documentation
README ou si tu as d'autres questions !

## Fonctionnalités
- Création, lecture, mise à jour et suppression (CRUD) des notes
- Gestion des matières, niveaux et années académiques
- Filtrage des notes par matière, niveau et année académique
- Exportation des notes au format CSV
- Authentification des utilisateurs
- Gestion des rôles utilisateurs (administrateur, enseignant, étudiant)

## Installation
1. Cloner le dépôt GitHub
   ```bash 
   git clone
   ```


2. Installer les dépendances
   ```bash 
   npm install
    ```


3. Configurer les variables d'environnement
   Créer un fichier .env à la racine du projet et ajouter les variables d'environnement suivantes :
```bash 
   bash
   VUE_APP_API_URL=
   VUE_APP_API_VERSION=v1
```

4. Démarrer l'application en mode développement
```bash 
   npm run dev
```

### open your browser and navigate to http://localhost:5173

## Technologies
- Vue.js
- Vue Router
- Vuestic
- Pinia
- Axios
- Tailwind CSS

## Architecture

Bien sûr ! Voici la structure proposée pour les pages et les mises en page (layouts) de votre projet Vue 3, décrite en français :

```
src/
├── components/
│   └── ...
├── layouts/
│   └── MainLayout.vue
├── views/
│   ├── Matières/
│   ├── Niveaux/
│   ├── Années/
│   └── HomeViews.vue
├── App.vue
└── main.js
```

- *components/* : Ce répertoire contiendra les composants réutilisables utilisés à travers différentes pages et mises en page.
- *layouts/* : Ce répertoire contiendra les composants de mise en page. Nous allons créer un seul composant de mise en page appelé MainLayout.vue, qui sera la mise en page principale utilisée dans toute l'application.
- *pages/* : Ce répertoire contiendra les composants Vue représentant les différentes pages de votre application. Ici, nous avons des composants de remplacement pour la page d'accueil (Accueil.vue), la page des matières (Matières.vue), la page des niveaux (Niveaux.vue), et la page des années (Années.vue).
- *App.vue* : Il s'agit du composant racine de votre application Vue. Il importera et utilisera le composant de mise en page principal et gérera la navigation vers différentes pages.
- *main.js* : Il s'agit du point d'entrée de votre application Vue où vous initialiserez Vue et configurerez les plugins tels que Vue Router et Vuex si nécessaire.

## Contributeurs
- [Zackarie ABESSOLO EKOUMA](https://www.zack-abessolo.com)#   g e s t - n o t e s  
 