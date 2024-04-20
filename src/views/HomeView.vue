<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <div class="text-white">
      <main class="bg-gray-700 p-6 d-flex gap-5 rounded mt-4">
        <div class="w-1/2 d-flex gap-5 flex-col rounded mt-4">
          <section id="fonctionnalites">
            <h2 class="text-pink-600">Fonctionnalités</h2>
            <ul>
              <li> - Création, lecture, mise à jour et suppression (CRUD) des notes</li>
              <li> - Gestion des matières, niveaux et années académiques</li>
              <li> - Filtrage des notes par matière, niveau et année académique</li>
              <li> - Exportation des notes au format CSV</li>
              <li> - Authentification des utilisateurs</li>
              <li> - Gestion des rôles utilisateurs (administrateur, enseignant, étudiant)</li>
            </ul>
          </section>

          <section id="installation">
            <h2 class="text-pink-600">Installation</h2>
            <ol>
              <li> - Cloner le dépôt GitHub</li>
              <li> - Installer les dépendances</li>
              <li> - Configurer les variables d'environnement</li>
              <li> - Démarrer l'application en mode développement</li>
            </ol>
            <p>Ouvrez votre navigateur et accédez à http://localhost:5173</p>
          </section>

          <section  id="technologies">
            <h2  class="text-pink-600">Technologies</h2>
            <ul>
              <li> - Vue.js</li>
              <li> - Vue Router</li>
              <li> - Vuestic</li>
              <li> - Pinia</li>
              <li> - Axios</li>
              <li> - Tailwind CSS</li>
            </ul>
          </section>


          <section id="contributeurs">
            <h2>Contributeurs</h2>
            <ul>
              <li><a  class="text-pink-600" href="https://www.zack-abessolo.com">Zackarie ABESSOLO EKOUMA</a></li>
            </ul>
          </section>
        </div>
        <div class="w-1/2 d-flex flex-col gap-3">
          <section id="architecture">
            <h2 class="text-pink-600">Architecture</h2>
            <p>La structure proposée pour les pages et les mises en page (layouts) du projet Vue 3 :</p>
            <pre>
            <code class="text-[14px]">
            src/
              ├── components/
              │   └── ...
              ├── layouts/
              │   └── MainLayout.vue
              ├── stores/
              │   └── ...
              ├── views/
              │   ├── Matières/
              │   ├── Années/
              │   ├── Classes/
              │   ├── Login/
              │   └── HomeViews.vue
              ├── App.vue
              └── main.js
            </code>
          </pre>
          </section>

          <p>Explication des pages</p>
          <div class="bg-gray-800 p-4 rounded-lg p-3 mt-3">
            <p> - <strong>HomeView.vue</strong> : Page d'accueil de l'application</p>
            <p> - <strong>LoginView.vue</strong> : Page de connexion des utilisateurs</p>
            <p> - <strong>MatièresView.vue</strong> : Page de gestion des matières</p>
            <p> - <strong>ClassesView.vue</strong> : Page de gestion des classes</p>
            <p> - <strong>NotesView.vue</strong> : Page de gestion des notes</p>
            <p> - <strong>AnnéesView.vue</strong> : Page de gestion des années académiques</p>
          </div>

          <div class="">
            <h2 class="text-pink-600">API</h2>
            <p>Le projet utilise une API REST pour gérer les données. l'adresse API : <a href="https://gest-notes.zack-abessolo.com/docs" class="text-pink-600">https://api-notes.zack-abessolo.com</a></p>
            <p class="mt-3">L'api a été mis en place grace au framwork "NodeJS/Express"</p>
          </div>

        </div>
      </main>

    </div>
  </MainLayout>
</template>