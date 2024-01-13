/******************
 * Day 1: Trebuchet?!
 * https://adventofcode.com/2023/day/1
 * Final answer: 55002
 * 
 * Part 2: digits can be spelled out
 * https://adventofcode.com/2023/day/1#part2
 * Final answer: ?
 */

// Part 1 solution

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  // input: fs.createReadStream('01_input.txt'),
  input: fs.createReadStream('01_example.txt'),
});

let globalSum = 0;

function parse(line) {
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

// RUN

rl.on('line', (line) => {
  if (line.trim() === '') {
    rl.close();
  } else {
    parse(line);
    rl.prompt();
  }
});

rl.on('close', () => {
  console.log(globalSum);
});

rl.prompt();
