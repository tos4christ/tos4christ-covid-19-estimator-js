import { config } from 'dotenv';
import express from 'express';
import { Pool } from 'pg';
import responseTime from 'response-time';
import StatsD from 'node-statsd';
import router from './Routers';
import query from './Models/query';

config();

const app = express();
const stats = new StatsD();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => console.log('Connected to the database'));

stats.socket.on('error',  error => {
  console.error(error.stack);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(responseTime((req, res, time) => {
  console.log(req.originalUrl, req.baseUrl);
  const log = `${Date.now()}    ${req.originalUrl}    done in ${time.toFixed(2)} seconds`;
  pool.query(query.post, [log])
    .then( logs => {
      console.log(logs.rows);
    })
}));
app.use('/test', (req, res, next) => {
  res.json('this is the test passed');
})
app.use('/api/v1/on-covid-19', router);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status).send({
    'Server Error': err.message
  });
});

export default app;
