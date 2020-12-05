const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split(`\n`).filter(x => x)

const binToDec = (input, zero, one) => parseInt(input.replace(zero, 0).replace(one, 1), 2)

const seatPositions = input.map(pass => {
    const row = binToDec(pass.slice(0, 7), /F/g, /B/g)
    const col = binToDec(pass.slice(7), /L/g, /R/g)
    return row * 8 + col
})

const partOne = Math.max(...seatPositions)

seatPositions.sort((a, b) => a - b)

const partTwo = seatPositions.find((pos, i, arr) => pos - arr[i + 1] === -2) + 1

console.log({ partOne, partTwo })
