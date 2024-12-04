import UserReports from '../models/userReport.js';

export const createUserReport = async (req, res) => {
  try {
    const { title, disaster_category, description, location, date_time, user_id, images, status, validations } = req.body;
    const newReport = await UserReports.create({ title, disaster_category, description, location, date_time, user_id, images, status, validations });
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserReports = async (req, res) => {
  try {
    const reports = await UserReports.find().populate('user_id', 'name email').populate('validations', 'name email');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserReportById = async (req, res) => {
  try {
    const report = await UserReports.findById(req.params.id).populate('user_id').populate('validations');
    if (!report) return res.status(404).json({ message: 'User Report not found' });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserReport = async (req, res) => {
  try {
    const updatedReport = await UserReports.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedReport) return res.status(404).json({ message: 'User Report not found' });
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUserReport = async (req, res) => {
  try {
    const deletedReport = await UserReports.findByIdAndDelete(req.params.id);
    if (!deletedReport) return res.status(404).json({ message: 'User Report not found' });
    res.status(200).json({ message: 'User Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
