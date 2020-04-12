import { Pool } from 'pg';
import query from '../Models/query';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const logsController = (req, res, next) => {
    pool.query(query.get)
        .then( logs => {
            let textData = '';
            const data = logs.rows;
            for (let log of data) {
                textData += `${log.log}\n`;
            }
            res.set('Content-Type', 'text/plain');
            res.send(textData);
        })
}

export default logsController;
