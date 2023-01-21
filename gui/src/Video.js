import { useState } from 'react'
import './Video.css'

function Video (props) {
    const { item, onDelete, onSave } = props
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(item.title)
    const [content, setContent] = useState(item.content)

    const deleteVideo = (evt) => {
        onDelete(item.id)
    }

    const saveVideo = (evt) => {
        onSave(item.id, {
            title,
            content
        })
        setIsEditing(false)
    }

    const edit = () => {
        setIsEditing(true)
    }

    const cancel = () => {
        setIsEditing(false)
    }

    return (
        <div>
        {
            isEditing
                ? (
                    <>
                        <div className="divElements">
                            Video Title: <input className="inputs2" type='text' value={title} onChange={(evt) => setTitle(evt.target.value)} /> 
                            / URL: <input className="inputs2" type='text' value={content} onChange={(evt) => setContent(evt.target.value)} />
                            <input className='buttons' type='button' value='Save' onClick={saveVideo} />
                            <input className='buttons' type='button' value='Cancel' onClick={cancel} />
                        </div>
                    </>

                ) : (
                    <>
                        <div className="divElements">
                            Video Title: <span className="title">{item.title}</span> / URL: <span className='title'>{item.content}</span>
                            <input className='buttons' type='button' value='Delete' onClick={deleteVideo} />
                            <input className='buttons' type='button' value='Edit' onClick={edit} />
                        </div>  
                    </>
                    
                )
        }
        </div>
    )
}

export default Video