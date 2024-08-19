import React, {useState} from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


import "./Userpage.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function UserPage() {
  
  const [events, setEvents] = React.useState([]);

  const onEventResize = (data) => {
    const { start, end } = data;
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents];
      updatedEvents[0].start = start;
      updatedEvents[0].end = end;
      return updatedEvents;
    });
  };
  const onEventDrop = (data) => {
    console.log(data);
  };


  return (
    <div className="App">
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        max={moment("23:59:00", "HH:mm:ss").toDate()}
        min={moment("00:00:00", "HH:mm:ss").toDate()}
        step={60}
        timeslots={1}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: "100vh" }}
      />
    </div>
  );
}

export default UserPage;