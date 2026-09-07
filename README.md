# Diabeauty — Site vitrine

Site vitrine statique (HTML/CSS/JS, sans dépendances) pour un salon de beauté, avec une vidéo en fond de bannière d'accueil.

## Structure

```
index.html              Page unique (accueil, prestations, à propos, galerie, avis, contact)
assets/css/style.css    Styles
assets/js/main.js       Menu mobile, formulaire, effet de scroll
assets/video/hero-banner.mp4   Vidéo de la bannière d'accueil
```

## Personnalisation

- **Nom du salon / textes** : modifier directement dans `index.html`.
- **Couleurs** : variables CSS en haut de `assets/css/style.css` (`:root`).
- **Coordonnées** : section `#contact` dans `index.html`.
- **Formulaire de contact** : actuellement simulé côté client (aucun envoi réel). Pour le rendre fonctionnel, brancher `assets/js/main.js` sur un service d'envoi (ex. Formspree, EmailJS) ou un backend.

## Aperçu local

Ouvrir simplement `index.html` dans un navigateur, ou lancer un petit serveur local :

```
python3 -m http.server 8000
```

puis ouvrir `http://localhost:8000`.
