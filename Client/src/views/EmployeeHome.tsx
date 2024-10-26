import { useLoaderData } from "react-router-dom";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import { Bell, Calendar, MessageSquare } from 'lucide-react'
import { EmployeeGetInfo } from "../services/EmployeeServices";
import { UserSchema } from "../types";
import { getInitials } from "../utils/initials";
import { useState } from "react";

export async function loader() {
  
  const EmployeeInfo = await EmployeeGetInfo()

  return EmployeeInfo; 

}

export default function EmployeeHome() {

  const [currentTime, setCurrentTime] = useState(new Date())

  setInterval(() => setCurrentTime(new Date()), 60000)

  const EmployeeInfo = useLoaderData() as UserSchema


  return (
    <>

    <div className="mt-10 mx-auto max-w-6xl p-6 sm:p-10 bg-white shadow-lg">
      <div className="flex justify-between items-center">
        <div className="relative">
          <h3 className="text-2xl">Bienvenido, {EmployeeInfo.fullName}</h3>
          <div className="relative top-2 text-sm text-gray-500">
            <h3 className="text-xl">{EmployeeInfo.departamento}</h3>
          </div>
        </div>
        <Avatar size="lg" name={getInitials(`${EmployeeInfo.fullName}`)} />
      </div>

      <Card className="mt-10">
      <CardBody>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl text-gray-600">Hora actual</p>
            <p className="text-lg font-semibold">{currentTime.toLocaleTimeString()}</p>
          </div>
          <div>
            <Calendar className="h-6 w-6 text-gray-400" /> {/* Cambia a un ícono de reloj, si está disponible */}
          </div>
        </div>
      </CardBody>
    </Card>

     
        <Card className="mt-5">
          <CardBody>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl text-gray-600">Mensajes</p>
                <p className="text-lg font-semibold">3 nuevos</p>
              </div>

              <div>
                <MessageSquare className="h-6 w-6 text-gray-400" />
              </div>
            </div>

          </CardBody>
        </Card>
 

      
        <Card className="mt-5">
        <CardBody>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl text-gray-600">Notificaciones</p>
              <p className="text-lg font-semibold">5 sin leer</p>
            </div>
            <div>
              <Bell className="h-6 w-6 text-gray-400" /> {/* Cambia a un ícono de campana, si está disponible */}
            </div>
          </div>
        </CardBody>
      </Card>








    </div>

    </>
  )
}
