const { POINT_CONVERSION_COMPRESSED } = require('constants')
const fs = require('fs')

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split(`\n`).filter(x => x)

const binToDec = (input, one) => parseInt(input.split('').map(c => c === one ? 0 : 1).join(''), 2)

const stringToSeatId = pass => {
    const row = binToDec(pass.slice(0, 7), 'F')
    const col = binToDec(pass.slice(7), 'L')
    return row * 8 + col
}

const seatPositions = input.map(stringToSeatId)

const partOne = Math.max(...seatPositions)

seatPositions.sort((a, b) => a - b)

const findGap = (arr) => {
    for (let position = 0; position < arr.length - 1; position++) {
        const first = arr[position]
        const second = arr[position + 1]

        if (second - first === 2) return first + 1
    }
}

const partTwo = findGap(seatPositions)

console.log({ partOne, partTwo })
