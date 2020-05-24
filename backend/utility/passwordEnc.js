import bcrypt from 'bcrypt';

const encoder = {};

// returns the hashed password to be stored in the database
encoder.hash = (password, salt) => bcrypt.hashSync(password, salt);

// returns true if the password match
encoder.decode = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

export default encoder;
