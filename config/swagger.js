import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Boibazzar API',
      version: '1.0.0',
      description: 'API documentation for CSE-327 project',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ['./controllers/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
