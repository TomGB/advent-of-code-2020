const partOne = input => {
    const blocks = input.split('mask = ').map(block => {
        const [mask, ...memsText] = block.split('\n').filter(x => x)

        const mems = memsText.map(mem => mem.match(/mem\[(?<i>\d+)\] = (?<v>\d+)/).groups)
        return { mask, mems }
    }).filter(({ mask }) => mask)

    const memory = {}

    blocks.forEach(({ mask, mems }) => {
        const orMask = BigInt('0b' + mask.replace(/X|0/g, '0'))
        const andMask = BigInt('0b' + mask.replace(/X|1/g, '1'))

        mems.forEach(({ i, v }) => {
            const bin = BigInt('0b' + (v >>> 0).toString(2))
            const maskedValue = bin | orMask & andMask
            memory[i] = maskedValue
        })
    })

    return Object.values(memory).reduce((a, x) => a + x)
}

module.exports = partOne
