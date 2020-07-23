const localStorageTest = require('../Helpers/localStorage');

localStorageTest.initSaveLocal();

describe('test getLocalName from init', () => {
  const name = localStorageTest.getLocalName();

  test('should return name anonymous', () => {
    expect(name).toBe('anonymous');
  });
});

describe('test getLocalScore from init', () => {
  const score = localStorageTest.getLocalScore();

  test('should return score 0', () => {
    expect(score).toBe(0);
  });
});

describe('test getLocalName form user imput', () => {
  localStorageTest.saveLocalName('anne donne');
  const name = localStorageTest.getLocalName();

  test('should return name', () => {
    expect(name).toBe('anne donne');
  });
});

describe('test getLocalScore form user imput', () => {
  localStorageTest.saveLocalScore(99);
  const score = localStorageTest.getLocalScore();

  test('should return score 99', () => {
    expect(score).toBe(99);
  });
});
