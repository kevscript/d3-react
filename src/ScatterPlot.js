import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

const Circle = styled.circle`
  fill: steelblue;
  stroke: blue;
  stroke-width: 2px;
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    fill: red;
    stroke: red;
    opacity: 0.9;
  }
`

const Tooltip = styled.foreignObject`
  text-align: left;
  overflow: visible;
`

const Svg = styled.svg`
  overflow: visible;
`

const ScatterPlot = ({data, width, height, padding, xData, yData}) => {
  const [tooltip, setTooltip] = useState(null)

  const xAxis = useRef(null)
  const yAxis = useRef(null)

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xData))
    .range([padding, width - padding])

  const yScale = d3.scaleTime()
    .domain(d3.extent(data, yData))
    .range([height - padding, padding])

  useEffect(() => {
    d3.select(xAxis.current).call(d3.axisBottom(xScale))
    d3.select(yAxis.current).call(d3.axisLeft(yScale))
  }, [])
  

  return (
    <Svg width={width} height={height}>
      <g>
        {
          data && data.map((d, i) => {
            return (
              <Circle 
                key={i} 
                cx={xScale(xData(d))} 
                cy={yScale(yData(d))} 
                r={5} 
                onMouseOver={() => setTooltip(d)}
                onMouseOut={() => setTooltip(null)}
              />
            )
          })
        }
      </g>
      <g ref={xAxis} transform={`translate(0, ${height - padding})`}></g>
      <g ref={yAxis} transform={`translate(${padding}, 0)`}></g>
      {
        tooltip && 
          <Tooltip x={xScale(tooltip.high) + 10} y={yScale(tooltip.date) - padding - 8} height={1} width={1}>
            <h5>{tooltip.date.toLocaleDateString()}</h5>
          </Tooltip>
      }
    </Svg>
  )
}

export default ScatterPlot