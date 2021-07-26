const express = require('express')
const path = require('path');
var cors = require('cors');

const indexRouter = require('./routes/index')
const qnaRouter = require('./routes/qna')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter)
app.use('/qna', qnaRouter)

app.listen(3000, function(){
    console.log('app listening on port 3000')
})