import {useState, useEffect} from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


import "./Userpage.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function UserPage() {
  
  const [events, setEvents] = useState([
    // {
    //   id: 1,
    //   title: 'Long Event',
    //   start: new Date(2024, 7, 7),
    //   end: new Date(2024, 7, 7),
    //   allDay: true,
    // },
  ]);

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

  useEffect(() => {
    axios.get('/api/bill').then((response) => {
      let calendarEvents = response.data.map((bill) => {
        return {
          id: bill.id,
          title: `$${bill.bill_amount} - ${bill.bill_name} `,
          start: bill.bill_due_date,
          end: bill.bill_due_date,
          allDay: true,
        };
      });
      setEvents(calendarEvents);
    }).catch(e => {
      console.log(e);
      alert('something went wrong!');
    })
  }, [])

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