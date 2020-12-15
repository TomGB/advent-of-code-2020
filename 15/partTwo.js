const cliProgress = require('cli-progress')

const partTwo = input => {
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
    bar1.start(30000000, 0)

    let series = input.split(',').map(x => parseInt(x))
    let turn = series.length - 1

    const lastSeen = new Map()

    let next = series.pop()

    series.forEach((v, i) => lastSeen.set(v, i))

    do {
        const index = lastSeen.get(next)
        // console.log({ next, index, lastSeen, series })

        lastSeen.set(next, turn)

        if (index === undefined) next = 0
        else next = turn - index

        turn++

        if (turn % 1000 === 0) bar1.update(turn)
    } while (turn < 30000000 - 1)

    bar1.stop()

    return next
}

module.exports = partTwo
