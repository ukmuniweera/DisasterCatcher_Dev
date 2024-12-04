import AdminLog from '../models/adminLogs.js';

export const createAdminLog = async (req, res) => {
  try {
    const { admin_id, action, description } = req.body;
    const newLog = await AdminLog.create({ admin_id, action, description });
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find().populate('admin_id', 'name email');
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdminLogById = async (req, res) => {
  try {
    const log = await AdminLog.findById(req.params.id).populate('admin_id');
    if (!log) return res.status(404).json({ message: 'Admin Log not found' });
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdminLog = async (req, res) => {
  try {
    const updatedLog = await AdminLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLog) return res.status(404).json({ message: 'Admin Log not found' });
    res.status(200).json(updatedLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAdminLog = async (req, res) => {
  try {
    const deletedLog = await AdminLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ message: 'Admin Log not found' });
    res.status(200).json({ message: 'Admin Log deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
