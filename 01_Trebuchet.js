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
  input: fs.createReadStream('01_example.txt'),
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

/**
 * 
 * @param {string} line 
 */
function parseNumbers(line) {
  let l = 0, r = 0;
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

  while (l < line.length && r < line.length && first === 0) {
    c = Number(line.charAt(r));
    if (!isNaN(c)) {
      first = c;
      break;
    }

    const word = line.slice(l,r);
    if (dictionary[word]) {
      first = dictionary[word];
      break;
    }

    shiftRight()
  }

  while (l > 0 && r > 0 && second === 0) {
    c = Number(line.charAt(l));
    if (!isNaN(c)) {
      second = c;
      break;
    }

    const word = line.slice(l,r);
    if (dictionary[word]) {
      second = dictionary[word];
      break;
    }

    shiftLeft();
  }
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

function runPart2() {
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
