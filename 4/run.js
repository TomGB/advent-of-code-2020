const fs = require('fs')

const passportsText = fs.readFileSync('4/input.txt', 'utf8').split(`\n\n`)

const passportFields = passportsText.map(passport => passport.split(/[\n\s]+/))

const passportEntries = passportFields.map(passport => passport.map(entry => entry.split(':')))

const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    // 'cid',
]

const validPassports = passportEntries.filter(
    passport => requiredFields.every(
        key => passport.find(([entryKey]) => entryKey === key)
    )
)

console.log({ partOne: validPassports.length })
