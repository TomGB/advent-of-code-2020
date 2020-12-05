const { POINT_CONVERSION_COMPRESSED } = require('constants')
const fs = require('fs')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split(`\n`).filter(x => x)

const seatPositions = input.map(pass => {
    const row = parseInt(pass.slice(0, 7).split('').map(c => c === 'F' ? 0 : 1).join(''), 2)
    const col = parseInt(pass.slice(7).split('').map(c => c === 'L' ? 0 : 1).join(''), 2)
    return row * 8 + col
})

const partOne = Math.max(...seatPositions)

const partTwo = 'tbd'

console.log({ partOne, partTwo })
