/* this model is not currently being used */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const IncidentReportModel = {};

const irSchema = new Schema({
  lat: Number,
  lon: Number,
  userId: { id: { type: Schema.Types.ObjectId, ref: 'Users' } },
  description: String,
  pictures: [{ type: Buffer }],
  reportType: { type: String, possibleValues: ['sos', 'eyewitness'] },
  creationTime: { type: Date, default: Date.now() }
});

const Ireport = mongoose.model('Incidentreports', irSchema);

irSchema.set('toJSON', { virtuals: true });

IncidentReportModel.createReport = (reportData) => {
  const report = new Ireport(reportData);
  return report.save();
};

export default IncidentReportModel;
