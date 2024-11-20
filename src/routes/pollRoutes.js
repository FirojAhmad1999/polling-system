import express from 'express';
import {
  createPoll,
  getPollResults,
  castVote,
  getLeaderboard,
} from '../controllers/pollController.js';

const router = express.Router();

router.post('/polls', createPoll); // Create a new poll
router.get('/polls/:id', getPollResults); // Get results for a poll
router.post('/polls/vote', castVote); // Cast a vote
router.get('/leaderboard', getLeaderboard); // Get leaderboard

export default router;
