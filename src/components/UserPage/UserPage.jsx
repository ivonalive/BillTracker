import {useState, useEffect, useCallback} from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import './UserPage.css';
import CustomToolbar from "../CustomToolbar/CustomToolbar";
import '../Nav/Nav.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function UserPage() {
  const user = useSelector((store) => store.user);
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
      
      const fetchBills = useCallback(() => {
        if (user && user.id) {
          const source = axios.CancelToken.source();
          
          axios.get('/api/bill', { cancelToken: source.token })
            .then((response) => {
              let calendarEvents = [];
              response.data.forEach((bill) => {
                // Generate the bill event for this month and future months
                for (let i = 0; i < 12; i++) { 
                  const dueDate = moment(bill.bill_due_date).add(i, 'months').toDate();
                  calendarEvents.push({
                    id: bill.id,
                    title: `$${bill.bill_amount} - ${bill.bill_name}`,
                    amount: bill.bill_amount,
                    link: bill.bill_link,
                    cardNickname: bill.card_nickname,
                    dueDate: dueDate,
                    start: dueDate,
                    end: dueDate,
                    allDay: true,
                  });
                }
              });
              setEvents(calendarEvents);
            })
            .catch((error) => {
              if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
              } else {
                console.error('Error fetching bills:', error);
                if (error.response && error.response.status === 401) {
                  // Handle unauthorized error (user not logged in)
                  console.log('User not authenticated');
                } else {
                  alert('Something went wrong getting bills!');
                }
              }
            });
    
          // Return a cleanup function
          return () => {
            source.cancel('Operation canceled by the user.');
          };
        }
      }, [user]);
      
      useEffect(() => {
        const cleanup = fetchBills();
        return () => {
          if (cleanup) cleanup();
        };
      }, [fetchBills]);
    
      if (!user.id) {
        return null; // or a loading indicator
      }
      
      // Move handleAddBill function outside the useEffect
      const handleAddBill = (event) => {
        event.preventDefault();
        const billData = {
          bill_name: title,
          bill_amount: amount,
          bill_link: link,
          card_nickname: cardNickname,
          bill_due_date: dueDate,
          recurring: true,
        };
      
        axios.post('/api/bill', billData)
          .then((response) => {
            console.log('POST /api/bill success:', response);
      
            // Clear the input fields
            setTitle('');
            setAmount('');
            setLink('');
            setCardNickname('');
            setDueDate('');
      
            // Re-fetch bills after a new one is added
            fetchBills();
          })
          .catch((error) => {
            console.error('Error adding a bill:', error);
          });
      };
      

const deleteBill = (id) => {
  axios.delete(`/api/bill/${id}`)
    .then((response) => {
      console.log('deleting a bill worked:', response);
      axios.get('/api/bill').then((response) => {
        fetchBills();
        setIsEditing(false);
        closeModal();
      }).catch(e => {
        console.log(e);
        alert('something went wrong deleting a bill!');
      })

    })
    .catch(function (error) {
      console.log(error);
    })
}

      const [isEditing, setIsEditing] = useState(false);
      const [editData, setEditData] = useState({
        amount: selectedEvent?.amount || '',
        title: selectedEvent?.title || '',
        cardNickname: selectedEvent?.cardNickname || '',
        link: selectedEvent?.link || '',
      });

      const handleEditClick = () => {
        setIsEditing(true);
      };

const handleEditSubmit = (e) => {
  e.preventDefault();

  axios.put(`/api/bill/${selectedEvent.id}`, {
    name: editData.title,
    amount: editData.amount,
    link: editData.link,
    card: editData.cardNickname,
    due_date: editData.dueDate,
    recurring: true,
  })
  .then((response) => {
    fetchBills();
    setIsEditing(false);
    closeModal();
  })
  .catch((error) => {
    console.error('Error updating bill:', error);
  });
};


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


      const openModal = (event) => {
        console.log("Selected Event: ", event); // Debug to check what data is being passed
        setSelectedEvent(event);
        const billName = event.title.split(' - ')[1] || event.title;

        setEditData({
          title: billName,
          amount: event.amount,
          link: event.link,
          cardNickname: event.cardNickname,
          dueDate: event.dueDate ? event.dueDate.toISOString().substr(0, 10) : '',
        });
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

      const [title, setTitle] = useState(''); 
      const [amount, setAmount] = useState(''); 
      const [link, setLink] = useState(''); 
      const [cardNickname, setCardNickname] = useState(''); 
      const [dueDate, setDueDate] = useState('');


  return (
    
    <div className="App">
      <div>
      <form onSubmit={handleAddBill} className="billInfo">
      <center>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bill Name"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Payment Link"
        />
        <input
          type="text"
          value={cardNickname}
          onChange={(e) => setCardNickname(e.target.value)}
          placeholder="Card Nickname"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Due Date"
        />
        <button type="submit" className="addBillButton">Add Bill</button>
        </center>
      </form>
    </div>
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
        toolbar={true}
        components={{
          toolbar: CustomToolbar,
        }}
        onSelectEvent={openModal}
      />
      {selectedEvent && (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Bill Details"
  >
    {isEditing ? (
      <form className="billInfo" onSubmit={handleEditSubmit}>
        {/* Form fields */}
        <div>
          <label>Bill Name: </label>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Amount: </label>
          <input
            type="number"
            name="amount"
            value={editData.amount}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label>Payment Link: </label>
          <input
            type="text"
            name="link"
            value={editData.link}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Card Nickname: </label>
          <input
            type="text"
            name="cardNickname"
            value={editData.cardNickname}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Due Date: </label>
          <input
            type="date"
            name="dueDate"
            value={editData.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="buttons-container">
        <button type="submit" className="buttons">Save Changes</button>
        <button type="button"  className="buttons" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
        </div>
      </form>
    ) : (
      <div className="billInfo">
        <p>Amount: ${selectedEvent.amount}</p>
        <p>Bill Name: {selectedEvent.title.split(' - ')[1]}</p>
        <p>Due Date: {selectedEvent.dueDate.toDateString()}</p>
        <p>Card Nickname: {selectedEvent.cardNickname || 'N/A'}</p>
        {selectedEvent.link && (
          <p>
            Bill Link: <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer">Click Here</a>
          </p>
        )}
        <div className="buttons-container">
        <button className="buttons" onClick={closeModal}>Close</button>
        <button className="buttons" onClick={() => deleteBill(selectedEvent.id)}>Delete</button>
        <button className="buttons" onClick={handleEditClick}>Edit</button>
        </div>
      </div>
    )}
  </Modal>
)}
<div className="email">billtracker.feedback@gmail.com</div>
    </div>
   
  );
}

export default UserPage;