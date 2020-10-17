import { useState, useEffect } from 'react';

import React from 'react';

import tick from './images/tick.png';
import bin from './images/bin.png';
import save from './images/save.png';

const Orders = () => {
  const url = 'https://storybook-backend.herokuapp.com/orders';
  // setData will update data variable using useState
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // retrieve enquiries from backend, assign to data variable
  useEffect(() => {
    setIsLoading(true);
    fetch(url, {
        method: 'GET', 
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
      })
      .then((json) => {
        //console.log(json); // The json object is here
        setData(json);
        setIsLoading(false);
      });  
  }, []);
//}, [data]);

  // function to mark enquiries as "read". All enquiries are initially set as read:"false".
  // This function creates a copy of the data retrieved from the database. When the rowid matches
  // the rowid of the data, read is marked as "true"
  function readEnquiry(rowid) {
    const updatedData = data.map(data =>
      // read: "true" rather than true as sqlite does not accept booleans
      // this can now be changed to boolean as postgressql accepts booleans
      data.rowid === rowid ? { ...data, read: 'true' } : data
    );
    setData(updatedData);
  }

  // function to delete an enquiry. It returns all the enquiries except
  // for the enquiry with the rowid selected by the user
  function deleteEnquiry(rowid) {
    const filteredData = data.filter(data => data.rowid !== rowid);
    setData(filteredData);
  }

  // function to send any changes to the enquiries to the backend
  function saveChanges() {
    fetch(`https://storybook-backend.herokuapp.com/update-orders`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
    });
  }

  // SortableEnquiry inherits the features of SortableElement from react-sortable-hoc,
  // allowing it to be dragged and dropped. It displays each enquiry and has 2 buttons
  // to mark as read and to delete the enquiry
  function SortableEnquiry(props) {
    const values = props.values;
     return(
      <div className='enquiry-card-container'>
     { values.map((value, index) => (
     <div key={value.rowid}
     className={`enquiry-card${value.read === 'true' ? ' read' : ''}`}>
              <div className='enquiryButtonWrapper'>
          <button className='enquiryButton' type='button' onClick={()=>readEnquiry(value.rowid)}>
            <img src={tick}  className='buttonIcon' alt='tick' />
          </button>
          <button
            className='enquiryButton'
            type='button'
            onClick={()=>deleteEnquiry(value.rowid)}
          >
            <img src={bin} className='buttonIcon' alt='bin' />
          </button>
        </div>
        <p className='enquiry-header'>Order date: {value.date}</p>
        <p className='enquiry-header'>Order ID: {value.orderid}</p>
        <hr></hr>
        <p className='enquiry-footer'>Delivery:</p>
        <p>{value.delname}</p>
        <p>{value.address}</p>
        <p>{value.postcode}</p>
        <p>{value.email}</p>
        <hr></hr>
        <p className='enquiry-footer'>Story:</p>
        <p>{value.story}</p>
        <p>{value.type}</p>
        <p>{value.charname}</p>
        <p>{value.avatar}</p>
        <hr></hr>
        <p className='enquiry-footer'>Payment:</p>
        <p>Paid: {value.paid}</p>
        <p>{value.paymentintentid}</p>
        <p> Card: {value.brand} {value.last4}</p>
      </div>
      )
    ) }
    </div>
     );
  }
  
  return (
    <div id='orders'>
      <h1>Orders</h1>
      <h4>
        Tick orders to mark as read. Bin to delete
      </h4>
      <button onClick={saveChanges} className='enquiry-save'>
        {' '}
        <img src={save} className='buttonIcon' alt='save' /> Save
        changes
      </button>
      {isLoading ? (
        <div className='loader'></div>
      ) : (
        <SortableEnquiry
          values={data}
        />
      )}
    </div>
  );
};

export default Orders;