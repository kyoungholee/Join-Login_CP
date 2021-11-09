const express = require('express');
const app = express();
const port = 4400;
const mongoose = require('mongoose');




app.use(express.urlencoded({extended: true}))
app.use(express.json());


mongoose.connect('mongodb+srv://kyoungholee:asdf1234@jack.9utks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => console.log('몽고 디비 연결 성공!!!!'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send("안녕하세여!!"))

app.get('/api/hello', (req, res) => {
    res.send("안녕 ~~");
})



app.listen(port, () => console.log(`Example app listening on port
${port}!`))
