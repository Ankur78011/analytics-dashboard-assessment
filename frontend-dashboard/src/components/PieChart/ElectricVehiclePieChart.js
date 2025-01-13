import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import './ElectricVehiclePieCharts.css'
import Heading from '../Heading/Heading';

const COLORS = [
    '#FF5733', 
    '#33FF57', 
    '#3357FF',
    '#FFD700',
    '#8A2BE2',
    '#FF1493', 
    '#00CED1', 
    '#FF4500', 
    '#800080', 
    '#98FB98' 
  ];

const CarMakePieChart = () => {
  const { data } = useSelector((state) => state.evData);

  
  const processData = (data) => {
    const makeCount = data.reduce((acc, car) => {
      acc[car.Make] = (acc[car.Make] || 0) + 1;
      return acc;
    }, {});

    const sortedData = Object.entries(makeCount)
      .map(([make, count]) => ({ name: make, value: count }))
      .sort((a, b) => b.value - a.value);

    return sortedData;
  };

  
  const getTopNData = (data, topN = 5) => {
    const topData = data.slice(0, topN);
    const otherData = data.slice(topN).reduce((acc, curr) => {
      acc.value += curr.value;
      return acc;
    }, { name: 'Other', value: 0 });

    if (otherData.value > 0) topData.push(otherData);
    return topData;
  };

  const aggregatedData = processData(data);
  const topNData = getTopNData(aggregatedData, 5); 

  return (
    <div>
    <Heading text={'EV Makes Distribution: Top Manufacturers'}></Heading>
      
      
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={topNData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label
          >
            {topNData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      
      <div  className='table-div'>
        <table className='table'>
          <thead>
            <tr>
              <th >Make</th>
              <th >Count</th>
            </tr>
          </thead>
          <tbody>
            {topNData.map((entry, index) => (
              <tr key={index}>
                <td >{entry.name}</td>
                <td >{entry.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarMakePieChart;
