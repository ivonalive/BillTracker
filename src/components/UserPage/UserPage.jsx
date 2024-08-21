import {useState, useEffect} from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "./Userpage.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
          amount: bill.bill_amount,
          link: bill.bill_link, 
          cardNickname: bill.card_nickname, 
          dueDate: new Date(bill.bill_due_date),
          start: new Date(bill.bill_due_date),
          end: new Date(bill.bill_due_date),
          allDay: true,
        };
      });
      setEvents(calendarEvents);
    }).catch(e => {
      console.log(e);
      alert('something went wrong!');
    })
  }, [])

  const deleteBill = (id) => {
    axios.delete(`/api/bill/${id}`)
    .then((response) => {
      console.log('deleting a bill worked:', response);
      axios.get('/api/bill').then((response) => {
        let calendarEvents = response.data.map((bill) => {
          return {
            id: bill.id,
            title: `$${bill.bill_amount} - ${bill.bill_name} `,
            amount: bill.bill_amount,
            link: bill.bill_link, 
            cardNickname: bill.card_nickname, 
            dueDate: new Date(bill.bill_due_date),
            start: new Date(bill.bill_due_date),
            end: new Date(bill.bill_due_date),
            allDay: true,
          };
        });
        setEvents(calendarEvents);
      }).catch(e => {
        console.log(e);
        alert('something went wrong!');
      })

    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const editBill = (id) => {
    axios.put(`/api/bill/${id}`)
      .then((response) => {
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
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const customStyles = {
    content: {
      background: 'transparent',
      padding: '20px',
      border: 'none', 
      width: 'fit-content',
      // margin: 'auto',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 100000,
    },
    overlay: {
      display: 'flex',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      zIndex: 99999,
    },
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
        onSelectEvent={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Bill Details"
      >
        {selectedEvent && (
          <div className="billInfo">
             <h2>{selectedEvent.title}</h2>
              <p>Amount: ${selectedEvent.amount}</p>
              <p>Bill Name: {selectedEvent.title}</p>
              <p>Due Date: {selectedEvent.dueDate.toDateString()}</p>
              <p>Card Nickname: {selectedEvent.cardNickname || 'N/A'}</p>
              {selectedEvent.link && (
                <p>
                  Bill Link: <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer">Click Here</a>
                </p>
              )}
            <button onClick={closeModal}>Close</button>
            <button onClick={() => deleteBill(selectedEvent.id)}>Delete</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default UserPage;