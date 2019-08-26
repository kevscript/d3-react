import React, { useState, useEffect } from 'react'
import Chart from './Chart'
import FunChart from './FunChart'

const App = () => {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('am.json')
      .then(res => res.json())
      .then(json => json.map(day => {
        return {
          ...day,
          date: new Date(day.date)
        }
      }))
      .then(result => setData(result))
  }, [])

  return (
    <div>
      {data && 
        <div>
          <Chart data={data} />
          <FunChart data={data} />
        </div>
      }
    </div>
  );
}

export default App