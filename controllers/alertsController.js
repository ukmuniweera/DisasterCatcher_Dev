import Alert from '../models/alerts.js';

export const createAlert = async (req, res) => {
  try {
    const { alert_type, disaster, distance, time, priority } = req.body;
    const newAlert = await Alert.create({ alert_type, disaster, distance, time, priority });
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAlert = async (req, res) => {
  try {
    const updatedAlert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedAlert) return res.status(404).json({ message: 'Alert not found' });
    res.status(200).json(updatedAlert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAlert = async (req, res) => {
  try {
    const deletedAlert = await Alert.findByIdAndDelete(req.params.id);
    if (!deletedAlert) return res.status(404).json({ message: 'Alert not found' });
    res.status(200).json({ message: 'Alert deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
