import { Pool } from 'pg';
import query from '../Models/query';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const logsController = (req, res, next) => {
    pool.query(query.get)
        .then( logs => {
            const textData = '';
            for (let log of logs) {
                textData += `${log.log}\n`;
            }
            res.json(textData);
        })
}

export default logsController;
