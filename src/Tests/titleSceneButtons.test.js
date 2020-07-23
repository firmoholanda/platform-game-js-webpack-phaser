/* eslint-disable no-unused-vars */

test('check the number of buttons we have in the title scene', () => {
  const buttonMock = jest.fn();
  const play = buttonMock();
  const options = buttonMock();
  const credits = buttonMock();
  const board = buttonMock();
  expect(buttonMock).toHaveBeenCalledTimes(4);
});
