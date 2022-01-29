const express = require('express')
const router = express.Router()
const axios = require('axios')
const { APPKEY, URL, memberDB } = require('../config')

const sendMsg = async(conv_id, contents) => {
    let data = {
        "conversation_id" : conv_id,
        "text" : "퇴근 시간! 오늘도 고생하셨습니다",
        
        "blocks": [
            {
                "type": "image_link",
                "url": "https://siiru.comin.com/images/siiru_meta.png"
            },
            {
                "type": "text",
                "text": "오늘의 퇴근송은 '"+contents.info+"'입니다. 오늘도 수고하셨어요😄",
                "markdown": false
            },
            {
                "type": "button",
                "text": "오늘의 퇴근송 듣기",
                "style": "default",
                "action_type": "open_system_browser",
                "value": contents.link
            }
        ]
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
    let info = body.info
    let link = body.link
    let contents = {"info" : info, "link" : link}
    let conv_id = memberDB[name]
    await sendMsg(conv_id, contents)
    res.redirect('/')
})

module.exports = router