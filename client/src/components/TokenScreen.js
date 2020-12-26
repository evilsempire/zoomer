import React from "react";
import { Form, Input, Button,Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter  } from 'react-router-dom'


class TokenScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            error: ""
        }
    }

    onFinish = async (values) => {
        try {
            console.log('Received values of form: ', values);

            const response = await fetch('/api/generateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values }),
            });
            const result = await response.json();

            console.log("body", result.token)
            localStorage.setItem('token', result.token);

            if (result.token) {
                this.setState({
                    token: result.token,
                    error: ""
                },() => 
                    setTimeout(() => {
                        this.props.history.push("/meetings");
                    },2000  )
                )
            } else {
                this.setState({
                    error: 'Something Went wrong!. Please try again.'
                })
            }
        } catch (error) {
            this.setState({
                error: error
            })
        }
    };




    render() {

        console.log(this.props);

        return (
            <Form
                name="normal_login"
                className="login-form token-screen"
                initialValues={{
                    remember: true,
                }}
                onFinish={e => this.onFinish(e)}
            >
                <Form.Item
                    name="apiKey"
                    rules={[
                        {
                            required: true,
                            message: 'API KEY',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="API KEY" />
                </Form.Item>
                <Form.Item
                    name="apiSecret"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your API Secret!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="API Secret"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Generate Token
                    </Button>

                </Form.Item>

                {
                    !this.state.token ? null :<Alert message="Token generated Successfully. Redirecting..." type="success" />
                }

                {
                    !this.state.error ? null :<Alert message={this.state.error} type="error" />
                }
            </Form>
        )
    }
};

export default withRouter(TokenScreen);