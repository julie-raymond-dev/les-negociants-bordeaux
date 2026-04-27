This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Email Setup TODO

Étape 1 : Création du compte Google Workspace (Avant le transfert)
  N'attendez pas le transfert pour commencer. 
   1. Allez sur Google Workspace et créez le compte avec le domaine lesnegociants.fr.
   2. Google va vous demander de valider que vous êtes le propriétaire. Il vous donnera un code (champ TXT) à ajouter dans la zone DNS actuelle (chez WordPress).
   3. À ce stade, le compte Google existe mais ne reçoit rien encore. C'est normal.

  Étape 2 : Lancer le transfert chez OVH
   1. Récupérez le code de transfert (AuthCode) sur votre interface WordPress.
   2. Lancez le transfert sur OVH.
   3. Important : Durant le transfert, la zone DNS va être recréée chez OVH.

  Étape 3 : Le "Basculeur" (Le moment clé)
  Une fois que le domaine est officiellement chez OVH :
   1. Allez dans la Zone DNS chez OVH.
   2. Pour le Web : Changez les champs A ou CNAME pour pointer vers votre projet Vercel (Next.js).
   3. Pour les Mails : Supprimez les anciens champs MX d'OVH et remplacez-les par ceux de Google (Google vous les donnera, ils ressemblent à aspmx.l.google.com).

  C'est à cet instant précis que les nouveaux emails arriveront dans le Gmail pro.

  Étape 4 : Récupérer les anciens mails
  Le transfert du domaine ne transfère pas le contenu des dossiers (boîte de réception, envoyés).
   * Si le client veut garder ses anciens emails WordPress dans son nouveau Gmail : Google Workspace propose un outil de migration de données très simple. Vous
     lui donnez l'adresse et le mot de passe de l'ancien mail WordPress, et Google va "aspirer" tous les anciens messages pour les mettre dans le nouveau Gmail.

  Étape 5 : Connecter EmailJS
  Maintenant que le Gmail pro fonctionne :
   1. Allez dans votre compte EmailJS.
   2. Ajoutez le service Gmail.
   3. Connectez-vous avec restaurant@lesnegociants.fr.
   4. Et voilà, le site envoie des mails via le Gmail pro, et le gérant reçoit les réponses et fait son administratif au même endroit.
