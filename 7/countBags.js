module.exports = input => {
    const rules = input.map(rule => {
        const [outerBag, contains] = rule.split(' bags contain ')
        const bags = contains.split(', ')
        const innerBags = bags.map(bag => ({ .../(?<count>\d*) (?<bag>.*) bag/.exec(bag).groups })).filter(({ bag }) => bag !== 'other')
        return { outerBag, innerBags }
    })

    const partOne = () => {
        const possibleBags = new Set(['shiny gold'])

        let previousSetSize = 1

        do {
            previousSetSize = possibleBags.size;
            [...possibleBags].forEach(bagToFind => {
                const containingBags = rules.filter(rule =>
                    rule.innerBags.find(({ bag }) => bag === bagToFind)
                )

                containingBags.forEach(({ outerBag }) => possibleBags.add(outerBag))
            })
        } while (possibleBags.size !== previousSetSize)

        return possibleBags.size - 1
    }

    const countBags = (bagName) => {
        const { innerBags } = rules.find(({ outerBag }) => outerBag === bagName)

        return innerBags.reduce(
            (a, { bag, count }) => a + (countBags(bag) * parseInt(count))
            , 1)
    }

    return { partOne: partOne(), partTwo: countBags('shiny gold') - 1 }
}
