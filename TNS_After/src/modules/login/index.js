import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { Button, Input, Form, message } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import Api from '@/utils/api'

// import "antd/dist/antd.css"
import "./index.scss"

// import Home from '../home';

function Login2(props) {
    const [loading, changeLoading] = useState(false);
    function onFinish(obj) {
        changeLoading(true);

        sessionStorage.setItem('userInfo', JSON.stringify({
            name: "123",
            nickName: "123",
            avaterImg: "123",
            token: "123"
        }));

        window.location.href = '/';
        changeLoading(false);
    }
    return (
        <div id="components-form-demo-normal-login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h1>TNS运营管理平台</h1>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item
                    // name="captcha"
                    rules={[{ required: false, message: '请输入验证码!' }]}
                >
                    <Input
                        prefix={<SafetyOutlined className="site-form-item-icon" />}
                        type="text"
                        placeholder="验证码"
                    />
                    <img src="http://iph.href.lu/160x90?text=7985" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        登录
            </Button>
                </Form.Item>
            </Form>
            <Route path='/home' component={Home} />
        </div>
    )
}

function Login(props) {
    const [loading, changeLoading] = useState(false);
    function onFinish(obj) {
        changeLoading(true);
        Api.login({ name: obj.username, psw: obj.password }).then(res => {
            const data = res.data;
            if (data.flag) {
                sessionStorage.setItem('userInfo', JSON.stringify({
                    name: data.data.name,
                    nickName: data.data.nickName,
                    avaterImg: data.data.headPortraitUrl,
                    token: data.data.token
                }));
                message.success(data.message);

                //路由跳转
                props.history.push('/home');
            } else {
                changeLoading(false);
                message.error(data.message);
            }
        }).catch(err => {
            changeLoading(false);
            // console.log('...',err);
            message.error(err);
        })
    }
    return (
        <div id="components-form-demo-normal-login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h1>TNS运营管理平台</h1>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item
                    // name="captcha"
                    rules={[{ required: false, message: '请输入验证码!' }]}
                >
                    <Input
                        prefix={<SafetyOutlined className="site-form-item-icon" />}
                        type="text"
                        placeholder="验证码"
                    />
                    <img src="http://iph.href.lu/160x90?text=7985" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        登录
                </Button>
                </Form.Item>
            </Form>
            {/* <Route path='/home' component={Home} /> */}
        </div>
    )
}
class Login1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        // console.log(this.props)
    }
    // componentDidMount() {
    //     console.log(this.props.match)
    // }
    onFinish() {
        // console.log(this);
    }
    // onCodeChange(value) {
    //     console.log(value);
    // }
    render() {
        return (
            <div id="components-form-demo-normal-login">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onValuesChange={this.onCodeChange}
                >
                    <h1>TNS运营管理平台</h1>
                    <Form.Item
                        name="username"
                        rules={[{ required: false, message: '请输入用户名!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: false, message: '请输入密码!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item
                        // name="captcha"
                        rules={[{ required: false, message: '请输入验证码!' }]}
                    >
                        <Input
                            prefix={<SafetyOutlined className="site-form-item-icon" />}
                            type="text"
                            placeholder="验证码"
                        />
                        <img src="http://iph.href.lu/160x90?text=7985" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <Route path='/home' component={Home} />
            </div>
        )
    }
}

export default Login;