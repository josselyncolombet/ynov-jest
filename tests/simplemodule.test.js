// simpleModule.test.js
const simpleModule = require('../simplemodule');
simpleModule.getMessage = jest.fn(() => 'Hello from mock module');

test('uses mock module', () => {
  expect(simpleModule.getMessage()).toBe('Hello from mock module');
});