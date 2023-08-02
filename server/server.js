import app from './app.js';
import connectionTodb from './config/db.connection.js';

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectionTodb();
  console.log(`App is running at http://localhost:${PORT}`);
});
