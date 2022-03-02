import { getDevits } from '@fbs/client'
import { useState, useEffect } from 'react'
import Avatar from "components/Avatar"
import Devit from "components/Devit"
import Header from "components/LayoutPage/Header"
import LayoutPage from "components/LayoutPage"
import Link from 'next/link'
import Nav from "components/LayoutPage/Nav"
import useUser from 'hooks/useUser'
import Head from 'next/head'

// I can bring the devits with the getServerSideProps (server) or in the client with the useEffect
const HomePage = (/* { devitsDB } */) => {

	//console.log(devitsDB)
	const [devits, setDevits] = useState([])

	// If i have the user, then i can get the devits otherwise not
	const user = useUser()

	useEffect(() => {

		const getData = async () => {
			try {
				/* const res = await fetch('http://localhost:3000/api/statuses/home_timeline')
				const json = res.ok ? res.json() : Promise.reject('Error')
				const data = await json */
				const data = await getDevits()

				setDevits(data)
			} catch (error) {
				console.log(error)
			}
		}

		// If the user is authenticated then loading the devits
		user && getData()

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
						src={devit.avatar}
						alt={devit.userName}
						createdAt={devit.createdAt}
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