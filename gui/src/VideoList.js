import { useEffect, useState } from 'react';
import store from './VideoStore'
import VideoAddForm from './VideoAddForm'
import Video from './Video'

function VideoList() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    store.getVideos()
    store.emitter.addListener('GET_VIDEOS_SUCCESS', () => {
      // fetching the videos 
      setVideos(store.data)
    })
  }, [])

  const addVideo = (video) => {
    store.addVideo(video)
  }

  const deleteVideo = (id) => {
    store.deleteVideo(id)
  }

  const saveVideo = (id, video) => {
    store.saveVideo(id, video)
  }

  return (
    <div>
      <h1 className='headers'>List of Videos</h1>
      {
        videos.map(e => <Video key={e.id} item={e} onDelete={deleteVideo} onSave={saveVideo} />)
      }
      <VideoAddForm onAdd={addVideo} />
    </div>
  );
}

export default VideoList;