import dns from 'dns';
// Force Node.js to use Google public DNS — fixes SRV lookup failures on Windows
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import { env } from './config/env';
import { connectDatabase } from './config/database';
import app from './app';

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
      console.log(`API: http://localhost:${env.PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (reason: Error) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();
