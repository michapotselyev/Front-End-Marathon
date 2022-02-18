function sortEvenOdd(arr) { arr.sort(function compareNumbers(a, b) { return a % 2 - b % 2 || a  - b; }); }

