import React from "react";
import { Row, Col } from 'antd';
import MeetingForm from "./MeetingForm";
import MeetingList from "./MeetingList";


class Meeting extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email : ''
        }
    }


    setEmail = (email) => {
        this.setState({
            email
        })
    }

    render() {
        return (
            <Row>
                <Col span={8}>
                    <MeetingForm setEmail={this.setEmail}/>
                </Col>

                <Col span={16}>
                    <MeetingList email = {this.state.emeail}/>
                </Col>
            </Row>
        )
    }
}

export default Meeting;