import React from "react";
import Link from "umi/link";
import { Breadcrumb } from "antd";
import CreatMeetingForm from "./components/CreatMeetingForm/index";



class CreatMeeting extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>会议系统</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/meetingnotices">会议通知</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>创建会议</Breadcrumb.Item>
        </Breadcrumb>
        <h1>创建会议 </h1>
        <CreatMeetingForm />
      </div>

    )
  }
}

export default CreatMeeting;