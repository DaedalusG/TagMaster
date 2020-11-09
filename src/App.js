import './App.css';
import React from 'react'

function draw(ctx, location, color) {
  ctx.fillStyle = color
  ctx.fillRect(location.x, location.y, 10, 10)
}

function App() {
  const [locations, setLocations] = React.useState([])
  const [undoables, setUndoables] = React.useState([])
  const [color, setColor] = React.useState('black')
  const [mouseDown, setMouseDown] = React.useState(false)
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    locations.forEach(location => draw(ctx, location, color))
  })

  function handleCanvasClick(e) {
    const newLocation = { x: e.clientX, y: e.clientY }
    switch (e.type) {
      case "mousedown":
        setMouseDown(true)
        setLocations([...locations, newLocation])
        setUndoables([newLocation])
        break;
      case "mousemove":
        if (mouseDown) {
          setLocations([...locations, newLocation])
          setUndoables([...undoables, newLocation])
        }
        break;
      case "mouseup":
        setMouseDown(false)
        break;
      default:
        break;
    }

  }

  function handleClear() {
    setUndoables([])
    setLocations([])
  }

  function handleUndo() {
    setLocations(locations.filter(el => !undoables.includes(el)))
  }

  return (
    <>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleUndo}>Undo</button>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleCanvasClick}
        onMouseMove={handleCanvasClick}
        onMouseOut={handleCanvasClick}
        onMouseUp={handleCanvasClick}
      />
    </>
  )
}

export default App