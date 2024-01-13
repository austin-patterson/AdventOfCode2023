/******************
 * Day 1: Trebuchet?!
 * https://adventofcode.com/2023/day/1
 * Final answer: 55002
 * 
 * Part 2: digits can be spelled out
 * https://adventofcode.com/2023/day/1#part2
 * Final answer: ?
 */

///////////////////
// Boilerplate ////
///////////////////

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  // input: fs.createReadStream('01_input.txt'),
  input: fs.createReadStream('01_example2.txt'),
});

///////////////////
// Part 1 solution
///////////////////

let globalSum = 0;

function parseDigits(line) {
  let a = NaN, b = NaN;
  let cursor = 0;

  while (cursor < line.length && isNaN(a)) {
    a = Number(line.charAt(cursor));
    cursor++;
  }

  cursor = line.length - 1;
  while (cursor >= 0 && isNaN(b)) {
    b = Number(line.charAt(cursor));
    cursor--;
  }

  if (!isNaN(a) && !isNaN(b)) {
    globalSum += (a * 10 + b);
  }
}

function printSum(a, b) {
  console.log(a + b);
}


///////////////////
// Part 2 solution
///////////////////
globalSum = 0;

const windowMax = 5;
const dictionary = Object.create(null);
Object.assign(dictionary, {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
});

//for each partial word in word, see if it's in the dictionary and return the value if it is, else return 0
function checkWords(word) {
  for (let start = 0; start < word.length; start++) {
    for (let end = start + 1; end <= word.length; end++) {
      const partial = word.slice(start, end);
      if (dictionary[partial]) {
        return dictionary[partial];
      }
    }
  }
  return NaN;
}

/**
 * 
 * @param {string} line 
 */
function parseNumbers(line) {
  let l = 0, r = 1;
  let first = 0, second = 0;
  let c = NaN;

  const shiftRight = () => {
    r++;
    if (r - l > windowMax) {
      l++;
    }
  };

  const shiftLeft = () => {
    l--;
    if (r - l > windowMax) {
      r--;
    }
  };

  while (l < line.length && r <= line.length && first === 0) {
    c = Number(line.charAt(r - 1));
    if (!isNaN(c)) {
      first = c;
      break;
    }

    const wordValue = checkWords(line.slice(l, r));
    if (!isNaN(wordValue)) {
      first = wordValue;
      break;
    }

    shiftRight()
  }

  r = line.length;
  l = r - 1;
  while (l >= 0 && r > 0 && second === 0) {
    c = Number(line.charAt(l));
    if (!isNaN(c)) {
      second = c;
      break;
    }

    const wordValue = checkWords(line.slice(l, r));
    if (!isNaN(wordValue)) {
      second = wordValue;
      break;
    }

    shiftLeft();
  }

  globalSum += Number(first.toFixed(0) + second.toFixed(0)) || 0;
}


///////////////////
// RUN
///////////////////

function runPart1() {
  rl.on('line', (line) => {
    if (line.trim() === '') {
      rl.close();
    } else {
      parseDigits(line);
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log(globalSum);
  });

  rl.prompt();
}

globalSum = 0;
function runPart2() {
  rl.on('line', (line) => {
    if (line.trim() === '') {
      rl.close();
    } else {
      parseNumbers(line);
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log(globalSum);
  });

  rl.prompt();
}

// runPart1();
runPart2();
