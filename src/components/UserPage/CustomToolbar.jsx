import React from 'react';
import moment from 'moment';
// import './UserPage.css';

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToToday = () => {
    toolbar.onNavigate('TODAY');
  };

  const label = () => {
    const isCurrentMonth = moment(toolbar.date).isSame(moment(), 'month');
    if (isCurrentMonth) {
      // Format for today with "Today - DD MMMM YYYY"
      return `Current Month - ${moment(toolbar.date).format('MMMM YYYY')}`;
    }
    // Format for other months with "MMMM YYYY"
    return moment(toolbar.date).format('MMMM YYYY');
  };

  const isToday = moment(toolbar.date).isSame(moment(), 'day'); // Checks if the displayed date is today
  const isCurrentMonth = moment(toolbar.date).isSame(moment(), 'month'); // Checks if the displayed month is the current month

  return (
    <div className="custom-toolbar">
      <center>
        <button onClick={goToBack}>Back</button>
        
        {/* Conditionally show the "Today" button only in the current month, and hide it in other months */}
        {isCurrentMonth && !isToday && (
          <button className="toolbar-label" onClick={goToToday}>
            Today
          </button>
        )}

        <span >{label()}</span>
        
        <button onClick={goToNext}>Next</button>
      </center>
    </div>
  );
};

export default CustomToolbar;
