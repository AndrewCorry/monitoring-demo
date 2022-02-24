const express = require('express');
const path = require('path');


// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '9864a83d3ede4a6ba47975bfaa23ca5e',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


const app = express();

app.use(express.jsonl())

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

let students = []
app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('student was added successfully', {author: 'Andrew', type:'Manual entry',})
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})