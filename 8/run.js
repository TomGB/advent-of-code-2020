const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').filter(x => x)

const program = input.map(line => {
    const [op, val] = line.split(' ')
    return { op, val: parseInt(val) }
})

let head = 0
let acc = 0

const visitedLines = []

const logic = {
    nop: () => head++,
    acc: val => { acc += val; head++ },
    jmp: val => head += val
}

do {
    visitedLines.push(head)
    const { op, val } = program[head]

    logic[op](val)
} while (!visitedLines.includes(head))

console.log({
    partOne: acc
})
