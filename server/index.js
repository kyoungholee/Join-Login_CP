const express = require('express');
const app = express();
const mongoose = require('mongoose');


const {auth} = require('./middleware/auth');
const {User} = require('./models/User');
const config = require('./config/key');;
const cookieParser = require('cookie-parser');



app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI)
.then(() => console.log('몽고 디비 연결 성공!!!!'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send("안녕하세여!!"))

app.get('/api/hello', (req, res) => {
    res.send('dkekdwkd!~')
})



    // 회원가입을 위한 라우터를 만들 것이다.!
app.post('/api/user/register', (req, res) => {
    // 회원가입 할때 필요한 정보들을 client에 있는 User정보를 가져오면
    //그것들을 DB에 넣어준다.
    const user = new User(req.body)



    //DB에 저장 해주는 곳 
    user.save((err, userInfo) => {
        if(err) return res.json({ success : false, err})
            return res.status(200).json({
                success : true
            })
    })
})


// 로그인을 위한 라우터 만들기!!! 
app.post('/api/user/login', (req, res) => {

    // 1. 요청된 이메일을 DB에서 있는지 찾는다!!
    User.findOne({ email: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당 유저가 없습니다."
            })
        }
        // else {
        //     return res.status(200).json({
        //         success : true
        //     })
        // }

        // 2. 요청된 이메일이 DB에 있다면 비밀번호 맞는지 확인한다.
        // 비밀번호가 있다면 이부분 실행
        user.comparePassword (req.body.password, (err, isMatch) => {

                    //User.js에서 먼저 실행이 되서 암호화된 비밀번호를 비교한 후 맞다면
                    //여기로 넘겨주고 밑을 실행시킨다.!!

                   // 없다면 여기를 실행 
            if(!isMatch)
                return res.json({ loginSuccess : false,
                message : "비밀번호가 틀렸습니다."}) 
 

        //3. 비밀번호가 맞다면 토큰을 생성한다.
        user.generateToken((err, user) => {
            if(err) return res.status(400).send(err);


             //토큰을 (쿠키 혹은 로컬스토리지)에 저장 가능하다.

            //쿠키에 저장
            res.cookie("cookie_save", user.token)
            .status(200)
            .json({loginSuccess : true, userId : user._id})

            })
        })
    })
})


//클라이언트가 받는다. 
app.get('/api/user/auth', auth, (req, res) => {

    //여기까지 왔다면 미들웨어가 통과되서 실행이 가능 !!

    res.status(200),json({
        _id : req.user._id,
        isAdmn : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })

})

app.get('/api/user/logout', auth, (req, res) => {
    

    //로그아웃 하려는 유저를 Db에서 찾아라 ~! 
    User.findOneAndUpdate({ _id: req.user._id}, 
        { token :"" },
        (err, user) => {
            if (err) return res.json({ success : false, err});
            return res.status(200).send({
                success : true
            })
        })

})


const port = 4400;
app.listen(port, () => console.log(`Example app listening on port
${port}!`))
