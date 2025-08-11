const test = require('node:test');
const assert = require('node:assert');
const { add, subtract, multiply, divide } = require('./calculator');

test('add adds two numbers', () => {
  assert.strictEqual(add(1, 2), 3);
});

test('subtract subtracts second number from first', () => {
  assert.strictEqual(subtract(5, 3), 2);
});

test('multiply multiplies two numbers', () => {
  assert.strictEqual(multiply(4, 3), 12);
});

test('divide divides first number by second', () => {
  assert.strictEqual(divide(10, 2), 5);
});

test('divide throws when dividing by zero', () => {
  assert.throws(() => divide(10, 0), /Cannot divide by zero/);
});
