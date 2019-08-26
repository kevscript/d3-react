import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'

const width = 650;
const height = 450;

const FunChart = ({data}) => {

  const [bars, setBars] = useState([])

  useEffect(() => {
    if (data) {

      const xScale = d3.scaleTime()
        .domain([
          d3.min(data, d => d.date),
          d3.max(data, d => d.date)
        ])
        .range([0, width])

      const yScale = d3.scaleLinear()
        .domain([
          d3.min(data, d => d.low),
          d3.max(data, d => d.high)
        ])
        .range([height, 0])

      const colorExtent = d3.extent(data, d => d.avg).reverse()
      const colorScale = d3.scaleSequential().domain(colorExtent).interpolator(d3.interpolateRdYlBu)

      const newBars = data.map(d => {
        return {
          x: xScale(d.date),
          y: yScale(d.high),
          height: yScale(d.low) - yScale(d.high),
          fill: colorScale(d.avg)
        }
      })

      setBars(newBars)
    }

  }, [data])

  
  return (
    <svg width={width} height={height}>
      {
        bars.map((d, i) =>
          <rect key={i} x={d.x} y={d.y} width={2} height={d.height} fill={d.fill} />
        )
      }
    </svg>
  )
}

export default FunChart