//User에 대한 정보가 들어가 있는 컴포넌트이다 . 

const mongoose = require('mongoose');


// const bcrypt = require('bcrypt');

// // salt가 몇글자인지 나타낸다. 
// const saltRounds = 10;

// const jwt = require('jsonwebtoken');



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