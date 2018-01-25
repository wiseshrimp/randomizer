const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')

const app = express()
const router = express.Router()
const port = process.env.PORT || 3000

var data = {}

app.use(express.static(`scripts`))
app.use(express.static('views'))
app.use(express.static(`public`))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// HELPER FUNCTIONS: Put in a different file
function arrToObj(dataArr) {
    return dataArr.reduce((acc, cur, idx) => {
        acc[idx] = cur
        return acc
    }, {})
}

function rereadFile(type, typeData) { // TO DO: Save extra copy of updated data to backup.txt just in case
    return new Promise((resolve, reject) => {
        fs.readFile('./server/users.json', 'utf8', (err, stringifiedData) => {
            if (err) { // TO DO: Do something better with error lol
                console.log(err)
            }
            let prevData = JSON.parse(stringifiedData)
            let dataArr = Object.values(prevData)
            let newData
            let { name } = typeData
            let medium = type === 'delete' ? null : typeData.medium
            switch (type) {
                case 'post':
                    newData = Object.assign({}, prevData, {
                        [dataArr.length]: {
                            id: dataArr.length,
                            medium,
                            name
                        }
                    })
                    break
                case 'delete':
                    let personIdx = dataArr.findIndex(person => person.name === name)
                    let newDataArr = dataArr.slice()
                    if (personIdx >= 0) {
                        newDataArr.splice(personIdx, 1)
                    } else {
                        break
                    }
                    newData = arrToObj(newDataArr)
                    break
                case 'put':
                    let putPersonIdx = dataArr.findIndex(person => person.name === name)
                    dataArr[putPersonIdx].medium = medium
                    newData = arrToObj(dataArr)
                    break
                default: break
            }
            resolve(newData)    
        })
    })
}

function writeData(newData) {
    if (!newData) return
    fs.writeFile('./server/users.json', JSON.stringify(newData), 'utf8', function (err) {
        data = newData
        if (err) {
            console.log(err)
            return
        }
    })
}

function dealWithNewData(newData) {
    if (!newData) {
        return
    }
    writeData(newData)
}

// ROUTER
router.get('/users', function (req, res, next) {
    fs.readFile('./server/users.json', 'utf8', (err, stringifiedData) => {
        if (err) {
            console.log(err)
        }
        data = JSON.parse(stringifiedData)
        res.json(data)
    })
})

router.post('/users', function (req, res, next) {
    let { name, medium } = req.body
    rereadFile('post', { name, medium })
    .then(dealWithNewData)
})

router.put('/users', function (req, res, next) {
    let {name, medium} = req.body
    rereadFile('put', { name, medium })
    .then(dealWithNewData)
})

router.delete('/users', function (req, res, next) {
    let { name } = req.body
    let dataArr = Object.values(data)
    rereadFile('delete', { name })
    .then(dealWithNewData)
})

router.get('/', function (req, res, next) {
    res.render('index.html')
})

app.use('/', router)

app.listen(port, function () {
    console.log(`Listening on port: ${port}`)
})
