import http from 'http';
import app from './app';

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`Server Started on ${HOST}:${PORT}`);
});
