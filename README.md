# How to build Charts in React

### Stateful Component

#### 1. in static lifecycle `getDerivedStateFromProps()` :
  - retrieve data from props
  - if there is no data (yet), just _return_ an empty object
  - create your scales functions
  - compute chartData (process dependent on the type of chart used)
  - return an object containing the scale functions and the chartData, which will store them in state (don't forget to initiate it)

#### 2. axis creation :
  - `createRef()` for both axis referencing two _`<g></g>`_ elements.
  - create an axis drawing method that will link the refs to the axis data:

  ```javascript
  // get scales from state
  renderAxis = (scaleX, scaleY) => {
    const axisX = d3.axisBottom(scaleX)
    const axisY = d3.axisLeft(scaleY)
    d3.select(this.xAxis.current).call(axisX)
    d3.select(this.yAxis.current).call(axisY)
  }
  ```
  - execute the function in both `componentDidMount()_` and `componentDidUpdate()_` lifecycle methods.
  
  ### Functional Component (Hooks)

  1. refactor the class component logic with hooks
  2. `useState()` only for chartData
  3. `useRef()` for axis elements
  4. create same renderAxis function
  4. `useEffect()` replaces all lifecycles for chart logic and axis rendering
