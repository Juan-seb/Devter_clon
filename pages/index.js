import Avatar from 'components/Avatar'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'
import Head from 'next/head'
import Image from 'next/image'
import logo from 'public/logo-js.png'
import { loginWithGitHub, stateAuth } from '@fbs/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser, { USER_STATES } from 'hooks/useUser'

/* const myLoader = ({ src }) => {
  return src
} */

export default function Home() {

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    console.log(user)
    if (user) {
      router.replace('/home')
    }
  }, [user])

  const handleClick = async () => {

    // It´s necesary put the async-await
    await loginWithGitHub()

  }

  return (
    <div>
      <Head>
        <title>devter 🐦</title>
        <meta name="login" content="Login for devter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid place-items-center h-screen sm:py-2">
        <main className="grid place-items-center w-full h-full bg-slate-50 border-0 rounded-md shadow-lg shadow-black sm:max-w-md">
          <section className="my-auto">
            <div className="w-full flex justify-center items-center mb-4">
              <Image
                src={logo}
                alt="Logo devter"
                width={120}
                height={120}
              />
            </div>
            <h1 className="text-4xl text-center">Devter</h1>
            <h2 className="text-xl font-thin text-center">Hablemos de desarrollo 👨‍💻👨‍💻</h2>
            <div className="w-4/5 mx-auto mt-6">
              {
                user === USER_STATES.not_known &&
                <p className="text-center">Cargando...</p>
              }
              {
                user === USER_STATES.not_login &&
                <Button onClick={handleClick}>
                  <GitHub className="w-auto inline mr-3 mb-1 mt-1" fill="#fff" width={26} height={25} />
                  Login with GitHub
                </Button>
              }
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
