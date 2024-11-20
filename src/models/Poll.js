import pool from '../config/db.js';

export class Poll {
  static async create(question, options) {
    try {
      const pollResult = await pool.query(
        'INSERT INTO polls (question) VALUES ($1) RETURNING id',
        [question]
      );
      const pollId = pollResult.rows[0].id;

      const optionPromises = options.map((option) =>
        pool.query(
          'INSERT INTO poll_options (poll_id, option_text) VALUES ($1, $2)',
          [pollId, option]
        )
      );

      await Promise.all(optionPromises);
      return { pollId };
    } catch (error) {
      throw new Error('Failed to create poll: ' + error.message);
    }
  }

  static async getPollResults(id) {
    try {
      const poll = await pool.query(
        'SELECT id, question FROM polls WHERE id = $1',
        [id]
      );

      if (poll.rows.length === 0) {
        throw new Error('Poll not found');
      }

      const options = await pool.query(
        'SELECT id, option_text, votes FROM poll_options WHERE poll_id = $1',
        [id]
      );

      return { poll: poll.rows[0], options: options.rows };
    } catch (error) {
      throw new Error('Failed to retrieve poll results: ' + error.message);
    }
  }

  static async getLeaderboard() {
    try {
      const result = await pool.query(
        'SELECT option_text, SUM(votes) AS total_votes FROM poll_options GROUP BY option_text ORDER BY total_votes DESC LIMIT 10'
      );
      return result.rows;
    } catch (error) {
      throw new Error('Failed to fetch leaderboard: ' + error.message);
    }
  }
}
