import config from './core/config';
import server from './server';

const startServer = () => {
  const app = server();
  app.listen(config.PORT, () =>
    console.log(`Listening to PORT ${config.PORT}`)
  );
};

startServer();
