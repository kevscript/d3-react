import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Chart from './Chart'
import FunChart from './FunChart'

const initialState = {
  'amsterdam': [],
  'new york': [],
  'san francisco' : []
}

const ChartContainer = styled.div`
  border: 1px solid rgba(0,0,0,0.3);
  display:inline-block;
  text-align: center;
  padding: 20px;
  margin: 20px;
`

const App = () => {

  const [data, setData] = useState(initialState)
  const [selected, setSelected] = useState(`${Object.keys(initialState)[0]}`)
  const [city, setCity] = useState(null)

  const fetchCities = async () => {
    const am = await axios('am.json')
    const ny = await axios('ny.json')
    const sf = await axios('sf.json')

    Promise.all([am, ny, sf])
      .then(cities => cities.map(city => {
        return city.data.map(day => day.date = new Date(day.date))
      }))
      .then(() => setData({
        'amsterdam': am.data, 
        'new york': ny.data, 
        'san francisco': sf.data
      }))
      .then(() => setCity(am.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchCities()
  }, [])

  const selectCity = (e) => {
    setSelected(e.target.value)
    setCity(data[selected])
  }

  return (
    <div>
      <label htmlFor="cities">Select a city: </label>
      <select name='cities' onChange={selectCity}>
        {Object.keys(data).map((key, i) => {
          return <option key={i} value={`${key}`}>{`${key}`}</option>
        })}
      </select>
      {city && 
        <div>
          <ChartContainer>
            <h5>Class component Bar Chart for {`${selected}`}</h5>
            <Chart data={data[selected]} />
          </ChartContainer>
          <ChartContainer>
            <h5>Functional component Bar Chart for {`${selected}`}</h5>
            <FunChart data={data[selected]} />
          </ChartContainer>
        </div>
      }
    </div>
  );
}

export default App