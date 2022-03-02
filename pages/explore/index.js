import LayoutPage from 'components/LayoutPage'

const Explore = () => {
  return (
    <>
      Soy el explore
    </>
  )
}

Explore.getLayout = (page) => {
  return(
    <LayoutPage>
      {page}
    </LayoutPage>
  )
}

export default Explore