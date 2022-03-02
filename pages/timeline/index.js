import Head from 'next/head'
import Link from 'next/link'

const Timeline = ({ userName }) => {

    return (
        <>
            <Head>
                <title>devter 🐦</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1>Hola a todos, estamos en el timeline de {userName}</h1>
                <Link href="/">Go home</Link>
            </div>
        </>
    )
}

export const getStaticProps = async () => {

    const res = await fetch('http://localhost:3000/api/hello')
    const data = await res.json()
    const { name } = data
    
    return {
        props: {
            userName: name
        }, // will be passed to the page component as props
    }
}

export default Timeline