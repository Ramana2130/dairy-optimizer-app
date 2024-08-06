import { SignInButton } from '@clerk/clerk-react'
import React from 'react'

const Home = () => {
  return (
    <div>
        <h1>Sign In With this click</h1>
        <SignInButton  forceRedirectUrl='/dashboard' />
    </div>
  )
}

export default Home