const express = require('express');
const app = express();
const port = 4400;
const mongoose = require('mongoose');
const {User} = require('./models/User');





app.use(express.urlencoded({extended: true}))
app.use(express.json());


mongoose.connect('mongodb+srv://kyoungholee:asdf1234@jack.9utks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => console.log('몽고 디비 연결 성공!!!!'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send("안녕하세여!!"))





    // 회원가입을 위한 라우터를 만들 것이다.!
app.post('/api/user/register', (req, res) => {
    // 회원가입 할때 필요한 정보들을 client에 있는 User정보를 가져오면
    //그것들을 DB에 넣어준다.
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ success : false, err})
            return res.status(200).json({
                success : true
            })
    })
})




app.listen(port, () => console.log(`Example app listening on port
${port}!`))
