import IncidentReports from '../models/incidentReports.js';

export const createIncidentReport = async (req, res) => {
  try {
    const { title, disaster_category, description, location, date_time, user_id, severity, response_status, images } = req.body;
    const newReport = await IncidentReports.create({
      title,
      disaster_category,
      description,
      location,
      date_time,
      user_id,
      severity,
      response_status,
      images
    });
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getIncidentReports = async (req, res) => {
  try {
    const reports = await IncidentReports.find().populate('user_id', 'name email');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIncidentReportById = async (req, res) => {
  try {
    const report = await IncidentReports.findById(req.params.id).populate('user_id').populate('verified_by', 'name email');
    if (!report) return res.status(404).json({ message: 'Incident report not found' });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateIncidentReport = async (req, res) => {
  try {
    const updatedReport = await IncidentReports.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedReport) return res.status(404).json({ message: 'Incident report not found' });
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteIncidentReport = async (req, res) => {
  try {
    const deletedReport = await IncidentReports.findByIdAndDelete(req.params.id);
    if (!deletedReport) return res.status(404).json({ message: 'Incident report not found' });
    res.status(200).json({ message: 'Incident report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
