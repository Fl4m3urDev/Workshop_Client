import { PrismaClient, Subscription, ActionType } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Catégories
  const categories = await prisma.categories.createMany({
    data: [
      { name: "Technologie" },
      { name: "Sport" },
      { name: "Culture" },
    ],
    skipDuplicates: true,
  });

  // Utilisateurs
  const users = await prisma.users.createMany({
    data: [
      { username: "Alice", email: "alice@example.com", password: "jeanjean", subscription_type: Subscription.subscriber },
      { username: "Bob", email: "bob@example.com", password: "DorImaM3no", subscription_type: Subscription.free },
    ],
    skipDuplicates: true,
  });

  // Articles
  const article1 = await prisma.articles.create({
    data: {
      title: "La révolution de l’IA",
      content: "Un article sur les progrès récents de l’IA...",
      author: "Rédaction",
      category: { connect: { category_id: 1 } }, // Technologie
      highlighted: true,
    },
  });

  const article2 = await prisma.articles.create({
    data: {
      title: "Victoire de l’équipe nationale",
      content: "Retour sur un match historique...",
      author: "Rédaction sport",
      category: { connect: { category_id: 2 } }, // Sport
    },
  });

  // Tags
  const tagAI = await prisma.tags.create({ data: { name: "IA" } });
  const tagFootball = await prisma.tags.create({ data: { name: "Football" } });

  // Associer tags aux articles
  await prisma.articleTags.createMany({
    data: [
      { article_id: article1.article_id, tag_id: tagAI.tag_id },
      { article_id: article2.article_id, tag_id: tagFootball.tag_id },
    ],
    skipDuplicates: true,
  });

  // Actions utilisateurs
  await prisma.userActions.createMany({
    data: [
      { user_id: 1, article_id: article1.article_id, action_type: ActionType.view },
      { user_id: 1, article_id: article1.article_id, action_type: ActionType.like },
      { user_id: 2, article_id: article2.article_id, action_type: ActionType.view },
    ],
  });

  console.log("✅ Seed terminé !");
}

main()
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
