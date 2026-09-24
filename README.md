# Monotonic Stack

A dependency-free TypeScript/JavaScript library providing a monotonic stack and two linear-time helpers: next-greater-element and sliding-window-maximum.

## Usage

```javascript
import { MonotonicStack, nextGreaterElement, slidingWindowMaximum } from './src/index.js';

const stack = new MonotonicStack('decreasing');
stack.push(5);
stack.push(3);
stack.push(4); // pops 3
console.log(stack.peek()); // 4

console.log(nextGreaterElement([2, 1, 5])); // [5, 5, -1]
console.log(slidingWindowMaximum([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3, 3, 5, 5, 6, 7]
```

## Why this library exists

Finding the next greater element or the maximum in every sliding window is a common pattern in algorithmic problems. A naive scan is O(n²), but a monotonic stack or deque reduces it to O(n) by discarding elements that can never be the answer again. The trade-off is that the stack itself only retains the current monotonic subsequence, so it answers "next" queries in one pass rather than supporting arbitrary lookups.

## Edge cases

- `nextGreaterElement` uses strict inequality, so equal values do not count as greater. For `[1, 3, 3, 2]` the result is `[3, -1, -1, -1]`.
- `slidingWindowMaximum` requires `k` to be a positive integer no larger than the input length; otherwise it throws a `RangeError`.
- All functions reject arrays containing `NaN` or non-number values with a `TypeError`.
