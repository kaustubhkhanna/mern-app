import React, { useEffect, useState } from "react";
import { Form, message } from 'antd';
import '../resources/authentication.css'
import Input from "antd/es/input/Input";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Spinner from "../components/Spinner";

function Login() {
    const [loading,setloading]=useState(false)
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            setloading(true)
            const response = await axios.post('/api/users/login', values)
            localStorage.setItem('crazymoney-user', JSON.stringify(response.data))
            setloading(false)
            message.success('Login Successful')
            navigate('/')
        } catch (error) {
            setloading(false);
            message.error('Login Failed')
        }
    };  

    useEffect(()=>{
        if(localStorage.getItem("crazymoney-user")){
            navigate('/');
        }
    },[]);

    return (

        <div className="Login">
            {loading && <Spinner/>}
            <div class="row justify-content-center align-items-center w-100 h-100">


                <div className="col-md-4">
                    <Form layout="vertical" onFinish={onFinish}>
                        <h1>CRAZY MONEY Login</h1>
                        <hr />
                        <Form.Item label="email" name='email'>

                            <Input />

                        </Form.Item>
                        <Form.Item label="password" name='password'>

                            <Input type="password"/>

                        </Form.Item>
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to='/register'>Not Registered? Click here to register</Link>
                            <button className="primary" type="submit">Login</button>
                        </div>
                    </Form>
                </div>
                <div className="col-md-5">
                    <div className="lottie">
                        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_yfsxyqxp.json" background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login