const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function initCategories() {
  try {
    const categories = await db.category.findMany();

    if (!categories.length) {
      await db.category.createMany({
        data: [
          { name: 'Famous People' },
          { name: 'Movies & TV' },
          { name: 'Musicians' },
          { name: 'Games' },
          { name: 'Animals' },
          { name: 'Philosophy' },
          { name: 'Scientists' },
        ],
      });
    }
  } catch (error) {
    console.error('[INIT_CATEGORIES]', error);
  }
}

initCategories();
