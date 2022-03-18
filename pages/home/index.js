import { listenDevits } from '@fbs/client'
import { useState, useEffect } from 'react'
import Devit from "components/Devit"
import Head from 'next/head'
import Header from "components/LayoutPage/Header"
import LayoutPage from "components/LayoutPage"
import Nav from "components/LayoutPage/Nav"
import useUser from 'hooks/useUser'

// I can bring the devits with the getServerSideProps (server) or in the client with the useEffect
const HomePage = (/* { devitsDB } */) => {

	//console.log(devitsDB)
	const [devits, setDevits] = useState([])

	// If i have the user, then i can get the devits otherwise not
	const user = useUser()

	useEffect(() => {

		let unsubscribe
		// The method getDevits was replaced with listenDevits

		// If the user is authenticated then loading the devits
		if (user) {
			// listenDevits return a promise
			unsubscribe = listenDevits(setDevits)
		}

		return () => unsubscribe && unsubscribe.then(res => res())

	}, [user])

	return (
		<>
			<Head>
				<title>Devter / Home</title>
			</Head>
			<section className="flex-grow">
				{/* <Link href="/compose/tweet">Vamos a explore</Link> */}
				{devits.map((devit) => (
					<Devit
						key={devit.id}
						id = {devit.id}
						src={devit.avatar}
						alt={devit.userName}
						imgsData = {devit.imagesData}
						createdAt={devit.createdAt}
						time = {devit.time}
						userName={devit.userName}
						content={devit.content}
					/>
				))}
			</section>
		</>
	)
}

/* export const getServerSideProps = async () => {

	const devitsDB = await getDevits()
	
	return {
		props: {
			devitsDB
		}
	}
} */

HomePage.getLayout = (page) => {
	return (
		<LayoutPage>
			<Header />
			{page}
			<Nav />
		</LayoutPage>
	)
}

export default HomePage