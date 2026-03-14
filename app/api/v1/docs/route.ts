import { docsRoute } from 'next-rest-framework';

export const { GET } = docsRoute({
  openApiObject: {
    info: {
      title: 'AI Content Agent API',
      version: '1.0.0',
    },
  },
  docsConfig: {
    provider: 'redoc',
    title: 'API Documentation',

  },
  deniedPaths: ['/callback'], // Add this line
});
