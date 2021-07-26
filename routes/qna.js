const express = require('express')
const router = express.Router()
const axios = require('axios')
const { APPKEY, URL, memberDB } = require('../config')

const sendMsg = async(conv_id, contents) => {
    let data = {
        "conversation_id" : conv_id,
        "text" : contents
    }
    axios.post(URL, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": APPKEY
        }
    })
    .then((res) => {
        let status = res.status
        let isSuccess = res.data.success
        if(status === 200 && isSuccess) {
            console.log("send msg success")
            return true
        }
    })
}

router.get('/:id', function(req, res, next) {
    res.render('qna', { title: 'Q&A'})
})

router.post('/', async function(req, res, next) {
    let body = req.body
    console.log('qna post')
    let url = req.headers.referer
    let name = body.name
    let conv_id = memberDB[name]
    await sendMsg(conv_id, url)
    res.redirect('/')
})

module.exports = router