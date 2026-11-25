# Portfolio Backend

API Node.js + Express + PostgreSQL (Prisma) pour le portfolio 3D de Hamza :
authentification admin, CMS des projets/compétences, formulaire de contact
relié à un workflow n8n, et un mini dashboard analytics.

## Installation

```bash
cd portfolio-backend
npm install
cp .env.example .env
# Éditez .env : DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, N8N_WEBHOOK_URL
```

## Base de données

```bash
npx prisma migrate dev --name init
npm run seed        # crée le compte admin + les compétences de départ
```

## Lancer le serveur

```bash
npm run dev          # avec nodemon (développement)
npm start             # production
```

L'API tourne par défaut sur `http://localhost:4000`.

## Endpoints

| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/api/health` | Public | Vérifie que l'API répond |
| POST | `/api/auth/login` | Public | Connexion admin, retourne un JWT |
| GET | `/api/auth/me` | Protégé | Infos du compte connecté |
| GET | `/api/projects` | Public | Liste des projets |
| GET | `/api/projects/:slug` | Public | Un projet par slug |
| POST | `/api/projects` | Protégé | Créer un projet (CMS) |
| PUT | `/api/projects/:id` | Protégé | Modifier un projet |
| DELETE | `/api/projects/:id` | Protégé | Supprimer un projet |
| GET | `/api/skills` | Public | Liste des compétences |
| POST/PUT/DELETE | `/api/skills` | Protégé | CRUD compétences (CMS) |
| POST | `/api/contact` | Public (rate-limited) | Envoi du formulaire de contact → déclenche n8n |
| GET | `/api/contact` | Protégé | Boîte de réception admin |
| PATCH | `/api/contact/:id/status` | Protégé | Marquer un message lu/répondu |
| POST | `/api/analytics/track` | Public | Enregistre un événement (page_view, project_view, cta_click) |
| GET | `/api/analytics/summary` | Protégé | Résumé pour le dashboard admin |

Les routes protégées attendent un header `Authorization: Bearer <token>`
obtenu via `/api/auth/login`.

## Workflow n8n

`POST /api/contact` envoie le message (name, email, projectType, message)
en JSON vers `N8N_WEBHOOK_URL`. Côté n8n, le workflow suggéré :

1. **Webhook** (reçoit le payload)
2. **Validation / classification** du type de projet
3. **Notification** (Telegram, email ou Discord)
4. **Backup** dans un Google Sheet

Exportez ce workflow en `.json` et placez-le dans `n8n/workflows/` à la
racine du dépôt — utile comme preuve concrète dans la section
"AI & Automation" du portfolio.

## Déploiement

- Backend : Render ou Railway (variables d'environnement à reconfigurer)
- Base de données PostgreSQL : Neon ou Supabase (tier gratuit)
- Pensez à définir `FRONTEND_URL` en production pour restreindre CORS
