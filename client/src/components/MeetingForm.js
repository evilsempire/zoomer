import React from "react";
import { Form, Input, Select, DatePicker,Button,Alert } from 'antd';
import { withRouter } from 'react-router-dom'
import { loadState } from "../utils";

const { Option } = Select;

class MeetingForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onFinish = async (values) => {
        //First create a call
        try {
            const response = await fetch('/api/createMeeting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": "Bearer "+ loadState()
                },
                body: JSON.stringify({
                    topic : values.topic,
                    type: values.type,
                    start_time: values.start_time._d,
                    password: values.password,
                    agenda: values.agenda,
                    email:values.email
                    
                 }),
            });
            const result = await response.json();

            if(result.uuid){
                this.setState({
                    status: true,
                    error: ""
                })
            }else{
                this.setState({
                    error: result.message,
                    status: false
                })
            }
            
        } catch (error) {
            this.setState({
                error: error
            })
        }
    };

    render() {

        return (
            <Form
                name="normal_login"
                className="login-form token-screen"
                initialValues={{
                    remember: true,
                }}
                onFinish={e => this.onFinish(e)}
                style={{padding:"10px"}}
            >

                <Form.Item
                    label="Email"
                    name="email"
                    type="email"
                    rules={[{ required: true, message: 'Please input email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Meeting Topic"
                    name="topic"
                    rules={[{ required: true, message: 'Please input meeting topic!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select meeting type"
                        allowClear
                    >
                        <Option value={1}>Instant Meeting</Option>
                        <Option value={2}>Scheduled Meeting</Option>
                        <Option value={3}>Recurring meeting with no fixed time</Option>
                    </Select>
                </Form.Item>

                <Form.Item  name="start_time" label="Start Time" rules={[{ required: true }]} >
                    <DatePicker showTime={true} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Agenda"
                    name="agenda"

                >
                    <Input.TextArea />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Create Meeting
                    </Button>

                </Form.Item>

                {
                    !this.state.status ? null :<Alert message="Meeting created successfully!" type="success" />
                }

                {
                    !this.state.error ? null :<Alert message={this.state.error} type="error" />
                }
            </Form>
        )
    }
};

export default withRouter(MeetingForm);