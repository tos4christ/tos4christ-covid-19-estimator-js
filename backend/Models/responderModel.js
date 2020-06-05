import mongoose from './dbConnection';

const { Schema } = mongoose;

const RespondersModel = {};

const responderSchema = new Schema({
  nameOfUnit: { type: String, unique: true, required: true },
  designation: String,
  state: String,
  city: String,
  emergencyNumber: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  creationdate: { type: Date, default: Date.now() }
});

const Responder = mongoose.model('Responders', responderSchema);

RespondersModel.createResponder = (responderData) => {
  const responder = new Responder(responderData);
  return responder.save();
};

RespondersModel.getAll = () => new Promise((resolve) => {
  Responder.find().then((result) => {
    resolve(result);
  });
});

RespondersModel.getRespondersByLocation = (location) => new Promise((resolve) => {
  Responder.findOne({ location }).then((result) => {
    resolve(result);
  });
});

RespondersModel.getRespondersByEmail = (email) => new Promise((resolve) => {
  Responder.findOne({ email }).then((result) => {
    resolve(result);
  });
});

RespondersModel.getRespondersById = (id) => new Promise((resolve) => {
  Responder.findById(id).then((result) => {
    resolve(result);
  });
});

export default RespondersModel;
