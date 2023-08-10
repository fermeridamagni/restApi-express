const app = require('./config/config');

const port = process.env.PORT;

const runServer = async () => {
  await app.listen(port, () => {
    console.log(`Server listening on route: http://localhost:${port}`);
  });
  const database = require('./config/database.config');
};

runServer();