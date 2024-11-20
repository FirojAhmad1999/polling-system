import { Poll } from '../models/Poll.js';
import { Vote } from '../models/Vote.js';
import produceMessage from '../services/kafkaProducer.js';

export const createPoll = async (req, res) => {
  const { question, options } = req.body;
  if (!question || !options || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: 'Invalid poll data' });
  }

  try {
    const { pollId } = await Poll.create(question, options);
    res.status(201).json({ message: 'Poll created successfully', pollId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPollResults = async (req, res) => {
  const { id } = req.params;
  try {
    const pollData = await Poll.getPollResults(id);
    res.status(200).json(pollData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const castVote = async (req, res) => {
  const { pollId, optionId } = req.body;

  if (!pollId || !optionId) {
    return res.status(400).json({ error: 'Invalid vote data' });
  }

  try {
    await produceMessage('polls-votes', JSON.stringify({ pollId, optionId }));
    res.status(200).json({ message: 'Vote sent to Kafka for processing' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Poll.getLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
