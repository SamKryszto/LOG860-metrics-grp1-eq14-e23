# Tests et demonstration

Les tests implémentés pour cette itération sont des tests unitaires. Le module qui a été testé est [github.js](https://github.com/SamKryszto/Oxgen-OS---Eq-14--E23/blob/main/app/src/services/github.js) car c'est sur celui-ci ou notre logique pour récupérer et calculer les métriques a été faite.

## Étapes pour exécuter les tests

1. Partir les conteneurs avec ``docker compose up --build``
2. Se connecter au conteneur node.js avec ``docker exec -it log680-lab1-app-1``
3. Exécuter la commande ``npm run test``
