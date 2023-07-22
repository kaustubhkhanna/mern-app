import React, { useEffect, useState } from "react";
// import DefaultLayout from "../components/DefaultLayout";
import { Form, message } from 'antd';
import '../resources/authentication.css'
import Input from "antd/es/input/Input";
// import Link from "antd/es/typography/Link";
import {Link, useNavigate} from 'react-router-dom';
import Spinner from "../components/Spinner";
import axios from 'axios'
function Register() {
    const [loading,setloading]=useState(false)
    const navigate=useNavigate(true)
    const onFinish=async(values)=>{
        try {
            setloading(true)
            await axios.post('/api/users/register',values)
            message.success('Registration Successful')
            setloading(false)
        } catch (error) {
            message.error('Something went wrong')
            setloading(false)
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("crazymoney-user")){
            navigate('/');
        }
    },[]);
    return (

        <div className="register">
            {loading && <Spinner/>}
            <div class="row justify-content-center align-items-center w-100 h-100">

                <div className="col-md-5">
                    <div className="lottie">
                        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_yfsxyqxp.json" background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                </div>
                <div className="col-md-4">
                    <Form layout="vertical" onFinish={onFinish}>
                    <h1>CRAZY MONEY REGISTER</h1>
                    <hr/>
                        <Form.Item label="Name" name='name'>

                            <Input />

                        </Form.Item>
                        <Form.Item label="E-mail" name='email'>

                            <Input />

                        </Form.Item>
                        <Form.Item label="Password" name='password'>

                            <Input type="password"/>

                        </Form.Item>
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to='/login'>Already Registered? Click here to login</Link>
                            <button className="primary" type="submit">REGISTER</button>
                        </div>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default Register