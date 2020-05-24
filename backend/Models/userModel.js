import mongoose from './dbConnection';

const { Schema } = mongoose;

const UserModel = {};

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  bloodType: String,
  genotype: String,
  nextofkinNum: String,
  emergencyNum: String,
  knownIllnesses: [{ type: String }],
  state: String,
  city: String,
  lga: String,
  residentialAdd: String,
  creationdate: { type: Date, default: Date.now() }
});

const User = mongoose.model('Users', userSchema);

// Object container for funtions to export
UserModel.User = User;

userSchema.set('toJSON', { virtuals: true });

// function to create a new user during signup
UserModel.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

// Probably only useful for admin purposes to know the amount of users we have
// this is not core to the application essentials
UserModel.list = (perPage, page) => new Promise((resolve, reject) => {
  User.find().limit(perPage).skip(perPage * page).exec((err, reports) => {
    if (err) {
      reject(err);
    } else {
      resolve(reports);
    }
  });
});

// function to find a user by their userID from the frontend which is stored in the token
UserModel.findById = (id) => new Promise((resolve) => {
  User.findById(id).then((result) => {
    resolve(result);
  });
});

// function to find a user by their email from the frontend which is stored in the token
UserModel.findOne = (email) => new Promise((resolve) => {
  User.findOne({ email }).then((result) => {
    resolve(result);
  });
});

export default UserModel;
