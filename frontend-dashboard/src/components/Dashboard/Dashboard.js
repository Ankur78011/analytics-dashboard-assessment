import React, { useState } from 'react';
import './Dashboard.css';
import {  useSelector } from 'react-redux';
import { TablePagination } from '@mui/material';
import { TableColumn } from '../../constants.js';
import Heading from '../Heading/Heading.js';

const Dashboard = () => {
  const { data } = useSelector((state) => state.evData);

  const [page, setPage] = useState(0); 

  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const displayedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  return (

    <div> 
    <Heading text={'Electric Vehicle Population Data'}></Heading>
      <div className='table-container'>
   
    <table className="table">
      <thead>
        <tr>
          {TableColumn.map((elem, index) => (
            <th key={index}>{elem}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayedData.map((row, index) => (
          <tr key={index}>
          <td>{row['VIN (1-10)']}</td>
            <td>{row['County']}</td>
            <td>{row['City']}</td>
            <td>{row['State']}</td>
            <td>{row['Postal Code']}</td>
            <td>{row['Model Year']}</td>
            <td>{row['Make']}</td>
            <td>{row['Model']}</td>
            <td>{row['Electric Vehicle Type']}</td>
            <td>{row['Clean Alternative Fuel Vehicle (CAFV) Eligibility']}</td>
            <td>{row['Electric Range']}</td>
            <td>{row['Base MSRP']}</td>
            <td>{row['Legislative District']}</td>
            <td>{row['DOL Vehicle ID']}</td>
            <td>{row['Vehicle Location']}</td>
            <td>{row['Electric Utility']}</td>
            <td>{row['2020 Census Tract']}</td>
          </tr>
        ))}
      </tbody>
    </table>   
  </div>
  <div>
  <TablePagination
      rowsPerPageOptions={[10, 25, 50, 100]}
      component="div"
      count={data.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </div>

    </div>
   
  );
};

export default Dashboard;
