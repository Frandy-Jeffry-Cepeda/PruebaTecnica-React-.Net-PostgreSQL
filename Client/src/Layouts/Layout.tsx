import Notification from '../Components/Notification'
import { deleteToken } from '../utils/auth'

import { LogOutIcon } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {

  const navigate = useNavigate()

  function handleLogout() {
    deleteToken()
    navigate('/')
  }

  return (
    <>

      <header className="bg-slate-800">
        <div className="max-w-6xl mx-auto py-10 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white">
            Prueba Técnica
          </h1>
          <button onClick={handleLogout}>
            <LogOutIcon className='text-danger'></LogOutIcon>
          </button>
        </div>
      </header>

        <main className='min-h-screen bg-gray-100 '>
            <Outlet />
        </main>

        <Notification/>

    </>
  )
}
