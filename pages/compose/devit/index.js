import Head from 'next/head'
import LayoutPage from "components/LayoutPage"
import Nav from "components/LayoutPage/Nav"
import SpaceDevit from "components/SpaceDevit"
import Header from 'components/LayoutPage/Header'

const ComposeDevit = () => {

  return (
    <>
      <Head>
				<title>Devter / Create Devit</title>
			</Head>
      <section className='flex-1'>
        <SpaceDevit src="https://placeimg.com/40/40/people" alt="People" />
      </section>
    </>
  )
}

ComposeDevit.getLayout = (page) => {
  return (
    <LayoutPage>
      {page}
      <Nav />
    </LayoutPage>
  )
}

export default ComposeDevit