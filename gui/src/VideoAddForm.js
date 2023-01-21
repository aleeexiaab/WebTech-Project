import { useState } from "react"

function VideoAddForm (props) {
    const { onAdd } = props
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const add = (evt) => {
        onAdd({
            title,
            content
        })
    }

    return (
        <div>
            <h3 className="headers">Add a video</h3>
            <div>
                <input className="inputs" type='text' placeholder='Title...' onChange={(evt) => setTitle(evt.target.value)} />
            </div>
            <div>
                <input className="inputs" type='text' placeholder='Link...' onChange={(evt) => setContent(evt.target.value)} />
            </div>
            <div>
                <input id="addVideo" type='button' value='Add video' onClick={add} />
            </div> 
        </div>
    )
}

export default VideoAddForm