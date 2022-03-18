import { addDevit, uploadImages } from '@fbs/client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Button from 'components/Button'
import Image from 'next/image'
import Link from 'next/link'
import useUser from 'hooks/useUser'
import ImagePreview from 'components/ImagePreview'
import { getDownloadURL } from 'firebase/storage'
import { getAllUrls } from 'helpers/getAllUrls'

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
  // Save the files of the image that can obtain before use the events of the drag and drop
  const [imageFile, setImageFile] = useState(null)
  // Use this to save the url that generate for the previewURL
  const [previewURL, setPreviewURL] = useState(null)
  // Save the status of the drag and drop
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  // Save the tasks that return with the method uploadImages (client.js)
  const [tasks, setTasks] = useState(null)
  // Save the sizes of the images
  const [sizes, setSizes] = useState([])

  useEffect(() => {

    const taskFiles = []

    if (imageFile?.length > 0) {
      // imageFile save the file of each image 
      imageFile?.forEach(file => {
        console.log("image")

        // Save the uploadTask that return with the method uploadImages in fileUpload
        const fileUpload = uploadImages(file)
        // Save fileUpload in taskFiles
        taskFiles = [...taskFiles, fileUpload]

      })
    }

    setTasks(taskFiles)

  }, [imageFile])


  const handleSubmit = (e) => {
    e.preventDefault()

    // If the message is empty then return
    if (message.length === 0) return

    setStatusDevit(STATES_DEVIT.complete)

    // getAllUrls obtain the urls of the images that uploaded in the db, return an array of promises
    const arrayPromises = getAllUrls(tasks)
    // Obtain the user information
    const { displayName, photoURL, uid } = user
    
    // Pass the arrayPromises to Promise.all and when the promises are resolved then return and array of objects, each of which contains the url and the name of the image
    // In this way I can use addDevit and add the data of the images
    // Avoid unnecessary calls to the db to eliminate images (this can happen if i save the images in a useEffect)
    Promise.all(arrayPromises).then(res => {
      console.log(res)

      const resNewData = res.map((el,index) => {
        return {
          ...el,
          width: sizes[index].width,
          height: sizes[index].height
        }
      })

      addDevit({
        avatar: photoURL,
        content: message,
        userName: displayName,
        userID: uid,
        imagesData: resNewData.length !== 0 ? resNewData : null
      }).then(() => {
        // If the operation is successful then redirect to HOME
        setTimeout(() => {
          router.push('/home')
        }, 0)

      }).catch(() => {
        setStatusDevit(STATES_DEVIT.error)
      })
    })

  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    // With this state i can style the textarea.
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  // Generate previewURLs and verify the extension of the files
  // Runs only when drop the files
  const handleDrop = (e) => {
    e.preventDefault()

    // Regex pattern to validate the file extension
    let regexFiles = /^.*\.(jpg|JPG|gif|GIF|png|PNG)$/
    // Save in data all the object of the files
    const data = e.dataTransfer.files
    const imageFiles = []
    const imageURL = []

    // Validate that the files to be uploaded are less than four or four
    if (Object.keys(data).length > 4) {
      setDrag(DRAG_IMAGE_STATES.MAX_CAPACITY)
      return
    }

    // Converts the data object to an array and for each element ->
    Object.values(data).forEach((file) => {

      // Validate the extension file
      if (!regexFiles.test(file.name)) {
        console.log("Entro")
        imageFiles = []
        imageURL = []
        setDrag(DRAG_IMAGE_STATES.ERROR_FILES)
        return
      }

      // Generates the previewURL for the file that was dropped
      // Really generates an url
      const fileURL = URL.createObjectURL(file)

      // Save the file object in imagesFiles
      imageFiles = [...imageFiles, file]
      // Save the previewURL in imageURL
      imageURL = [...imageURL, fileURL]

    })

    // This state is for save all files objects that were dropped, all are validate
    setImageFile(imageFiles)
    // This state is for save all previewURL to after show in the client
    setPreviewURL(imageURL)

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
    <article className="flex px-4 my-4">
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
          className={`w-full h-24 border-0 outline-0 bg-transparent rounded-lg resize-none ${stylesTextArea}`}
        ></textarea>
        <section className="flex flex-wrap mb-2">
          {
            previewURL?.map((url, index) => (
              <ImagePreview key={index} url={url} sizes = {sizes} setSizes = {setSizes} />
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
