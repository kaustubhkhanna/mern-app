import React from 'react';
import '../resources/default-layout.css'
import { json, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Space } from 'antd';


function DefaultLayout(props) {
    const navigate=useNavigate()
    const items = [
        {
            key: '1',
            label: (
                <li onClick={()=>{
                    localStorage.removeItem('crazymoney-user')
                    navigate('/login')
                }}>LogOut</li>
            )
        },
    ];
    
    const user = JSON.parse(localStorage.getItem('crazymoney-user'))
    return (

        <div className="layout">
            <div className="header d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="logo">CHECK MONEY</h1>
                </div>
                <div>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomLeft"
                    >
                        <button className='primary'>{user.name}</button>
                    </Dropdown>
                    {/* <h1 className='username'>{user.name}</h1> */}
                </div>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout 