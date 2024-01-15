/******************
 * Day 3: Gear Ratios
 * https://adventofcode.com/2023/day/3
 * Example answer: 4361
 * Final answer: ?
 * Sum of part numbers where a part number is any number in the grid (can be more than one digit) by a symbol in eight directions (up, down, left, right, and four diagonals).
 * 
 * Part 2: 
 * https://adventofcode.com/2023/day/3#part3
 * Example answer: ?
 * Final answer: ?
 * 
 */

// Setup

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  // input: fs.createReadStream('02_example.txt'),
  input: fs.createReadStream('02_input.txt'),
});

let lineCount = 0;
let globalSum = 0;

//////////////////////
// Part 1 solution
//////////////////////

function part1(line) {

}

//////////////////////
// Part 2 solution
//////////////////////

function part2(line) {

}

//////////////////////
// RUN
//////////////////////

function runPart1() {

  rl.on('line', (line) => {
    lineCount++;
    if (line.trim() === '') {
      rl.close();
    } else {
      runPart1(line);
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
    lineCount++;
    if (line.trim() === '') {
      rl.close();
    } else {
      part2(line);
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log(globalSum);
  });

  rl.prompt();

}

runPart1();

// runPart2();
