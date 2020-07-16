import { initSaveLocal, getLocalName, getLocalScore } from '../Helpers/localStorage';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

initSaveLocal();

describe('test getLocalName', () => {
  const name = getLocalName();

  test('should return name', () => {
    expect(localStorage.getItem).toBeCalledWith('name')
  });
});


describe('test getLocalScore', () => {
  const score = getLocalScore();

  test('should return score', () => {
    expect(localStorage.getItem).toBeCalledWith('score')
  });
});
