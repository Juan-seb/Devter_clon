import Devit from "components/Devit"
import LayoutPage from "components/LayoutPage"
import Header from "components/LayoutPage/Header"
import Nav from "components/LayoutPage/Nav"
import { useRouter } from "next/router"

const Status = ({ res }) => {

  //Simple example of the useRouter hook to obtain a parameter from the url
  const router = useRouter()

  return (
    <>
      {res &&
        <Devit
          key={res.id}
          id={res.id}
          src={res.avatar}
          alt={res.userName}
          imgsData={res.imagesData}
          createdAt={res.createdAt}
          time={res.time}
          userName={res.userName}
          content={res.content}
        />
      }
    </>

  )
}

/* export const getStaticPaths = () => {
  return {
    paths:[
      
    ],
    fallback: false
  }
} */

export const getServerSideProps = async (context) => {

  const { params } = context
  const { id } = params

  try {
    const data = await fetch(`http://localhost:3000/api/devits/${id}`)
    const res = await data.json()

    if (!res.userName) throw new Error()

    return {
      props: {
        res
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

Status.getLayout = (page) => {
  return (
    <LayoutPage>
      <Header />
      {page}
      <Nav />
    </LayoutPage>
  )
}


export default Status