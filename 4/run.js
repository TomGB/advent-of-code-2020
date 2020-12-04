const fs = require('fs')

const passportsText = fs.readFileSync('4/input.txt', 'utf8').split(`\n\n`)

const passportFields = passportsText.map(passport => passport.split(/[\n\s]+/))

const passportEntries = passportFields.map(passport => passport.map(entry => entry.split(':')))

const requiredFields = [
    { key: 'byr', count: 4, min: 1920, max: 2002 },
    { key: 'iyr', count: 4, min: 2010, max: 2020 },
    { key: 'eyr', count: 4, min: 2020, max: 2030 },
    { key: 'hgt', cmMin: 150, cmMax: 193, inMin: 59, inMax: 76 },
    { key: 'hcl', hex: true },
    { key: 'ecl', options: 'amb blu brn gry grn hzl oth'.split(' ') },
    { key: 'pid', count: 9, digitsOnly: true },
    // 'cid',
]

const checkRequirement = ({ key, count, min, max, cmMin, cmMax, inMin, inMax, hex, options, digitsOnly }, [entryKey, value]) => {
    if (entryKey !== key) return false
    if (count && value.length !== count) return false
    if (min && value < min) return false
    if (max && value > max) return false
    if (key === 'hgt') {
        const isCm = value.includes('cm')
        const isIn = value.includes('in')

        if (!isCm && !isIn) return false

        if (isCm) {
            const number = value.replace('cm', '')
            if (number < cmMin || number > cmMax) return false
        }

        if (isIn) {
            const number = value.replace('in', '')
            if (number < inMin || number > inMax) return false
        }
    }
    if (hex && !/^#[0-9a-f]{6}$/i.test(value)) return false
    if (digitsOnly && !/^\d+$/i.test(value)) return false
    if (options && !options.includes(value)) return false
    return true
}

const partOne = passportEntries.filter(
    passport => requiredFields.every(
        ({ key }) => passport.find(([entryKey]) => entryKey === key)
    )
).length

const partTwo = passportEntries.filter(
    passport => requiredFields.every(
        requirement => passport.find(entry => checkRequirement(requirement, entry))
    )
).length

console.log({ partOne, partTwo })
