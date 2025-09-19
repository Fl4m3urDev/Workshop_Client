import { PrismaClient, Subscription, ActionType } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // ----------------------
  // Catégories
  // ----------------------
  const categories = [
    { category_id: 1, name: "Technologie" },
    { category_id: 2, name: "Sport" },
    { category_id: 3, name: "Culture" },
    { category_id: 4, name: "Économie" },
    { category_id: 5, name: "Santé" },
  ];
  await prisma.categories.createMany({ data: categories, skipDuplicates: true });

  // ----------------------
  // Utilisateurs
  // ----------------------
  const users = [
    {
      user_id: 1,
      username: "Alice",
      email: "alice@example.com",
      password: "jeanjean",
      subscription_type: Subscription.subscriber,
    },
    {
      user_id: 2,
      username: "Bob",
      email: "bob@example.com",
      password: "DorImaM3no",
      subscription_type: Subscription.free,
    },
    {
      user_id: 3,
      username: "Charlie",
      email: "charlie@example.com",
      password: "SuperPass123",
      subscription_type: Subscription.free,
    },
  ];
  await prisma.users.createMany({ data: users, skipDuplicates: true });

  // ----------------------
  // Articles
  // ----------------------
  const articles = [
    {
      article_id: 1,
      title: "La révolution de l’IA",
      content: "Un article sur les progrès récents de l’IA...",
      author: "Rédaction",
      category_id: 1,
      highlighted: true,
    },
    {
      article_id: 2,
      title: "Victoire de l’équipe nationale",
      content: "Retour sur un match historique...",
      author: "Rédaction sport",
      category_id: 2,
    },
    {
      article_id: 3,
      title: "Les tendances culturelles en 2025",
      content: "Analyse des nouvelles pratiques culturelles...",
      author: "Magazine Culture",
      category_id: 3,
    },
    {
      article_id: 4,
      title: "Crise économique mondiale",
      content: "Un point sur les fluctuations du marché...",
      author: "ÉcoNews",
      category_id: 4,
    },
    {
      article_id: 5,
      title: "Nouvelles découvertes médicales",
      content: "Zoom sur les dernières avancées en médecine...",
      author: "Santé Plus",
      category_id: 5,
    },
    {
      article_id: 6,
      title: "Football européen : les transferts",
      content: "Résumé des plus gros transferts de la saison...",
      author: "Journal Sportif",
      category_id: 2,
    },
  ];
  await prisma.articles.createMany({ data: articles, skipDuplicates: true });

  // ----------------------
  // Tags
  // ----------------------
  const tags = [
    { tag_id: 1, name: "IA" },
    { tag_id: 2, name: "Football" },
    { tag_id: 3, name: "Économie" },
    { tag_id: 4, name: "Santé" },
    { tag_id: 5, name: "Culture" },
  ];
  await prisma.tags.createMany({ data: tags, skipDuplicates: true });

  // ----------------------
  // Relations ArticleTags
  // ----------------------
  const articleTags = [
    { article_id: 1, tag_id: 1 }, // IA
    { article_id: 2, tag_id: 2 }, // Football
    { article_id: 3, tag_id: 5 }, // Culture
    { article_id: 4, tag_id: 3 }, // Économie
    { article_id: 5, tag_id: 4 }, // Santé
    { article_id: 6, tag_id: 2 }, // Football
  ];
  await prisma.articleTags.createMany({ data: articleTags, skipDuplicates: true });

  // ----------------------
  // Actions utilisateurs
  // ----------------------
  const actions = [
    { action_id: 1, user_id: 1, article_id: 1, action_type: ActionType.view },
    { action_id: 2, user_id: 1, article_id: 1, action_type: ActionType.like },
    { action_id: 3, user_id: 2, article_id: 2, action_type: ActionType.view },
    { action_id: 4, user_id: 2, article_id: 6, action_type: ActionType.like },
    { action_id: 5, user_id: 3, article_id: 3, action_type: ActionType.view },
    { action_id: 6, user_id: 3, article_id: 4, action_type: ActionType.share },
    { action_id: 7, user_id: 1, article_id: 5, action_type: ActionType.newsletter_click },
  ];
  await prisma.userActions.createMany({ data: actions, skipDuplicates: true });
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
