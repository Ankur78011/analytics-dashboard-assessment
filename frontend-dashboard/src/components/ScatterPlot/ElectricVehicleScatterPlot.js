import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import Heading from '../Heading/Heading';
import './ElectricVehicleScatterPlot.css'
const ScatterPlot = () => {
  const { data } = useSelector((state) => state.evData);
  const filteredData = data.filter(item => parseInt(item["Electric Range"]) > 0);

  const makeMap = new Map();
  const colorMap = new Map();
  const colorPalette = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#A52A2A', '#800080', '#808000',
    '#FF6347', '#FF4500', '#2E8B57', '#3CB371', '#228B22', '#20B2AA', '#5F9EA0', '#D2691E', '#8B0000', '#FF1493',
    '#C71585', '#DC143C', '#B8860B', '#A9A9A9', '#A0522D', '#800000', '#8B008B', '#800080', '#6A5ACD', '#7B68EE',
    '#8B4513', '#A52A2A', '#D2B48C', '#FAEBD7', '#FFDEAD', '#F0E68C', '#FFD700', '#ADFF2F', '#90EE90', '#32CD32',
    '#98FB98', '#8FBC8F', '#00FA9A', '#66CDAA', '#3CB371', '#2E8B57', '#006400', '#008000', '#228B22', '#00FF7F'
  ];

  let colorIndex = 0; 

  filteredData.forEach(item => {
    const make = item.Make;
    const electricRange = parseInt(item["Electric Range"]);

    if (!makeMap.has(make)) {
      makeMap.set(make, { totalRange: 0, count: 0 });
    }

    if (!colorMap.has(make)) {
      
      colorMap.set(make, colorPalette[colorIndex % colorPalette.length]);
      colorIndex++;
    }

    const current = makeMap.get(make);
    current.totalRange += electricRange;
    current.count += 1;
  });

  const averageData = Array.from(makeMap, ([make, { totalRange, count }]) => ({
    model: make,
    electricRange: (totalRange / count).toFixed(2)
  }));



  averageData.sort((a, b) => parseFloat(b.electricRange) - parseFloat(a.electricRange));

  const top5 = averageData.slice(0, 5);
  const bottom5 = averageData.slice(-5);

  return (
    <div>
    <Heading text={'EV Car Brand vs. Average Electric Range'}></Heading>

      <p>This graph represents various EV brands and respective average ranges</p>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="model" name='Model' tick={false} />
          <YAxis dataKey="electricRange" name="Electric Range (miles)" unit="mi" domain={[0, 300]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Average Electric Range" data={averageData}>
            {averageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorMap.get(entry.model)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div  className='main-container-table'>

        <div className='table-div'>
          <h3>Top 5 Brands with highest range</h3>
          <table className='table'>
            <thead>
              <tr>
                <th >Brand</th>
                <th >Avg. Electric Range (mi)</th>
              </tr>
            </thead>
            <tbody>
              {top5.map((entry, index) => (
                <tr key={index}>
                  <td style={{ display:'flex',alignItems:'center',gap:'10px' }} ><div style={{height:'10px',width:'10px',backgroundColor:`${colorMap.get(entry.model)}`,borderRadius:'50%'}}></div>{entry.model}</td>
                  <td>{entry.electricRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='table-div'>
          <h3>Bottom 5 Brands with lowest range</h3>
          <table className='table'>
            <thead>
              <tr>
                <th >Brand</th>
                <th >Avg. Electric Range (mi)</th>
              </tr>
            </thead>
            <tbody>
              {bottom5.map((entry, index) => (
                <tr key={index}>
                  <td style={{ display:'flex',alignItems:'center',gap:'10px' }}> <div style={{height:'10px',width:'10px',backgroundColor:`${colorMap.get(entry.model)}`,borderRadius:'50%'}}></div>{entry.model}</td>
                  <td>{entry.electricRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScatterPlot;
