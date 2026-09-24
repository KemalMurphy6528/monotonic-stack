import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  MonotonicStack,
  nextGreaterElement,
  slidingWindowMaximum,
} from '../src/index.js';

test('MonotonicStack decreasing push pops smaller values', () => {
  const stack = new MonotonicStack('decreasing');
  assert.deepEqual(stack.push(5), []);
  assert.deepEqual(stack.push(3), []);
  assert.deepEqual(stack.push(4), [3]);
  assert.equal(stack.peek(), 4);
  assert.equal(stack.size, 2);
});

test('MonotonicStack increasing push pops larger values', () => {
  const stack = new MonotonicStack('increasing');
  assert.deepEqual(stack.push(1), []);
  assert.deepEqual(stack.push(5), []);
  assert.deepEqual(stack.push(3), [5]);
  assert.equal(stack.peek(), 3);
  assert.equal(stack.size, 2);
});

test('MonotonicStack rejects invalid order', () => {
  assert.throws(() => new MonotonicStack('flat'), RangeError);
});

test('MonotonicStack rejects NaN', () => {
  const stack = new MonotonicStack();
  assert.throws(() => stack.push(Number.NaN), TypeError);
});

test('nextGreaterElement basic case', () => {
  assert.deepEqual(nextGreaterElement([2, 1, 5]), [5, 5, -1]);
});

test('nextGreaterElement with duplicates', () => {
  assert.deepEqual(nextGreaterElement([1, 3, 3, 2]), [3, -1, -1, -1]);
});

test('nextGreaterElement empty input', () => {
  assert.deepEqual(nextGreaterElement([]), []);
});

test('nextGreaterElement throws on non-array', () => {
  assert.throws(() => nextGreaterElement('nope'), TypeError);
});

test('nextGreaterElement throws on non-number element', () => {
  assert.throws(() => nextGreaterElement([1, 'a']), TypeError);
});

test('slidingWindowMaximum basic case', () => {
  assert.deepEqual(slidingWindowMaximum([1, 3, -1, -3, 5, 3, 6, 7], 3), [
    3, 3, 5, 5, 6, 7,
  ]);
});

test('slidingWindowMaximum k equals length', () => {
  assert.deepEqual(slidingWindowMaximum([4, 2, 12], 3), [12]);
});

test('slidingWindowMaximum k equals one', () => {
  assert.deepEqual(slidingWindowMaximum([4, 2, 12], 1), [4, 2, 12]);
});

test('slidingWindowMaximum with duplicate maxima', () => {
  assert.deepEqual(slidingWindowMaximum([5, 5, 5, 5], 2), [5, 5, 5]);
});

test('slidingWindowMaximum rejects invalid k', () => {
  assert.throws(() => slidingWindowMaximum([1, 2, 3], 0), RangeError);
  assert.throws(() => slidingWindowMaximum([1, 2, 3], 4), RangeError);
  assert.throws(() => slidingWindowMaximum([1, 2, 3], 1.5), RangeError);
});
