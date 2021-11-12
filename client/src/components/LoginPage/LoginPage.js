import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../actions/user_action';
import { useHistory } from 'react-router';

function LoginPage() {



    const dispatch = useDispatch();
    const history = useHistory();

    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleEmail = (e) => {
        setEmail(e.currentTarget.value)
    }
    const handlePassword = (e) => {
        setPassword(e.currentTarget.value)
    }
    
    
    const handleOnSubmit = (event) => {
        event.preventDefault();
    
    
        let body = {
            email : email,
            password : password
            
        }
        
        //서버 통신으로 dispatch랑 redux를 넣어준다. 
        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    history.push('/')
                } else {
                    alert('Error˝')
                }
            })
    
    }
    return (
        <div style = {{
            display: 'flex;', justifyContent: 'center', textAlign: 'center',
            alignItems : 'center', backgroundColor: 'blue', width : '50%', height: '40vh'
        }}>

        <form 
        style = {{display: 'flex', flexDirection: 'column'}}
        onSubmit = {handleOnSubmit}>

        <label>이메일</label>
        <input type = "email" value = {email} onChange = {handleEmail} />

        <label>비밀번호</label>
        <input type = "password" value = {password} onChange = {handlePassword} />


        <button type = "submit">로그인</button>
        </form>



        </div>
    )
}

export default LoginPage
