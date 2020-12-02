const fs = require('fs')

const input = fs.readFileSync('2/input.txt', 'utf8').split('\n').filter(x => x)

const validCount = input.filter(line => {
    const [policy, password] = line.split(':').map(x => x.trim())
    const [count, letter] = policy.split(' ')
    const [i1, i2] = count.split('-').map(x => parseInt(x))

    const passwordArr = password.split('')

    return (passwordArr[i1 - 1] === letter) !== (passwordArr[i2 - 1] === letter)
}).length

console.log(validCount)
