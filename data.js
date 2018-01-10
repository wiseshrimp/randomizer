const Mediums = {
    poetry: 'poetry',
    comedy: 'comedy',
    coding: 'coding',
    video: 'video',
    writing: 'writing',
    visual: 'visual'
}

let data = {
    0:
        {
            id: 0,
            name: 'Kal',
            medium: Mediums.writing
        },
    1: 
        {
            id: 1,
            name: 'Sue',
            medium: Mediums.coding
        },
    2:
        {
            id: 2,
            name: 'Sam',
            medium: Mediums.video
        },
    3:
        {
            id: 3,
            name: 'Gabe',
            medium: Mediums.video
        },
    4:
        {
            id: 4,
            name: 'Jackson',
            medium: Mediums.comedy
        },
    5:
        {
            id: 5,
            name: 'AJ',
            medium: Mediums.poetry
        },
    6:
        {
            id: 6,
            name: 'Rebecca',
            medium: Mediums.comedy
        },
    7:
        {
            id: 7,
            name: 'Claire',
            medium: Mediums.comedy
        },
    8:
        {
            id: 8,
            name: 'Kals Dad',
            medium: Mediums.writing
        },
    9:
        {
            id: 9,
            name: 'Allison',
            medium: Mediums.visual
        }
}

function onChange (medium, person) {
    let dataArr = Object.values(data)
    let idx = dataArr.findIndex(el => {
        return el.name === person
    })
    if (data[idx].medium !== medium) {
        data[idx].medium = medium
    }
}

function populate () {
    let mediumsArr = Object.values(Mediums)

    let dataArr = Object.values(data)
    let HTMLArr = ['<div>']
    dataArr.forEach(person => {                 
        let personalHTML = `<div class="person">
            <div class="name">${person.name}</div>
        </div>`
        HTMLArr.push(personalHTML)

        let selectionHTML = `<select onclick="onChange(this.value, '${person.name}')">`
        mediumsArr.forEach(medium => {
            selectionHTML += `
            <option value=${medium}
                ${medium === person.medium ? "selected" : ""}>
                ${medium}
            </option>`
        })
        selectionHTML += `</select>`
        HTMLArr.push(selectionHTML)
    })
    HTMLArr.push('</div>')
    let dataDiv = document.getElementById('people-data')
    dataDiv.innerHTML += HTMLArr.join('')

    init()
}

function init () {
    let crackathon = document.getElementById('crackathon')
    document.getElementById('randomize-button').addEventListener('click', getRandomPerson)
    crackathon.addEventListener('click', function (ev) {
        let numberInput = document.getElementById('number-input')
        if (!numberInput.value) return
        let randomizer = new Randomizer({
            size: numberInput.value,
            isDiversified: true,
            isRepeated: false
        })
        let randomizerResultsHTML = ['<div class="randomizer-group">']
        let finalGroup = (randomizer.finalGroups.map((group, idx) => {
            let groupHTML = [`<div class="randomizer-g1"><div class="header2">group ${idx + 1}</div>`]
            let people = ['<div class="group">']
            people = people.concat(group.map(person => (`<div class="person-name"> ${person.name} // </div>`)))
            people.push('</div>')
            people = people.join(' ')
            groupHTML.push(people)
            return groupHTML
        }))
        let finalArr = randomizerResultsHTML.concat(finalGroup)
        finalArr.push('</div>')
        document.getElementById('crackathon-results').innerHTML = finalArr.join('')
    })
}
