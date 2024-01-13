/******************
 * Day 2: Cube Conundrum
 * https://adventofcode.com/2023/day/2
 * Final answer: ?
 * Sum of gameIDs that are __possible__ with *only 12 red cubes, 13 green cubes, and 14 blue cubes*
 * 
 * Part 2: 
 * https://adventofcode.com/2023/day/2#part2
 * Final answer: ?
 */

// Part 1 solution

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('02_example.txt'),
});

const redCubeLimit = 12;
const greenCubeLimit = 13;
const blueCubeLimit = 14;

let lineCount = 0;
let globalSum = 0;

/**
 * Parses a line of input in the form of "Game {id}: {pull1}; {pull2}; ..." and adds possible game IDs to the global sum.
 * Each pull is in the form of "red {redCount}, green {greenCount}, blue {blueCount}" 
 * where each color is optional but at least one color is present.
 *
 * @param {string} line - The line of input to parse.
 * @returns {void}
 */
function parse(line) {
  let halves = line.split(':');
  
  const gameId = Number(halves[0].trim().split(' ')[1]);
  if (!gameId) {
    console.error(`Invalid game ID in line ${lineCount}: ${line}`);
  }

  halves[1].split(';').map(g => g.trim()).forEach(p => { if (parsePull(p)) { globalSum += gameId; } });
}

/**
 * Parses a game pull in the form of "red {redCount}, green {greenCount}, blue {blueCount}" 
 * where each color is optional but at least one color is present.
*
* @param {string} pull - The game pull to parse.
* @returns {boolean} - `true` if the game is possible with the globally set number of cubes, `false` otherwise.
*/
function parsePull(pull) {
  let gRed = 0, gGreen = 0, gBlue = 0;
  pull.split(',').map(g => g.trim()).forEach(c => {
    let h = c.split(' ');
    let num = Number(h[0]);
    switch (h[1]) {
      case 'red':
        gRed += num;
        break;
      case 'green':
        gGreen += num;
        break;
      case 'blue':
        gBlue += num;
        break;
      default:
        console.error(`Invalid color in line ${lineCount}: ${c}`);
    }
  });
  return (gRed <= redCubeLimit && gGreen <= greenCubeLimit && gBlue <= blueCubeLimit);
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
