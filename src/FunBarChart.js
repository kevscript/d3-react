import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

const width = 650;
const height = 450;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

const FunBarChart = ({data}) => {

  const [bars, setBars] = useState([])

  const xAxis = useRef(null)
  const yAxis = useRef(null)
  
  const renderAxis = (scaleX, scaleY) => {
    const axisX = d3.axisBottom(scaleX).tickFormat(d3.timeFormat('%b'))
    const axisY = d3.axisLeft(scaleY)
    d3.select(xAxis.current).call(axisX)
    d3.select(yAxis.current).call(axisY)
  }

  useEffect(() => {
    if (data) {

      const xScale = d3.scaleTime()
        .domain([
          d3.min(data, d => d.date),
          d3.max(data, d => d.date)
        ])
        .range([margin.left, width - margin.right])

      const yScale = d3.scaleLinear()
        .domain([
          d3.min(data, d => d.low),
          d3.max(data, d => d.high)
        ])
        .range([height - margin.bottom, margin.top])

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

      renderAxis(xScale, yScale)
      setBars(newBars)
    }

  }, [data])

  
  return (
    <svg width={width} height={height}>
      <g>
        {
          bars.map((d, i) =>
            <rect key={i} x={d.x} y={d.y} width={2} height={d.height} fill={d.fill} />
          )
        }
      </g>
      <g ref={xAxis} transform={`translate(0, ${height - margin.bottom})`}></g>
      <g ref={yAxis} transform={`translate(${margin.left}, 0)`}></g>
    </svg>
  )
}

export default FunBarChart