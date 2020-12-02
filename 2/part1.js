const fs = require('fs')

const input = fs.readFileSync('2/input.txt', 'utf8').split('\n').filter(x => x)

const validCount = input.filter(line => {
    const [policy, password] = line.split(': ')
    const [count, letter] = policy.split(' ')
    const [min, max] = count.split('-').map(x => parseInt(x))

    const numLetters = password.split('').filter(x => x === letter).length

    return numLetters <= max && numLetters >= min
}).length

console.log(validCount)
