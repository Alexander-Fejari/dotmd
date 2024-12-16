import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding the database...");

    // Créer des utilisateurs
    const user1 = await prisma.user.create({
        data: {
            githubId: '12346',
            name: 'Alf Doe',
            email: 'alf.doe@example.com',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            githubId: '67891',
            name: 'Alice Smith',
            email: 'Alice.smith@example.com',
        },
    });

    console.log('Users created:', { user1, user2 });

    // Ajouter des brouillons pour ces utilisateurs
    const draft1 = await prisma.draft.create({
        data: {
            userId: user1.id,
            repoName: 'the-repo',
            content: '# This is a draft for Alf Doe',
        },
    });

    const draft2 = await prisma.draft.create({
        data: {
            userId: user2.id,
            repoName: 'fuck-repo',
            content: '# This is a draft for Alice Smith',
        },
    });

    console.log('Drafts created:', { draft1, draft2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
