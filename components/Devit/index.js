import { useTimeAgo } from 'hooks/useTimeAgo'
import Image from 'next/image'

const Devit = ({ src, alt, createdAt, userName, content }) => {

  const timeago = useTimeAgo(createdAt)

  return (
    <article className="flex px-4 py-2 border-b border-b-slate-300">
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
        <p className="text-xs text-gray-400 inline">{timeago}</p>
        <p>
          {content}
        </p>
      </div>

    </article>
  )
}

export default Devit