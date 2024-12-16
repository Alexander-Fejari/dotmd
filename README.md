# 🌟 **DotMD**

DotMD est une application web minimaliste et puissante permettant de **créer**, **éditer** et **gérer** des fichiers README écrits en Markdown. Contrairement à d'autres outils similaires, DotMD se distingue par sa profonde intégration avec GitHub, son éditeur en temps réel et sa conception centrée sur la simplicité d'utilisation, tout en offrant des fonctionnalités avancées pour les développeurs.

---

## 🚀 **Fonctionnalités principales**

### 🔐 **1. Gestion des utilisateurs**
- Authentification sécurisée via **GitHub (OAuth)**.
- Gestion des sessions et protection des données utilisateur.

### 🔗 **2. Interaction avec GitHub**
- Affichage des repositories de l'utilisateur directement depuis GitHub.
- Récupération et affichage des fichiers README existants.
- Création et modification des README avec **sauvegarde automatique**.

### ✍️ **3. Éditeur Markdown intégré**
- **Aperçu en temps réel** des fichiers README.
- Interface moderne et intuitive pour l'édition.
- Support complet des fonctionnalités Markdown :
    - Titres
    - Tableaux
    - Liens
    - Images

#### 🖼️ Exemple visuel de l'éditeur

![Exemple de l'éditeur Markdown](https://via.placeholder.com/800x400.png?text=Exemple+Editeur+DotMD)

*Un aperçu moderne et fonctionnel, conçu pour les développeurs.*

---

## 🛠️ **Architecture technique**

### 🎨 **Frontend**
- **Framework** : [Next.js](https://nextjs.org/) (React).
- **Langage** : TypeScript pour une meilleure sécurité et maintenabilité.
- **Style** : Tailwind CSS pour un design réactif et moderne.

### 🌐 **Backend**
- **API Routes** : Gestion des endpoints via les API routes intégrées de Next.js.
- **Base de données** : PostgreSQL avec Prisma comme ORM.
- **SDK GitHub** : Utilisation de [Octokit](https://github.com/octokit/rest.js) pour interagir avec l'API GitHub.

### 💾 **Base de données**
- Gestion des utilisateurs et des brouillons de README.
- Hébergement local en développement (PostgreSQL) et sur un VPS en production.

---

## 🪂 **Déploiement**

### 💻 **Environnement de développement**

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/dotmd.git
   cd dotmd
   ```
2. Installez les dépendances :
   ```bash
   npm run install
   ```
3. Configurez les variables d'environnement :
    - Renommez `.env.example` en `.env` et remplissez les valeurs nécessaires (**GitHub OAuth**, **base de données**, etc.).

4. Lancez l'application :
   ```bash
   npm run dev
   ```

### 🌍 **Environnement de production**

1. Préparez votre serveur (**VPS**) :
    - Installez PostgreSQL et configurez-le pour la production.
    - Configurez un proxy **Nginx** pour sécuriser votre application.

2. Configurez et déployez votre application :
    - Mettez à jour les variables d'environnement pour la production.
    - Démarrez l'application avec PM2 :
      ```bash
      pm2 start npm -- start
      ```

---

## 🏁 **Conclusion**

DotMD est votre allié idéal pour gérer efficacement vos README en Markdown. Grâce à son interface intuitive et son intégration fluide avec GitHub, elle simplifie les tâches complexes liées à la documentation des projets.

Prêt à donner un coup de boost à vos projets ? **Essayez DotMD dès maintenant et transformez la façon dont vous créez vos README !**

---

# 🎉 **ENJOY !**
