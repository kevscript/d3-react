import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

const width = 650;
const height = 450;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

const FunLineChart = ({data}) => {

  const [lines, setLines] = useState({})

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

      const lineGenHigh = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.high))
  
      const lineGenLow = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.low))
  
      const newLines = {
        high: lineGenHigh(data),
        low: lineGenLow(data)
      }
  
      renderAxis(xScale, yScale)
      setLines(newLines)
    }

  }, [data])

  
  return (
    <svg width={width} height={height}>
      <path d={lines.high} fill='none' stroke='red' strokeWidth='1'/>
      <path d={lines.low} fill='none' stroke='blue' strokeWidth='1'/>
      <g ref={xAxis} transform={`translate(0, ${height - margin.bottom})`}></g>
      <g ref={yAxis} transform={`translate(${margin.left}, 0)`}></g>
    </svg>
  )
}

export default FunLineChart