import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon API Next.js',
      version: '1.0.0',
      description: 'Documentation de l\'API pour mon projet Next.js avec Prisma et PostgreSQL',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // URL de base de ton API, à adapter selon ton environnement
      },
    ],
  },
  apis: ['./app/api/**/*.{ts,tsx}'], // Chemin vers tes Route Handlers TypeScript
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;