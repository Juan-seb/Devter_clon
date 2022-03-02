import Image from 'next/image'

const ImagePreview = ({ url }) => {

  return (

    <div className="w-full block">
      <img src={url}/>
    </div>
  )

}

export default ImagePreview