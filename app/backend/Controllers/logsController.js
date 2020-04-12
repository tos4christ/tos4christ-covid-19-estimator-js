import { Pool } from 'pg';
import query from '../Models/query';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const logsController = (req, res, next) => {
    pool.query(query.get)
        .then( logs => {
            res.json({
                logs: logs.rows
            })
        })
}

export default logsController;
