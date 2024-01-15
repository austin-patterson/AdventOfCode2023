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
  input: fs.createReadStream('03_example.txt'),
  // input: fs.createReadStream('03_input.txt'),
});


//////////////////////
// Part 1 solution
//////////////////////

const grid = [];
const numbers = new Map();
const symbols = [];
const directions = [{dx:1,dy:0}, {dx:1,dy:1}, {dx:0,dy:1}, {dx:-1,dy:1}, {dx:-1,dy:0}, {dx:-1,dy:-1}, {dx:0,dy:-1}, {dx:1,dy:-1}];

function runPart1() {
  rl.on('line', (line) => {
    if (line.trim() === '') {
      rl.close();
    } else {
      line += '.';
      parsePart1(line);
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log(sumPartNumbers());
  });

  rl.prompt();

}

function parsePart1(line) {
  grid.push(line.split(''));

  const row = grid.length - 1;
  let word = '';
  line.split('').forEach((char, col) => {
    if (char.match(/\d/)) {
      word += char;
      return;
    }

    if (word !== '') {
      const num = Number(word) || 0;
      for (let i = 1; col - i >= 0; i++) {
        numbers.set(`${row},${col - i}`, {num, start:col-word.length, end:col-1});
      }
      word = '';
    }

    if (char !== '.') {
      symbols.push({ row, col });
    }
  });
}

//TODO - use symbols and numbers to return sum of part numbers
function sumPartNumbers() {
  let sum = 0;  
  
  symbols.forEach(pos => {
    let {row, col} = pos;
    directions.forEach(dir => {
      let dx = row+dir.dx;
      let dy = col+dir.dy;
      if (numbers.has(getPosStr(dx,dy))) {
        sum += countPart(dx,dy)
      }
    });
  });

  return sum;
}

function getPosStr(row,col) {
  return `${row},${col}`
}

function countPart(row,col) {
  let val = numbers.get(getPosStr(row,col));
  for (let i = val.start; i <= val.end; i++) {
    numbers.delete(getPosStr(row, i));
  }
  console.log(val.num)
  return val.num;
}

//////////////////////
// Part 2 solution
//////////////////////


function runPart2() {
  rl.on('line', (line) => {
    if (line.trim() === '') {
      rl.close();
    } else {
      parsePart2(line);
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log(globalSum);
  });

  rl.prompt();

}

function parsePart2(line) {

}

//////////////////////
// RUN
//////////////////////



runPart1();

// runPart2();
