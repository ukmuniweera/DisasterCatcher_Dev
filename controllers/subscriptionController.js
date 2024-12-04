import Subscription from '../models/subscription.js';

export const createSubscription = async (req, res) => {
  try {
    const { user_id, disaster_types, regions, notification_frequency } = req.body;
    const newSubscription = await Subscription.create({ user_id, disaster_types, regions, notification_frequency });
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('user_id', 'name email');
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('user_id');
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSubscription = async (req, res) => {
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSubscription) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json(updatedSubscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSubscription = async (req, res) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!deletedSubscription) return res.status(404).json({ message: 'Subscription not found' });
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
