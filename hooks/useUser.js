import { useState, useEffect } from 'react'
import { stateAuth } from '@fbs/client'
import { useRouter } from 'next/router'

const USER_STATES = {
  not_login: null,
  not_known: undefined,
}

const useUser = () => {

  const [user, setUser] = useState(USER_STATES.not_known)
  const router = useRouter()
  
  useEffect(() => {
    stateAuth(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.not_login && router.push('/')
  }, [user])

  // I can´t return only the provider data because in the login failed
  return user ? user?.providerData[0] : user

}

export { USER_STATES }
export default useUser
