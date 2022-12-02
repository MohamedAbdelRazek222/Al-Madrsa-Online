import React, { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, viewsDirective, viewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import { Header } from '../components'
import { get, add, put, del } from '../helpers/Crud'
import { Button } from '../components'
import { getCookie } from '../helpers/cookieUtils'
import jwt_decode from "jwt-decode";

const Calendar = () => {

  let interval;
  let counter = 0;

  async function startZoomMeeting({ id, meeting_id }) {
    if (interval) {
      return;
    }

    const access_token = getCookie("access_token");
    if (!access_token) {
      window.open("http://localhost:8000/zoomapi/token", '_blank');
    }

    interval = setInterval(async () => {
      if (++counter > 10) {
        clearInterval(interval);
        interval = undefined;
        counter = 0;
      }

      const access_token = getCookie("access_token");
      if (!access_token) {
        return;
      }

      try {
        const access_token_string = "Bearer " + access_token;
        console.log("access_tokennn:", access_token_string);
        let dataToSend = { meeting_id, access_token: access_token_string };
        dataToSend["start_time"] = !dataToSend["start_time"] ? "" : new Date(dataToSend["start_time"]).toISOString();
        let response = await add("http://localhost:8000/zoomapi/meetingStartUrl", dataToSend);
        console.log(response);
        // extract start url
        const { start_url } = response;

        // update slot id
        console.log("dataaaaa", data)
        const dataToUpload = data.find(event => String(event.id) === String(id));
        console.log("dataupload: ", dataToUpload)
        dataToUpload["start_time"] = !dataToUpload["start_time"] ? "" : new Date(dataToUpload["start_time"]).toISOString();
        actionHandler({ requestType: "eventChanged", data: [{ ...dataToUpload, start_url }] });
        window.open(start_url, "_blank");
      } catch (e) {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        alert("error happened, try again");
      } finally {
        // clean up
        clearInterval(interval);
        interval = undefined;
        counter = 0;
      }
    }, 5000);
  }

  const [data, setData] = useState();
  const [eventData, setEventSelected] = useState({ status: false, id: null, start_time: null, topic: null, access_token: null, meeting_id: null });

  const refreshCalendar = () => {
    get("http://localhost:8000/slot/").then(newData => {
      const dataToSet = newData.map((slot, index) => ({
        Id: index,
        id: slot._id,
        StartTime: slot.start_time,
        EndTime: slot.end_time,
        Subject: slot.topic,
        topic: slot.topic, start_time: slot.start_time, end_time: slot.end_time,
        meeting_id: slot.meeting_id, join_url: slot.join_url, start_url: slot.start_url
      }));
      console.log("datattttttt:", dataToSet);
      setData(dataToSet);
    });
  }

  const select = (args) => {
    console.log("select", args)
    if (args.requestType === "eventSelect") {
      const { id, start_time, topic, meeting_id, join_url, start_url } = args.data;
      setEventSelected({
        ...eventData,
        status: true, id, start_time, topic, meeting_id, join_url, start_url
      })
    } else {
      setEventSelected({ status: false, id: null })
    }
  }

  const actionHandler = (state) => {
    console.log("calender action handler", state);
    if (state.requestType === "eventCreated") {
      const keyValues = Object.entries(state.data[0])
        .filter(([key, _]) => key !== "Id");

      const mapFromKeyValues = Object.fromEntries(keyValues);
      mapFromKeyValues["topic"] = mapFromKeyValues["Subject"];
      mapFromKeyValues["start_time"] = new Date(mapFromKeyValues["StartTime"]).toISOString();
      mapFromKeyValues["end_time"] = new Date(mapFromKeyValues["EndTime"]).toISOString();

      add("http://localhost:8000/slot", mapFromKeyValues)
        .then((_) => refreshCalendar());
    } else if (state.requestType === "eventChanged") {
      const mapFromKeyValues = state.data[0];

      mapFromKeyValues["topic"] = mapFromKeyValues["Subject"];
      mapFromKeyValues["start_time"] = new Date(mapFromKeyValues["StartTime"]).toISOString();
      mapFromKeyValues["end_time"] = new Date(mapFromKeyValues["EndTime"]).toISOString();

      put(`http://localhost:8000/slot/${state.data[0].id}`, mapFromKeyValues).then((_) => refreshCalendar());
    } else if (state.requestType === "eventRemoved") {
      del(`http://localhost:8000/slot/${state.data[0].id}`).then((_) => refreshCalendar());
    } else {
      //     // console.log(state.action)
    }
  }

  async function scheduleZoomMeeting({ id, start_time, topic }) {
    if (interval) {
      return;
    }

    const access_token = getCookie("access_token");
    if (!access_token) {
      window.open("http://localhost:8000/zoomapi/token", '_blank');
    }

    interval = setInterval(async () => {
      if (++counter > 10) {
        clearInterval(interval);
        interval = undefined;
        counter = 0;
      }

      const access_token = getCookie("access_token");
      if (!access_token) {
        return;
      }

      try {
        const access_token_string = "Bearer " + access_token;
        console.log("access_tokennn:", access_token_string);
        let dataToSend = { topic, start_time, access_token: access_token_string };
        dataToSend["start_time"] = !dataToSend["start_time"] ? "" : new Date(dataToSend["start_time"]).toISOString();
        let response = await add("http://localhost:8000/zoomapi/createMeeting", dataToSend);
        console.log(response);
        // extract meeting id and join url
        const { id: meeting_id, join_url } = response;

        // update slot id
        console.log("dataaaaa", data)
        const dataToUpload = data.find(event => String(event.id) === String(id));
        console.log("dataupload: ", dataToUpload)
        dataToUpload["start_time"] = !dataToUpload["start_time"] ? "" : new Date(dataToUpload["start_time"]).toISOString();

        actionHandler({ requestType: "eventChanged", data: [{ ...dataToUpload, meeting_id, join_url }] });
      } catch (e) {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        alert("error happened, try again");
      } finally {
        // clean up
        clearInterval(interval);
        interval = undefined;
        counter = 0;
      }
    }, 5000);
  }

  const joinZoomMeeting = ({join_url}) => {
    window.open(join_url, "_blank");
  }

  const onClickScheduleMeeting = (e) => {
    const meetingInfo = eventData;
    scheduleZoomMeeting(meetingInfo)
      .then((_) => refreshCalendar())
      .then((_) => alert("Scheduling meeting was successful"));
  }

  const onClickStartMeeting = (e) => {
    const meetingInfo = eventData;
    startZoomMeeting(meetingInfo).then((_) => refreshCalendar());
  }

  const onClickJoinMeeting = (e) => {
    const meetingInfo = eventData;
    joinZoomMeeting(meetingInfo);
  }

  useEffect(() => {
    refreshCalendar();
  }, []);
  
  //console.log(localStorage.get("auth_token"))
  const decodedToken = jwt_decode(sessionStorage.getItem("token"));

  return (<div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
    <Header category="App" title="Calendar" />
    {!eventData.status ?
      null :
      <>
      {decodedToken.role === "teacher" ?
      <>
        <Button
          bgColor="black" color="white" size="10px" text="Schedule Zoom Meeting" borderRadius="1px"
          onClick={onClickScheduleMeeting} />
        { !eventData.meeting_id ? null :
          <Button
          bgColor="black" color="white" size="10px" text="Start Zoom Meeting" borderRadius="1px"
          onClick={onClickStartMeeting} />
        }
      </>
      : null}
      {decodedToken.role === "student" ?
      <>
        <Button
          bgColor="black" color="white" size="10px" text="Join Zoom Meeting" borderRadius="1px"
          onClick={onClickJoinMeeting} />
      </>
      : null
      }
      </>
    }
    <ScheduleComponent
      height="55vh"
      actionComplete={actionHandler}
      select={select}
      eventSettings={{ dataSource: data }}
      selectedDate={new Date(2021, 0, 10)}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
    </ScheduleComponent>
  </div>
  );
}

export default Calendar;
