import './styles/App.css';
import React from 'react'
import Controls from './Controls'

function draw(ctx, { x, y, brush }) {
  const { color, height, width } = brush
  ctx.fillStyle = color
  ctx.fillRect(x - 4, y - 28, height, width)
}

function App() {
  const [strokes, setStrokes] = React.useState([])
  const [undoables, setUndoables] = React.useState([])
  const [brush, setBrush] = React.useState({ color: "#FFFFFF", height: 10, width: 10 })
  const [mouseDown, setMouseDown] = React.useState(false)
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    strokes.forEach(stroke => draw(ctx, stroke))
  })

  function handleCanvasClick(e) {
    const newStroke = { x: e.clientX, y: e.clientY, brush: brush }
    switch (e.type) {
      case "mousedown":
        setMouseDown(true)
        setStrokes([...strokes, newStroke])
        setUndoables([...undoables, [newStroke]])
        break;
      case "mousemove":
        if (mouseDown) {
          setStrokes([...strokes, newStroke])
          setUndoables([...undoables.slice(0, -1), undoables[undoables.length - 1].concat([newStroke])])
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
    setStrokes([])
  }

  function handleUndo() {
    setStrokes(strokes.filter(el => !undoables[undoables.length - 1].includes(el)))
    setUndoables(undoables.slice(0, -1))
  }

  return (
    <>
      <Controls
        handleClear={handleClear}
        handleUndo={handleUndo}
        brush={brush}
        setBrush={setBrush}
      />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleCanvasClick}
        onMouseMove={handleCanvasClick}
        onMouseUp={handleCanvasClick}
      />
    </>
  )
}

export default App