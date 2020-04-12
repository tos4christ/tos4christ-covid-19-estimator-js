const logQuery = {};

logQuery.post = 'INSERT INTO logs(log) VALUES($1) RETURNING *';

logQuery.get = 'SELECT * FROM logs'

export default logQuery;
