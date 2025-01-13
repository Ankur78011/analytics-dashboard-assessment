import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Label } from 'recharts';
import { useSelector } from 'react-redux';
import Heading from '../Heading/Heading';
import './ElectricVehicleDistribution.css'

const aggregateData = (data, region) => {
  const aggregation = {};

  data.forEach((item) => {
    const regionName = item[region]; 
    if (regionName) {
      aggregation[regionName] = aggregation[regionName] ? aggregation[regionName] + 1 : 1;
    }
  });

  
  return Object.keys(aggregation).map((key) => ({
    name: key,
    count: aggregation[key],
  }));
};

const ElectricVehicleDistribution = () => {
  const { data } = useSelector((state) => state.evData);

  const regionToAnalyze = "City"; 
  const chartData = aggregateData(data, regionToAnalyze);

  const top5Cities = [...chartData]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className='main-container'>
    <Heading text={`Electric Vehicle Distribution by ${regionToAnalyze}`}></Heading>
      <p>This bar chart shows the distribution of electric vehicles across states, counties, or cities, highlighting areas with higher EV concentrations for easy comparison and analysis.</p>
      <ResponsiveContainer width="100%" height="60%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      
      <h3>Top 5 Cities with the Most Electric Vehicles</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>City</th>
            <th >EV Count</th>
          </tr>
        </thead>
        <tbody>
          {top5Cities.map((city, index) => (
            <tr key={index}>
              <td >{city.name}</td>
              <td >{city.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElectricVehicleDistribution;
