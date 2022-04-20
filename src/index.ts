import config from './core/config';
import server from './server';

import chain from './core/chain';

const startBlockchain = () => chain.createBlockchain();

const startServer = () => {
  const app = server();

  startBlockchain();

  app.listen(config.PORT, () =>
    console.log(`Listening to PORT ${config.PORT}`)
  );
};

startServer();
