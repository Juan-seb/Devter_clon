import { useRef } from 'react'

const ImagePreview = ({ url, sizes, setSizes }) => {

  const img = useRef(null)

  const handleLoad = () => {
    const sizesImage = {
      width: img.current.naturalWidth,
      height: img.current.naturalHeight
    }
    setSizes([...sizes, sizesImage])
  }

  return (

    <div className="w-full h-auto rounded-full block">
      <img src={url} ref={img} onLoad={handleLoad} />
    </div>
  )

}

export default ImagePreview