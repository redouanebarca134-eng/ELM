# Gestion des commandes ELM — Guide de configuration

Ton site enregistre maintenant chaque commande en base de données et te
donne un **tableau de bord privé** (`/admin`) pour les gérer, avec une
connexion prête pour ta société de livraison.

## 🧩 Ce qui a été ajouté

- **Base de données** des commandes (Vercel Postgres) — table `orders`
  créée automatiquement.
- **Enregistrement auto** : chaque commande passée sur le site est
  sauvegardée (en plus du WhatsApp).
- **Dashboard `/admin`** : voir les commandes, changer leur statut
  (قيد الانتظار → مؤكَّد → قيد التوصيل → تم التسليم...), stats
  (total, en attente, revenus livrés).
- **Bouton « إنشاء التوصيل »** : envoie la commande à ton transporteur
  via son API (token), récupère le numéro de suivi.

## ⚙️ Configuration (à faire une fois dans Vercel)

### 1. Créer la base de données
1. Vercel → ton projet **elm** → onglet **Storage**
2. **Create Database → Postgres** → valide
3. **Connect** la base au projet (Vercel ajoute les variables
   `POSTGRES_*` automatiquement)

### 2. Ajouter les secrets (Settings → Environment Variables)
| Variable | Valeur | Rôle |
|---|---|---|
| `ADMIN_PASSWORD` | un mot de passe fort de ton choix | accès à `/admin` |
| `CARRIER_API_URL` | ton domaine Ecotrack (voir ci-dessous) | créer les colis |
| `CARRIER_TOKEN` | ton token API Ecotrack | authentification |

#### 🚚 Spécifique Ecotrack
Ecotrack est une plateforme « white-label » : **chaque vendeur a son
propre sous-domaine**. Ton `CARRIER_API_URL` est donc **l'adresse de ton
espace Ecotrack**, par exemple :
```
https://votre-compte.ecotrack.dz
```
(sans `/` à la fin — c'est l'URL où tu te connectes à ton tableau de bord
Ecotrack).

**Trouver ton token :**
1. Connecte-toi à ton espace Ecotrack
2. Va dans **Paramètres / API** (ou « Profil → Jeton API »)
3. Copie le **token** → colle-le dans `CARRIER_TOKEN`

Le bouton « إنشاء التوصيل » du dashboard appelle
`POST {CARRIER_API_URL}/api/v1/create/order` avec les bons champs
Ecotrack (nom_client, telephone, adresse, commune, code_wilaya, montant,
produit, type=1, stop_desk) et récupère le numéro de suivi.

> ⚠️ Ces valeurs sont **secrètes** : elles vivent dans Vercel, jamais
> dans le code public.

### 3. Redéployer
Vercel → Deployments → **Redeploy** (pour prendre en compte la base et
les secrets).

## 🔐 Utilisation

- Va sur **`tonsite.vercel.app/admin`** → entre `ADMIN_PASSWORD`.
- Tu vois toutes les commandes, tu changes les statuts, tu crées les
  livraisons.

## 🚚 Brancher ton transporteur

Le module `src/lib/shipping/carrier.ts` contient un **modèle générique**.
Chaque transporteur algérien (ZR Express, Maystro, Ecotrack, Noest,
Yalidine, ProColis...) a un format d'API différent. Donne le nom de ton
transporteur + sa doc API, et on adapte :
- l'URL et les en-têtes d'authentification,
- les champs du `payload` (noms exacts attendus),
- le champ du numéro de suivi dans la réponse.
