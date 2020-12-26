import React from "react";
import { Form, Input, Select, DatePicker, Button, Card } from 'antd';
import { withRouter } from 'react-router-dom'
import { loadState } from "../utils";

const { Option } = Select;

class MeetingForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meetings: []
        }
    }

    async componentDidMount() {
        //First create a call
        try {
            const response = await fetch('/api/listMeetings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": "Bearer " + loadState()
                },
                body: JSON.stringify({
                    email: "travelextest54@gmail.com"

                }),
            });
            const result = await response.json();

            if (result.meetings) {
                this.setState({
                    meetings: result.meetings,
                    error: ""
                })
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
        console.log(this.state);
        return (
            <div style={{padding:"10px"}}>
                {this.state.meetings ? this.state.meetings.map(meeting => {
                return (
                    <Card key={meeting.uuid} type="inner" title={meeting.topic} extra={<p>{meeting.start_time}</p>}>
                        <p><b>Agenda: </b>{meeting.agenda}</p>
                        <a href={meeting.join_url}>{meeting.join_url}</a>
                    </Card>
                )
            }) : "No Meetings scheduled"}
            </div>
        )
    }
};

export default withRouter(MeetingForm);