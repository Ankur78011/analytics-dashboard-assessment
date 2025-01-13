import './App.css';
import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { setEvData, setLoading, setError } from './features/evDataSlice.js';
import { fetchEvData } from './utils/fetchEvData.js';
import Box from '@mui/material/Box';
import ElectricVehicleDistribution from './components/BarGraph/ElectricVehicleDistribution.js';
import ScatterPlot from './components/ScatterPlot/ElectricVehicleScatterPlot.js';
import ElectricVehiclePieChart from './components/PieChart/ElectricVehiclePieChart.js';
import EvImg from './assests/ev-icon.png'


function App() {
  const dispatch = useDispatch();
  const csvPath = 'https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/refs/heads/main/data-to-visualize/Electric_Vehicle_Population_Data.csv';
 useEffect(() => {
    const loadData = async () => {
      dispatch(setLoading(true));
      try {
        const evData = await fetchEvData(csvPath);
        dispatch(setEvData(evData));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadData();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
  
      <div
         className='side-bar-main-div'
        >
          <div className='icon-div'>
          <img src={EvImg} alt="ev img"/>
          
          </div>


          <div className='tab-div'>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
           View Table
          </Link>
          </div>
          <div className='tab-div'> <Link to={'/BrandVsAverage'} style={{ textDecoration: 'none' }}>
          EV Brands & Range<br/> (Scatter plot)
          </Link></div>
          <div className='tab-div'> <Link to={'/EVDistributionByCity'} style={{ textDecoration: 'none' }}>
          EV Distribution by City<br/> (Bar Graph)
          </Link></div>
          <div className='tab-div'> <Link to={'/TopManufacturers'} style={{ textDecoration: 'none' }}>
          Top Manufacturers<br/> (Pie Chart)
          </Link>
          </div>
        </div>
   
       

        <Box sx={{ marginLeft: '250px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/EVDistributionByCity" element={<ElectricVehicleDistribution />} />
            <Route path='/BrandVsAverage' element={<ScatterPlot/>}></Route>
            <Route path='/TopManufacturers' element={<ElectricVehiclePieChart/>}></Route>
          </Routes>
        </Box>
      </Router>
    </div>
  );
}

export default App;
