import { createGame, postScore, getScores } from '../Helpers/leaderboardAPI';

describe('initalizing new game on API', () => {
  test('should return an object with the string ID of the game', () => {
    createGame().then(data => {
      expect(typeof data).toBe('object');
    });
  });

  test('should return a string with the ID of the game', () => {
    createGame().then(data => {
      expect(typeof data.result).toBe('string');
    });
  });
});

describe('create new game', () => {
  test('should return string id of game', () => createGame().then((data) => {
    expect(data).toBeTruthy();
  }));
});

describe('post valid score to api', () => {
  test('should return object from api', () => postScore('anonymous', 9).then((data) => {
    expect(data).toEqual({ result: 'Leaderboard score created correctly.' });
  }));
});

describe('get scores from api', () => {
  test('should return object from api', () => getScores().then((data) => {
    expect(typeof data).toBe('object');
  }));
});
