<template>
  <div id="main">
    <div id="main_body">
      <ul id="main_body_ul">
          <Message v-for="(value, key, index) in messages" :key="index"
            :type = 'value.type'
            :message = 'value.message'
            :id = 'value.id'
            :user = 'value.user'
            :myId = 'myId'
            :hour = 'value.hour'
            :min = 'value.min'
          />
      </ul>
    </div>
    <div id="main_footer">
      <form id="main_footer_form" name="message_form" v-on:submit.prevent="sendMessage">
        <textarea rows="1" required id="main_footer_form_text" name="message" v-model="newMessage" placeholder="メッセージを入力してください。"></textarea>
        <input id="main_footer_form_submit" type="submit" value="add"/>
      </form>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message'
import io from 'socket.io-client'

const url = 'http://127.0.0.1:5001'
let socket = io.connect(url)

export default {
  data () {
    return {
      myId: '',
      messages: [],
      newMessage: '',
      user: ''
    }
  },
  components: {
    Message
  },
  mounted () {
    if (localStorage.user !== undefined) {
      this.user = localStorage.user
    } else {
      this.user = prompt('ユーザ名')
      localStorage.user = this.user
    }
    if (localStorage.myId !== undefined) {
      this.myId = localStorage.myId
    } else {
      this.myId = new Date().getTime().toString(10) + Math.floor(Math.random() * 1000).toString(10)
      localStorage.myId = this.myId
    }
    socket.on('message', function (msg) {
      let date = new Date()
      date.setTime(msg.unixtime)
      let timeDiff = (date.getTimezoneOffset() / 60) * -1
      date.setTime(date.getTime() + 1000 * 60 * 60 * timeDiff)
      msg.date = date
      msg.hour = date.getHours().toString(10).padStart(2, '0')
      msg.min = date.getMinutes().toString(10).padStart(2, '0')
      this.messages.push(msg)
    }.bind(this))
    let unixtime = new Date().getTime()
    let msg = {
      type: 'login',
      message: 'login',
      id: this.id,
      user: this.user,
      unixtime: unixtime
    }
    socket.emit('login', msg)
  },
  updated: function () {
    this.$nextTick(function () {
      let doc = document.documentElement
      let docHeight = doc.scrollHeight - doc.clientHeight
      scroll(0, docHeight)
    })
  },
  methods: {
    sendMessage: function () {
      let unixtime = new Date().getTime()
      let msg = {
        type: 'message',
        message: document.message_form.message.value,
        id: this.myId,
        user: this.user,
        unixtime: unixtime
      }
      socket.emit('message', msg)
      this.newMessage = ''
    }
  }
}
</script>

<style>
#main{
  max-width:600px;
  width: 100%;
  min-height: 100%;
  height: auto;
  margin: 0 auto;
  margin-top: -10px;
  background-color: white;
}

#main_body{
  width: 100%;
  height: auto;
  margin-bottom: 60px;
}

#main_body_ul{
  padding: 0px;
}

#main_footer{
position: fixed;
bottom: 0;
left: 0;
width: 100%;
height: 60px;
}

#main_footer_form{
  max-width: 600px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 1px solid #ddd;
  background: white;
}

#main_footer_form_text{
  width: 85%;
  height: 30px;
  resize: none;
  border: none;
  outline: none;
  margin-top: 20px;
}

#main_footer_form_submit{
  border-style: none;
  width: 10%;
  height: 100%;
  float: right;
}

.main_body_message{
  height: auto;
  display: inline-block;
  width: 100%;
}

.main_body_message_li{
  min-height: 20px;
  height: 100%;
  margin-bottom: 5px;
  margin-left: 10px;
  float: left;
  max-width: 400px;
  width: 100%;

}

.main_body_my_message_li{
  min-height: 20px;
  height: 100%;
  margin-bottom: 5px;
  margin-right: 10px;
  float: right;
}

.main_body_login_message_li{
  min-height: 20px;
  height: 100%;
  margin-bottom: 5px;
  width: 40%;
  margin: auto;
  text-align: center;
}

.user{
  color: #888;
}

.message{
  float: left;
  color: #444;
  font-size: 16px;
  background-color: #ddd;
  border-radius: 5px;
  width: auto;
  max-width: 350px;
  word-wrap: break-word;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.login{
    float: left;
    font-size: 16px;
    background-color: #999;
    border-radius: 5px;
    width: 90%;
    word-wrap: break-word;
    color: white;
}

.time{
  float: left;
  margin-left: 5px;
}

.my_message{
  max-width: 350px;
  width: auto;
  float: right;
  color: #444;
  font-size: 16px;
  background-color: #7ec699;
  border-radius: 5px;
  margin-top: 10px;
  word-wrap: break-word;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.my_time{
  float: right;
  margin-right: 5px;
}
</style>
