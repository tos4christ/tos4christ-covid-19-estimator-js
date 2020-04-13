import { Pool } from 'pg';
import query from '../Models/query';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const logsController = (req, res) => {
  pool.query(query.get)
    .then((logs) => {
      let textData = '';
      const datas = logs.rows;
      const result = datas.reduce((initial, data) => {
        textData += `${data.log}\n`;
        return textData;
      }, '');
      res.set('Content-Type', 'text/plain');
      res.send(result);
    });
};

export default logsController;