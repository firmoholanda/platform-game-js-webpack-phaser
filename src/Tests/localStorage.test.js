// import { initSaveLocal, getLocalName, getLocalScore } from '../Helpers/localStorage';

const localStorageTest = require('../Helpers/localStorage');

localStorageTest.initSaveLocal();

describe('test getLocalName', () => {
  const name = localStorageTest.getLocalName();

  test('should return name anonymous', () => {
    expect(name).toBe('anonymous');
  });
});

describe('test getLocalScore', () => {
  const score = localStorageTest.getLocalScore();

  test('should return score 0', () => {
    expect(score).toBe(0);
  });
});
