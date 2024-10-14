export const fetchBills = () => (dispatch) => {
    // Replace this with your actual API call
    fetch('/api/bill')
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'SET_BILLS', payload: data });
      })
      .catch(error => {
        console.error('Error fetching bills:', error);
      });
  };