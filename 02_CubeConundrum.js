/******************
 * Day 2: Cube Conundrum
 * https://adventofcode.com/2023/day/2
 * Example answer: 8 
 * Final answer: 2449
 * Sum of gameIDs that are __possible__ with *only 12 red cubes, 13 green cubes, and 14 blue cubes*
 * 
 * Part 2: 
 * https://adventofcode.com/2023/day/2#part2
 * Example answer: 2286
 * Final answer: ?
 * Find the sum of powers of each game set where each power is the product of the minimum number of cubes required to play the game.
 */

// Setup

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('02_example.txt'),
  // input: fs.createReadStream('02_input.txt'),
});

let lineCount = 0;
let globalSum = 0;

//////////////////////
// Part 1 solution
//////////////////////


const redCubeLimit = 12;
const greenCubeLimit = 13;
const blueCubeLimit = 14;

/**
 * Parses a line of input in the form of "Game {id}: {pull1}; {pull2}; ..." and adds possible game IDs to the global sum.
 * Each pull is in the form of "red {redCount}, green {greenCount}, blue {blueCount}" 
 * where each color is optional but at least one color is present.
 *
 * @param {string} line - The line of input to parse.
 * @returns {void}
 */
function parsePossible(line) {
  let halves = line.split(':');

  const gameId = Number(halves[0].trim().split(' ')[1]);
  if (!gameId) {
    console.error(`Invalid game ID in line ${lineCount}: ${line}`);
  }

  const possible = !(halves[1].split(';')
    .map(g =>
      g.trim())
    .map(p => parsePull(p))
    .some(p => p == false));

  if (possible) {
    // console.log(`Game ${gameId} IS possible.`);
    globalSum += gameId;
  } else {
    // console.log(`Game ${gameId} is NOT possible.`);
  }
}

/**
 * Parses a game pull in the form of "red {redCount}, green {greenCount}, blue {blueCount}" 
 * where each color is optional but at least one color is present.
*
* @param {string} pull - The game pull to parse.
* @returns {boolean} - `true` if the game is possible with the globally set number of cubes, `false` otherwise.
*/
function parsePull(pull) {
  let possible = true;

  pull.split(',').map(g => g.trim()).forEach(c => {
    let h = c.split(' ');
    let num = Number(h[0]);
    switch (h[1]) {
      case 'red':
        if (num > redCubeLimit) possible = false;
        break;
      case 'green':
        if (num > greenCubeLimit) possible = false;
        break;
      case 'blue':
        if (num > blueCubeLimit) possible = false;
        break;
      default:
        console.error(`Invalid color in line ${lineCount}: ${c}`);
    }

    if (!possible) return false;
  });

  return possible;
}


//////////////////////
// Part 2 solution
//////////////////////

function parsePower(line) {
  let min = {
    red: 0,
    green: 0,
    blue: 0
  };

  line.split(':')[1].split(';').split(',').map(p => p.trim()).forEach(pair => {
    const color = pair[1].trim();
    const num = Number(pair[0].trim());
    if (num > min[color]) {
      min[color] = num;
    }
  });

  globalSum += min.red * min.green * min.blue; //power
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
      parsePossible(line);
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
      parsePower(line);
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
