
import { createGame, postScore, getScores } from '../Helpers/leaderboardAPI';


describe('create new game', () => {
  test('should return string id of game', () => createGame().then((data) => {
    expect(data).toBeTruthy();
  }));
});

describe('post valid score to api', () => {
  test('should return object from api', () => postScore('anonymous', 9).then((data) => {
    expect(data).toEqual({ "result": "Leaderboard score created correctly." });
  }));
});

describe('get scores from api', () => {
  test('should return object from api', () => getScores().then((data) => {
    expect(typeof data).toBe('object');
  }));
});