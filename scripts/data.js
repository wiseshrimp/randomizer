const Mediums = {
    coding: 'coding',
    comedy: 'comedy',
    poetry: 'poetry',
    video: 'video',
    visual: 'visual',
    writing: 'writing'
}
const MediumsArr = Object.values(Mediums)

const membersPath = '/members'

const headers = new Headers({
    'Content-Type': 'application/json'
})

var data = null

function deletePerson(name) {
    fetch(membersPath, {
        method: 'delete',
        body: JSON.stringify({
            name
        }),
        headers
    })
}

function savePerson(method, name, medium) {
    fetch(membersPath, {
        method,
        body: JSON.stringify({
            name,
            medium
        }),
        headers
    })

    let newData = [...data, {
        id: data.length,
        name,
        medium
    }]
    data = newData
}

function createDiv(classText) {
    let div = document.createElement('div')
    div.className = classText
    return div
}

function createMediumOption(pName, pMedium) {
    let selectOption = document.createElement('select')
    selectOption.addEventListener('change', onMediumChange)
    selectOption.dataset.person = pName
    MediumsArr.forEach(medium => {
        let option = document.createElement('option')
        option.value = medium
        option.selected = medium === pMedium
        option.innerText = medium
        selectOption.appendChild(option)
    })
    return selectOption
}

function onMediumChange ({target}) {
    let name = target.dataset.person
    let medium = target.value
    let idx = data.findIndex(el => {
        return el.name === name
    })
    if (data[idx].medium !== medium) {
        data[idx].medium = medium
    }
    savePerson('put', name, medium)
}

function onAddPerson(ev) {
    ev.preventDefault()
    let nameInput = document.getElementById('new-person-name')
    let mediumInput = document.getElementById('new-person-medium')
    let name = nameInput.value
    let medium = mediumInput.value
    savePerson('post', name, medium)

    let dataDiv = document.getElementById('people-data')
    let personDiv = createDiv('person')
    let nameDiv = createDiv('name')
    let deleteDiv = createDiv('delete')
    personDiv.id = `person-${name}`
    nameDiv.innerText = name
    deleteDiv.innerText = 'x'
    deleteDiv.dataset.name = name
    deleteDiv.addEventListener('click', onDeletePerson)
    personDiv.appendChild(nameDiv)
    let selectOption = createMediumOption(name, medium)
    personDiv.appendChild(selectOption)
    personDiv.appendChild(deleteDiv)
    dataDiv.appendChild(personDiv)
}

function onDeletePerson({ target }) {
    let { name } = target.dataset
    deletePerson(name)
    let personDiv = document.getElementById(`person-${name}`)
    personDiv.innerHTML = ''
    let personIdx = data.findIndex(el => {
        return el.name === name
    })
    let newData = data.slice()
    newData.splice(personIdx, 1)
    data = newData
}

function onCrackathonCreate(ev) {
    let crackathonResults = document.getElementById('crackathon-results')
    crackathonResults.innerHTML = ''
    let numberInput = document.getElementById('number-input')
    if (!numberInput.value) {
        return
    }
    let randomizer = new Randomizer({
        size: numberInput.value,
        isDiversified: true,
        isRepeated: false
    })
    let randomizerResultsDiv = createDiv('randomizer-groups')
    randomizer.finalGroups.forEach((group, idx) => {
        let groupDiv = createDiv('randomizer-group')
        let groupTextDiv = createDiv('group-text')
        groupTextDiv.innerText = `group ${idx + 1}`
        groupDiv.appendChild(groupTextDiv)
        group.forEach(person => {
            let personDiv = createDiv('randomizer-person')
            personDiv.innerText = person.name
            groupDiv.appendChild(personDiv)
        })
        randomizerResultsDiv.appendChild(groupDiv)
    })
    crackathonResults.appendChild(randomizerResultsDiv)
}

function populate () {
    let dataDiv = document.getElementById('people-data')

    data.forEach(person => {
        let nameDiv = createDiv('name')
        let personDiv = createDiv('person')
        let selectOption = createMediumOption(person.name, person.medium)
        let deleteDiv = createDiv('delete')
        personDiv.id = `person-${person.name}`
        nameDiv.innerText = person.name
        deleteDiv.innerText = 'x'
        deleteDiv.dataset.name = person.name
        deleteDiv.addEventListener('click', onDeletePerson)
        personDiv.appendChild(nameDiv)
        personDiv.appendChild(selectOption)
        personDiv.appendChild(deleteDiv)
        dataDiv.appendChild(personDiv)
    })

    init()
}

function init () {
    let addPersonButton = document.getElementById('add-person-btn')
    let crackathon = document.getElementById('crackathon')
    let randomizeButton = document.getElementById('randomize-button')

    addPersonButton.addEventListener('click', onAddPerson)
    crackathon.addEventListener('click', onCrackathonCreate)
    randomizeButton.addEventListener('click', getRandomPerson)
}
