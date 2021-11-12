import React, {useState} from 'react'
//import {useDispatch} from 'react-redux';
//import { registerUser } from '../../actions/user_action';
import { useHistory } from 'react-router';
import axios from 'axios';


function RegisterPage() {

  //  const dispatch = useDispatch();
    const history = useHistory();

    const [Email , setEmail] = useState("");
    const [Name , setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword , setConfirmPassword] = useState("");
    

    const handleEmail = (e) => {
        setEmail(e.currentTarget.value)
    }

    const handleName = (e) => {
        setName(e.currentTarget.value)
    }
    const handlePassword = (e) => {
        setPassword(e.currentTarget.value)
    }
    
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.currentTarget.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();

    if(Password !== ConfirmPassword) {
        return alert("비밀번호가 서로 같아야 합니다. ")
    }


    

    // dispatch(registerUser(body))

    // return DelayNode(100)
    // .then(res => {
    //     if(res.payload.success) {
    //         history.push('/LoginPage')
    //     } else {
    //         alert("Error")
    //     }
    // })
    let body  =  {
        email : Email,
        name : Name,
        password : Password
    }

        axios.post('/api/user/register', body)
        .then(res => {
            if(res.data.success) {
                history.push('/loginPage')
            } else {
                alert("Error")
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
        <input type = "email" value = {Email} onChange = {handleEmail} />

        <label>이름</label>l
        <input type = "text" value = {Name} onChange = {handleName} />

        <label>비밀번호</label>
        <input type = "password" value = {Password} onChange = {handlePassword} />

        <label>비밀번호 확인</label>
        <input type = "Password " value = {ConfirmPassword } onChange = {handleConfirmPassword }/>


        <button type = "submit">회원가입</button>
        </form>



        </div>
    )
}

export default RegisterPage
