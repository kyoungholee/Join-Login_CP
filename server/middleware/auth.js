const { User } = require('../models/User');

let auth = (req, res, next) => {

    //인증 처리를 하는 곳 

    
    // ** 순서 
    // Cookie에 저장된 Token을 server에서 가져와서 복호화하고,
    // 유저의 대한 정보를 비교한다. 

    // 1. 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.cookie_save;


    // 2. 토큰을 복호화 한후 유저를 찾는다. 
    //여기서 복호화는 User.js에서 findByToken 메소드로 찾는다. 

    //토큰 유저에서 에러가 나면 이곳을 출력!!
    User.findByToken(token, (err ,user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth : false, error : true})


        // 유저가 있어서 토큰을 잘 받았다면!!
        // index에서 token과 user를 사용하기 위해 
        req.token = token;
        req.user = user;

        //index.js에 미들웨어에서 다음으로 넘어 갈 수 있게 next를 넣어준다. 
        next();
    })

    // 유저가 있으면 인증 OK
    // 유저가 없으면 NO 
}

module.exports = {auth};