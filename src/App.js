import React, { useState, useEffect } from 'react'
import Chart from './Chart'

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
      {data && <Chart data={data} />}
    </div>
  );
}

export default App