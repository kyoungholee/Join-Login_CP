import React, {useEffect} from 'react'
import axios from 'axios';
import {useHistory} from 'react-router';

function Home() {

    const history = useHistory();


    // useEffect(() => {
    //     axios.get('/api/hello')
    //         .then(res => {console.log(res.data)})
    // }, [])


    const onClickHandler = () => {

        axios.get('/api/user/logout') 
        .then(res => {
            if(res.data.success) {
                history.push('/loginPage')
            }else {
                alert("Error")
            }
        })
    }
    return (
        <div style = {{
            display: 'flex;', justifyContent: 'center', alignItems: 'center',
            width : '100%', height: '100vh'
        }}>

            <h2>시작페이지</h2>

            <button onClick = {onClickHandler}>로그아웃</button>
        </div>
    )
}

export default Home;
