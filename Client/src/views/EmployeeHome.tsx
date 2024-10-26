import { useLoaderData, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Bell, Clock, MessageSquare } from 'lucide-react'
import { EmployeeGetInfo } from "../services/EmployeeServices";
import { UserSchema } from "../types";
import { getInitials } from "../utils/initials";
import { useState } from "react";
import CardDetail from "../Components/CardDetail";
import { deleteToken } from "../utils/auth";

export async function loader() {
  
  const EmployeeInfo = await EmployeeGetInfo()

  return EmployeeInfo; 

}

export default function EmployeeHome() {

  const EmployeeInfo = useLoaderData() as UserSchema

  const [currentTime, setCurrentTime] = useState(new Date())

  setInterval(() => setCurrentTime(new Date()), 60000)

  const navigate = useNavigate()


  function handleLogout() {
    deleteToken()
    navigate('/')
  }

  return (

    <>

      <div className="mt-10 mx-10 sm:mx-10 lg:mx-20 xl:mx-auto max-w-6xl p-6 sm:p-10 bg-white shadow-lg">
        <div className="flex justify-between items-center">
          <div className="relative">
            <h3 className="text-xl sm:text-3xl lg:text-3xl">Bienvenido, {EmployeeInfo.fullName}</h3>
            <div className="relative top-2 text-sm text-gray-500">
              <h3 className="text-xl lg:text-2xl">{EmployeeInfo.departamento}</h3>
            </div>
          </div>
          <Dropdown>
            <DropdownTrigger>
                <Avatar className="w-14 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-xl cursor-pointer" name={getInitials(`${EmployeeInfo.fullName}`)} />
            </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="edit"><span className=" text-sm xl:text-lg">Editar Perfil</span></DropdownItem>
                  <DropdownItem className="text-danger" key="logout" color="danger" onClick={handleLogout}><span className=" sm:text-sm xl:text-lg">Log Out</span></DropdownItem>
              </DropdownMenu>
          </Dropdown>
        </div>

        <CardDetail content={"Hora actual"} content2={currentTime.toLocaleTimeString()}>
          <Clock className="h-8 w-8 text-gray-400" />
        </CardDetail>

        <CardDetail content={"Mensajes"} content2={"3 nuevos"}>
            <MessageSquare className="h-8 w-8 text-gray-400" />
        </CardDetail>

        <CardDetail content={"Notificaciones"} content2={"5 sin leer"}>
          <Bell className="h-8 w-8 text-gray-400" />
        </CardDetail>

      </div>
    </>
  )
}
