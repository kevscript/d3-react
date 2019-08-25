import React from 'react'
import * as d3 from 'd3'
import chroma from 'chroma-js'

const width = 650;
const height = 450;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class Chart extends React.Component {
  state = {
    bars: []
  }

  static getDerivedStateFromProps(props, state) {
    const { data } = props
    if (!data) return {}

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

    const bars = data.map(d => {
      return {
        x: xScale(d.date),
        y: yScale(d.high),
        height: yScale(d.low) - yScale(d.high),
        fill: colorScale(d.avg)
      }
    })

    return { bars }
  }

  render() {
    return (
      <svg width={width} height={height}>
        {
          this.state.bars.map((d, i) =>
            <rect key={i} x={d.x} y={d.y} width={2} height={d.height} fill={d.fill} />
          )
        }
      </svg>
    )
  }
}

export default Chart