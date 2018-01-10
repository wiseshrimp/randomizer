function getRandomNumber (min, max) { // inclusive
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getNonRepeatArray (size, max) { // inclusive
    let randomNums = []
    for (var i = 0; i < size; i++) {
        let randomNum
        do {
            randomNum = getRandomNumber(0, max)
        } while (randomNums.includes(randomNum))
        randomNums.push(randomNum)
    }
    return randomNums
}

function getRandomPerson () {
    let dataArr = Object.values(data)
    let randomIdx = getRandomNumber(0, dataArr.length - 1)
    document.getElementById('prompt-chosen').innerHTML = dataArr[randomIdx].name
}

// Change to class structure
class Randomizer {
    constructor (props) {
        this.people = Object.values(data)

        this.size = props.size
        this.numOfGroups = Math.floor(this.people.length / this.size)
        this.isDiversified = props.isDiversified
        this.isRepeated = props.isRepeated
        this.check()
    }

    check () {
        if (this.isDiversified) {
            let mediums = Object.keys(Mediums)
            this.mediums = mediums
            this.peopleByMedium = {}
            mediums.forEach(medium => {
                this.people.forEach((person, idx) => {
                    if (person.medium === medium) {
                        if (!this.peopleByMedium[medium]) {
                            this.peopleByMedium[medium] = new Array()
                        }
                        this.peopleByMedium[medium].push(person)
                    }
                })
            })
        }
        this.randomize()
    }

    randomize () {
        let peopleByMedium = Object.values(this.peopleByMedium)
        let groups = []
    
        for (var i = this.numOfGroups; i > 0; i--) {
            let group = []
            if (peopleByMedium.length < this.size) {
                for (var h = peopleByMedium.length - 1; h >= 0; h--) {
                    for (var g = peopleByMedium[h].length - 1; g >= 0; g--) {
                        if (group.length <= groups[0].length) {
                            group.push(peopleByMedium[h][g])
                        } else {
                            break
                        }
                        peopleByMedium[h].splice(g, 1)
                    }
                    if (!peopleByMedium[h].length) {
                        peopleByMedium.splice(h, 1)
                    }
                }
                groups.push(group)
                break
            }
            let randomNums = getNonRepeatArray(this.size, peopleByMedium.length - 1).sort((a, b) => a - b)
            for (var j = randomNums.length - 1; j >= 0; j--) {
                let randomMediumIdx = randomNums[j]
                let randomMedium = peopleByMedium[randomMediumIdx]
                let randomPerson
                if (!(randomMedium.length - 1)) {
                    randomPerson = randomMedium[0]
                    peopleByMedium.splice(randomMediumIdx, 1)
                } else {
                    let otherRandomIdx = getRandomNumber(0, randomMedium.length - 1)
                    randomPerson = randomMedium[otherRandomIdx]
                    peopleByMedium[randomMediumIdx].splice(otherRandomIdx, 1)
                }
                group.push(randomPerson)
            }
            groups.push(group)
        }

        let groupsWithExtra = []

        if (peopleByMedium.length) {
            let lengths = groups.map(a => a.length)
            let highestIdx = lengths.indexOf(Math.max.apply(Math, lengths))
            let lowestIdx = lengths.indexOf(Math.min.apply(Math, lengths))
            if (lengths[highestIdx] !== lengths[lowestIdx]) {
                let repeatIdx = lengths[highestIdx] - lengths[lowestIdx]
                for (var k = 0; k < repeatIdx; k++) {
                    let randomIdx = peopleByMedium.length === 1 ? 0 : getRandomNumber(0, peopleByMedium.length - 1)
                    groups[lowestIdx].push(peopleByMedium[randomIdx])
                    peopleByMedium.splice(randomIdx, 1)
                }
            }
            for (var k = peopleByMedium.length - 1; k >= 0; k--) {
                let randomIdx = getRandomNumber(0, groups.length - 1)
                if (groupsWithExtra.length === groups.length) {
                    groupsWithExtra = []
                }
                
                do {
                    randomIdx = getRandomNumber(0, groups.length - 1)
                } while (groupsWithExtra.includes(randomIdx))
                groups[randomIdx].push(peopleByMedium[k][0])
                groupsWithExtra.push(randomIdx)
            }
        }
        this.finalGroups = groups
    }
}

// let randomized = new Randomizer({
//     size: 3,
//     isDiversified: true,
//     isRepeated: false
// })
