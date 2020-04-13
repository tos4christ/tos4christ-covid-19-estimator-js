import { config } from 'dotenv';
import express from 'express';
import { Pool } from 'pg';
import responseTime from 'response-time';
import router from './Routers';
import query from './Models/query';

config();

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.query('DELETE FROM logs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(responseTime((req, res, time) => {
  const log = `${req.method}  ${req.originalUrl}  ${res.statusCode} ${parseInt((time + 20), 10)}ms`;
  pool.query(query.post, [log]);
}));

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
