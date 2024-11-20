import pool from '../config/db.js';

export class Vote {
  static async castVote(pollId, optionId) {
    try {
      const existingVote = await pool.query(
        'SELECT * FROM votes WHERE poll_id = $1 AND option_id = $2',
        [pollId, optionId]
      );

      if (existingVote.rows.length > 0) {
        throw new Error('Vote already casted for this option');
      }

      await pool.query(
        'INSERT INTO votes (poll_id, option_id) VALUES ($1, $2)',
        [pollId, optionId]
      );

      await pool.query(
        'UPDATE poll_options SET votes = votes + 1 WHERE id = $1',
        [optionId]
      );

      return { message: 'Vote cast successfully' };
    } catch (error) {
      throw new Error('Failed to cast vote: ' + error.message);
    }
  }
}
