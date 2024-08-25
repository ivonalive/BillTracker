import React from 'react';
import './AboutPage.css'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2> ~ Overview ~ </h2>
        BillTracker is an easy-to-use tool designed to help you track your 
        bills, prevent subscription cancellations, and avoid bank overdraft 
        fees. It also helps reduce stress by giving you a clear view of 
        how much you have left to spend on luxuries, investments, and dining 
        out.
      </div>

      <div>
      <h2> ~ Features ~</h2>

      <h3>~Add bill~</h3> 
      <p>Allows users to add new bills by entering details 
      like bill name, amount, due date, payment link, and payment method.</p>

      <h3>~Edit bill~</h3>
      <p> Allow users to update existing bill details, such as
         changing the bill name, amount, due date, payment link and adjust 
         any recurring payment settings.</p>

      <h3>~Delete bill~</h3>
       <p>Allows users to remove bills that are no longer relevant.</p>
      </div>

      <div>
        <h2> ~ User Benefits ~</h2>
        
         <p>~	Stay organized with all your bills in one place.</p> 
         <p>~	Avoid late fees by receiving timely reminders.</p> 
         <p>~	Track your expenses and budget more effectively.</p>
      </div>

      <div>
        <h2>~ User Testimonials ~</h2>

        <p>What should we keep adn what can we better?</p>
        <p>billtracker.feedback@gmail.com</p>
      </div>

      {/* <div>
        <h2> ~  ~</h2>
      </div> */}
    </div>
  );
}

export default AboutPage;
