//User에 대한 정보가 들어가 있는 컴포넌트이다 . 

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//salt가 몇글자인지 나타낸다.  
const saltRounds = 10;
const jwt = require('jsonwebtoken');



const userSchema = mongoose.Schema({
    
    name : {
        type: String,
        maxlength : 60,

    },
    email : {
        type : String,
        maxlength : 60,
        trim : true,// 스페이스를 없애준다.
        unique: 1 
    },
    password : {
        type : String,
        maxlength : 60
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : { // 관리자인지 사용자인지 역할을 주는 것
        // '1' : 관리자, '0' : 사용자
        type : Number,
        default : 0
    },
    image : String,

    token : { // 유효성 관리 할 수 있다.
        type : String 
    },
    tokenExp : { // 토큰의 유효기간을 설정 
        type: Number
    }

})

userSchema.pre('save', function (next) {
    var user = this;

    //회원가입에 들어가는 비밀번호 암호화 !!
    if(user.isModified('password')) {


    bcrypt.genSalt(saltRounds, function (err, salt) {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function (err, hash) {
            if(err) return next (err)
            user.password = hash

            next()
        });
    });
    } else {
        next();
    }
});

//comparePassword의 해당 메소드 만든 것 
                                              //현재 비번  //콜백함수 
userSchema.methods.comparePassword = function(plainPssword, cb) {

       // 같은지 체크 해야된다. 
    //plainPssword 12345 === 암호화된 비번 : asld@1234%sdk123

    //현재 비밀번호와 암호화된 비번을 비교한다.
    bcrypt.compare(plainPssword, this.password, function(err, isMatch) {
        if(err) return cb(err);

        // 같다면 Match가 됐다고 알린다.
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;
    //jsoinWebTonken을 이용해서 token을 생성하기 


    //user._id + 'secretToken' = token 토큰 만들기 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)

        cb(null, user)
    })
}

// 토큰을 복호화환다.
userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //토큰을 decode한다. 
    jwt.verify(token, 'secretToken', function(err, decoded) {

         //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰 일치를 확인 
        user.findOne({"_id" : decoded, "token" : token}, function(err,user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}



const User = mongoose.model('User', userSchema);
module.exports = { User }