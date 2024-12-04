import Feedback from '../models/feedback.js';

export const createFeedback = async (req, res) => {
  try {
    const { user_id, feedback_type, message, status } = req.body;
    const newFeedback = await Feedback.create({ user_id, feedback_type, message, status });
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user_id', 'name email');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('user_id');
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedFeedback) return res.status(404).json({ message: 'Feedback not found' });
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) return res.status(404).json({ message: 'Feedback not found' });
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
