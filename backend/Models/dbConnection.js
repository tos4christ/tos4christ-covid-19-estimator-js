import mongoose from 'mongoose';

const options = {
  // autoIndex: false,
  // reconnectTries: 30,
  // reconnectInterval: 500,
  // poolSize: 10,
  // bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectWithRetry = () => {
  mongoose.connect('mongodb://sekinat:sekinat1@ds237475.mlab.com:37475/roadmaster-be', options).then(() => {
  }).catch(() => {
    setTimeout(connectWithRetry, 5000);
  });
};
connectWithRetry();

export default mongoose;
