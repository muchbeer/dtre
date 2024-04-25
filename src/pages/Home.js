import Notification from '../components/Notification'
import Login from '../components/user/Login'
// import NavBar from '../components/NavBar'
import HomeLogin from '../components/HomeLogin'
import React from 'react'
import Loading from '../components/Loading'


const Home = () => {


  return (
    <>

    <Loading />
    <Notification />
    <HomeLogin />
    <Login />
    </>
  )
}

export default Home;