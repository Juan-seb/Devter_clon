import Image from 'next/image'

/* const myLoader = ({ src }) => {
  return src
} */

const Avatar = ({ usr, src, alt }) => {
  console.log(usr)
  return (
    <>
      <div className="flex justify-center mb-2">
        <Image
          /* loader={myLoader} */
          key={Math.random()}
          src={src}
          alt={alt}
          width={64}
          height={64}
          unoptimized={true}
          className="rounded-full"
          /* {...props} */
        />
        <p className="text-center">{usr}</p>
      </div>
    </>
  )
}

export default Avatar