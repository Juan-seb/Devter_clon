import Create from 'components/Icons/Create'
import Home from 'components/Icons/Home'
import Search from 'components/Icons/Search'
import Link from 'next/link'

const Nav = () => {
  return (
    <>
      <nav className="nav flex items-center justify-around sticky bottom-0 w-full h-fit px-4 rounded-b-md border-t border-t-gray-400 
        bg-slate-50 bg-opacity-80 backdrop-blur-sm py-2">
        
        <Link className='w-12 hover:radial' href='/home'>
          <a><Home stroke="#09f" width={32} height={32}/></a>
        </Link>

        <Link className='w-12' href='/home'>
          <a><Search stroke="#09f" width={32} height={32}/></a>
        </Link>

        <Link className='w-12' href='/compose/devit'>
          <a><Create stroke="#09f" width={32} height={32}/></a>
        </Link>

      </nav>
    </>
  )
}

export default Nav