import { Outlet } from 'react-router-dom'
import Notification from '../Components/Notification'

export default function Layout() {
  return (
    <>

      <header className="bg-slate-800">
        <div className="max-w-6xl mx-auto py-10 flex justify-center items-center">
          <h1 className="text-4xl font-extrabold text-white">
            Prueba Técnica
          </h1>
        </div>
      </header>

        <main className='min-h-screen bg-gray-100 '>
            <Outlet />
        </main>

        <Notification/>

    </>
  )
}
