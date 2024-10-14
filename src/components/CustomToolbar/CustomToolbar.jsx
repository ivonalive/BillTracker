import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import '../UserPage/UserPage.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { fetchBills } from '../../redux/actions/billActions'; // Adjust the path as needed

const CustomToolbar = (toolbar) => {
  const dispatch = useDispatch();
  const bills = useSelector((store) => store.bills);
  const [dateRange, setDateRange] = useState([null, null]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

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
      return `Current Month - ${moment(toolbar.date).format('MMMM YYYY')}`;
    }
    return moment(toolbar.date).format('MMMM YYYY');
  };

  const isToday = moment(toolbar.date).isSame(moment(), 'day');
  const isCurrentMonth = moment(toolbar.date).isSame(moment(), 'month');

  useEffect(() => {
    console.log('Date Range:', dateRange);
    console.log('Bills:', bills);
  
    if (dateRange[0] && dateRange[1] && bills.length > 0) {
      const startDate = dayjs(dateRange[0]).startOf('day');
      const endDate = dayjs(dateRange[1]).endOf('day');
  
      console.log('Start Date:', startDate.format());
      console.log('End Date:', endDate.format());
  
      const filteredBills = bills.filter(bill => {
        const billDate = dayjs(bill.date);
        console.log('Bill Date:', billDate.format(), 'Amount:', bill.bill_amount); // Changed from bill.amount to bill.bill_amount
        const isIncluded = (billDate.isAfter(startDate) || billDate.isSame(startDate, 'day')) &&
                           (billDate.isBefore(endDate) || billDate.isSame(endDate, 'day'));
        console.log('Is Included:', isIncluded);
        return isIncluded;
      });
  
      console.log('Filtered Bills:', filteredBills);
  
      const total = filteredBills.reduce((sum, bill) => sum + Number(bill.bill_amount || 0), 0); // Changed from bill.amount to bill.bill_amount
      console.log('Calculated Total:', total);
  
      setTotalAmount(total);
    }
  }, [dateRange, bills]);

  const handleDateRangeChange = (index, newDate) => {
    setDateRange(prevRange => {
      const newRange = [...prevRange];
      newRange[index] = newDate;
      return newRange;
    });
  };

  return (
    <div className="custom-toolbar">
      <div className="toolbar-content">
        <center>
          <button onClick={goToBack}>Back</button>
          
          {isCurrentMonth && !isToday && (
            <button className="toolbar-label" onClick={goToToday}>
              Today
            </button>
          )}

          <span>{label()}</span>
          
          <button onClick={goToNext}>Next</button>
        </center>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker 
            label="Start Date"
            value={dateRange[0]}
            onChange={(newValue) => handleDateRangeChange(0, newValue)}
          />
          <DatePicker 
            label="End Date"
            value={dateRange[1]}
            onChange={(newValue) => handleDateRangeChange(1, newValue)}
          />
        </DemoContainer>
      </LocalizationProvider> 
      {dateRange[0] && dateRange[1] && (
        <div>
          Total amount in selected period: ${totalAmount.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default CustomToolbar;