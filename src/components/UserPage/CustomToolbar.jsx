import React from 'react';

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

  return (
    <div className="custom-toolbar">
        <center>
      <button onClick={goToBack}>Back</button>
      <button onClick={goToToday}>Today</button>
      <button onClick={goToNext}>Next</button>
      </center>
      
    </div>
  );
};

export default CustomToolbar;
