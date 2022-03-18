import { useTimeAgo } from 'hooks/useTimeAgo'
import {useRouter} from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

const Devit = ({ id, src, alt, imgsData, createdAt, time, userName, content }) => {

  const timeago = useTimeAgo(createdAt)
  const router = useRouter()

  const handleClick = () => {
    router.push(`/status/${id}`)
  }

  return (
    <article onClick={handleClick} className="flex px-4 py-2 border-b border-b-slate-300 hover:bg-slate-100 hover:cursor-pointer">
      <div className="w-10 py-1">
        <Image
          src={src}
          alt={alt}
          width={40}
          height={40}
          unoptimized={true}
          layout="fixed"
          priority
          className="rounded-full"
        />
      </div>
      <div className="pl-3 w-full">
        <h3 className="text-base font-semibold mr-2 inline">{userName}</h3>
        <Link href={`/status/${id}`} passHref>
          <time className="text-xs text-gray-400 inline cursor-pointer hover:underline hover:decoration-black" title={time}>{timeago}</time>
        </Link>
        <p>
          {content}
        </p>
        {
          imgsData &&
          imgsData.map((img, index) => (
            <div key={index} className="w-80 h-min">
              <Image
                src={img.downloadURL}
                alt={img.name}
                width={img.width}
                height={img.height}
                unoptimized={true}
                className="w-full h-full rounded-lg"
              />
            </div>
          ))
        }
      </div>

    </article>
  )
}

export default Devit