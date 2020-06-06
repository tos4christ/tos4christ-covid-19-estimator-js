import incidentModel from '../Models/incidentReportsModel';

// sos controller would only insert the location and userID to the database
// the remaining work is done on socket.io
const sosController = (req, res) => {
  incidentModel.createReport(req.body)
    .then(() => {
      res.status(201).send({ message: 'help is on the way' });
    });
};

export default sosController;
