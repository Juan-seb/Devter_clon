import { addDevit, uploadImages } from '@fbs/client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Button from 'components/Button'
import Image from 'next/image'
import Link from 'next/link'
import useUser from 'hooks/useUser'
import ImagePreview from 'components/ImagePreview'

const STATES_DEVIT = {
  creating: 'creating',
  complete: 'complete',
  error: 'error'
}

const DRAG_IMAGE_STATES = {
  ERROR: 'error',
  MAX_CAPACITY: 'Maxima capacidad alcanzada',
  ERROR_FILES: 'Solo puedes subir imagenes',
  NONE: 'none',
  DRAG_OVER: 'drag_over',
  UPLOADING: 'uploading',
  COMPLETE: 'complete'
}

const SpaceDevit = ({ src, alt }) => {

  const user = useUser()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [statusDevit, setStatusDevit] = useState(STATES_DEVIT.creating)
  const [image, setImage] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  useEffect(() => {
    if (task) {
      task.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        
      }
    );
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatusDevit(STATES_DEVIT.complete)

    if (message.length === 0) return

    const { displayName, photoURL, uid } = user

    addDevit({
      avatar: photoURL,
      content: message,
      userName: displayName,
      userID: uid
    }).then(() => {
      // If the operation is successful then redirect to HOME

      setTimeout(() => {
        router.push('/home')
      }, 0)

    }).catch(() => {
      setStatusDevit(STATES_DEVIT.error)
    })

  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()

    let regexFiles = /^.*\.(jpg|JPG|gif|GIF|png|PNG)$/
    const data = e.dataTransfer.files
    const imageFiles = []
    const imageURL = []
    
    /* const taskResult = uploadImages(e.dataTransfer.files[0])

    setTask(taskResult) */
    
    // If the lenght of the files is greather than four the return.
    if (data.length > 4) {
      setDrag(DRAG_IMAGE_STATES.MAX_CAPACITY)
      return
    }

    for (const key in data) {

      const file = data[key]

      // Validate that the file is allowed otherwise is not allowed to continue
      if (!regexFiles.exec(file.name)){
        setDrag(DRAG_IMAGE_STATES.MAX_CAPACITY)
        return
      }

      const fileURL = URL.createObjectURL(file)

      imageFiles = [...imageFiles, file]
      imageURL = [...imageURL, fileURL]

      setImage(imageFiles)
      setPreviewURL(imageURL)

      console.log(file)

    }

    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const isButtonDisabled = message.length === 0 || statusDevit === STATES_DEVIT.complete
  const stylesTextArea = (drag === DRAG_IMAGE_STATES.DRAG_OVER) ? 'border-dashed border-blue-300 border-2' : 'border-solid border-transparent border-2'

  if (!user) {
    return (
      <>Cargando....</>
    )
  }

  return (
    <article className="flex px-4">
      {/*  <header className="w-full h-10">
        <Link href="/home">Volver al home</Link>
      </header> */}
      <div className="w-10">
        <Image
          src={user.photoURL}
          alt={alt}
          width={40}
          height={40}
          unoptimized={true}
          layout="fixed"
          className="rounded-full"
        />
      </div>
      <form className="flex flex-col w-full pl-4" onSubmit={handleSubmit}>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          value={message}
          name='message'
          placeholder='¿Que estas pensando?'
          className={`w-full h-24 border-0 outline-0 bg-transparent rounded-lg my-1 resize-none ${stylesTextArea}`}
        ></textarea>
        <section className="flex flex-wrap mb-2">
          {
            previewURL?.map((url, index)=>(
              <ImagePreview key={index} url={url} />
            ))
          }
        </section>
        <div className="w-2/5">
          <Button disabled={isButtonDisabled}>
            Devitear
          </Button>
        </div>
        {statusDevit === STATES_DEVIT.complete && <p>Devit publicado redireccionando a HOME</p>}
        {statusDevit === STATES_DEVIT.error && <p>Error al publicar el devit, intentalo de nuevo</p>}
      </form>
    </article>
  )
}

export default SpaceDevit
