/**
 * A monotonic stack keeps its elements in non-increasing or non-decreasing
 * order by popping elements that would violate the invariant before pushing.
 * This is the classic linear-time tool for next-greater-element and
 * sliding-window-maximum problems.
 *
 * This class intentionally stores values, not array indices, so callers can
 * use it directly with arbitrary sequences. The helper functions below show
 * how to adapt it for index-based queries.
 */
export class MonotonicStack {
  /**
   * @param {'increasing'|'decreasing'} order
   *   - 'increasing': stack values are strictly increasing from bottom to top.
   *   - 'decreasing': stack values are strictly decreasing from bottom to top.
   */
  constructor(order = 'decreasing') {
    if (order !== 'increasing' && order !== 'decreasing') {
      throw new RangeError("order must be 'increasing' or 'decreasing'");
    }
    this.order = order;
    /** @type {number[]} */
    this.items = [];
  }

  /**
   * Push a value, popping values that break the monotonic invariant.
   * @param {number} value
   * @returns {number[]} values popped during this push
   */
  push(value) {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError('MonotonicStack only accepts finite numbers');
    }
    const popped = [];
    if (this.order === 'decreasing') {
      while (this.items.length > 0 && this.items[this.items.length - 1] < value) {
        popped.push(this.items.pop());
      }
    } else {
      while (this.items.length > 0 && this.items[this.items.length - 1] > value) {
        popped.push(this.items.pop());
      }
    }
    this.items.push(value);
    return popped;
  }

  /** @returns {number|undefined} top value without removing it */
  peek() {
    return this.items[this.items.length - 1];
  }

  /** @returns {number|undefined} remove and return top value */
  pop() {
    return this.items.pop();
  }

  /** @returns {number} number of items currently in the stack */
  get size() {
    return this.items.length;
  }
}

/**
 * For each element of `values`, find the next element to its right that is
 * strictly greater. Returns an array of the same length, using -1 when no
 * such element exists. This uses a decreasing monotonic stack of indices and
 * runs in O(n) time.
 *
 * @param {number[]} values
 * @returns {number[]}
 */
export function nextGreaterElement(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array');
  }
  const result = new Array(values.length).fill(-1);
  const stack = [];
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError('values must contain only finite numbers');
    }
    while (stack.length > 0 && values[stack[stack.length - 1]] < value) {
      const idx = stack.pop();
      result[idx] = value;
    }
    stack.push(i);
  }
  return result;
}

/**
 * Compute the maximum value in every contiguous window of size `k`.
 * Uses a deque of indices whose values are non-increasing, so the front is
 * always the maximum of the current window. O(n) time, O(k) space.
 *
 * @param {number[]} values
 * @param {number} k window size, must be a positive integer <= values.length
 * @returns {number[]}
 */
export function slidingWindowMaximum(values, k) {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array');
  }
  if (!Number.isInteger(k) || k <= 0 || k > values.length) {
    throw new RangeError('k must be a positive integer no greater than values.length');
  }
  const result = [];
  const deque = [];
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError('values must contain only finite numbers');
    }
    // Remove indices that have fallen out of the current window.
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }
    // Maintain non-increasing values in the deque.
    while (deque.length > 0 && values[deque[deque.length - 1]] <= value) {
      deque.pop();
    }
    deque.push(i);
    if (i >= k - 1) {
      result.push(values[deque[0]]);
    }
  }
  return result;
}
