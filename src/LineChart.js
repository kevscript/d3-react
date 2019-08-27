import React from 'react'
import * as d3 from 'd3'
import chroma from 'chroma-js'

const width = 650;
const height = 450;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class LineChart extends React.Component {
  state = {
    scales: {},
    lines: {}
  }

  xAxis = React.createRef()
  yAxis = React.createRef()

  renderAxis = (scaleX, scaleY) => {
    const axisX = d3.axisBottom(scaleX).tickFormat(d3.timeFormat('%b'))
    const axisY = d3.axisLeft(scaleY)
    d3.select(this.xAxis.current).call(axisX)
    d3.select(this.yAxis.current).call(axisY)
  }

  static getDerivedStateFromProps(props, state) {
    const { data } = props
    if (!data) return {}

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

    const lines = {
      high: lineGenHigh(data),
      low: lineGenLow(data)
    }

    const scales = {
      xScale,
      yScale
    }

    return { lines, scales }
  }

  componentDidMount() {
    const { scales } = this.state
    this.renderAxis(scales.xScale, scales.yScale)
  }

  componentDidUpdate() {
    const { scales } = this.state
    this.renderAxis(scales.xScale, scales.yScale)
  }


  render() {
    return (
      <svg width={width} height={height}>
        <path d={this.state.lines.high} fill='none' stroke='red' strokeWidth='1'/>
        <path d={this.state.lines.low} fill='none' stroke='blue' strokeWidth='1'/>
        <g ref={this.xAxis} transform={`translate(0, ${height - margin.bottom})`}></g>
        <g ref={this.yAxis} transform={`translate(${margin.left}, 0)`}></g>
      </svg>
    )
  }
}

export default LineChart