import React from 'react'
import ReactDom from 'react-dom'
import Draggable from 'react-draggable';

const Controls = (props) => {
    const { handleClear, handleUndo, brush, setBrush } = props

    const selectColor = (e) => {
        setBrush({
            color: e.target.value,
            height: brush['height'],
            width: brush['width']
        })
    }

    return ReactDom.createPortal(
        <Draggable>
            <div className="controls_container">
                <img className="test_image" src={"https://i.guim.co.uk/img/media/22bed68981e92d7a9ff204ed7d7f5776a16468fe/1933_1513_3623_2173/master/3623.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b7545d644ba9f6bcc673a8bdf6d7db83"} alt="alt" />
                <button onClick={handleClear}>Clear</button>
                <button onClick={handleUndo}>Undo</button>
                <input
                    type="color"
                    value={brush['color']}
                    onChange={selectColor}
                />
            </div>
        </Draggable>,
        document.getElementById('controls')
    )
}

export default Controls