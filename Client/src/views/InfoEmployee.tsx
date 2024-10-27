import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { EmployeeGetInfo } from "../services/EmployeeServices";
import { UserSchema } from "../types";
import { Avatar, Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { Briefcase, Edit, Mail, MapPin } from "lucide-react";
import { getInitials } from "../utils/initials";

export async function loader() {
  
  const EmployeeInfo = await EmployeeGetInfo()

  return EmployeeInfo; 

}


export default function InfoEmployee() {

  const EmployeeInfo = useLoaderData() as UserSchema

  const navigate = useNavigate()

  return (
    <div className="mt-10 mx-auto max-w-6xl p-6 sm:p-10 bg-white shadow-lg">
       <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className=" text-[19px] sm:text-4xl font-black text-slate-500 py-5">
          Información Personal
        </h2>
          <Link
            to="/user/home"
            className="rounded-md bg-indigo-600 p-2 sm:p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          >
            Volver a Home
          </Link>
      </div>

      <Card className="max-w-md mx-auto mt-5">
      <CardBody className="flex flex-col items-center gap-4">
        <Avatar
          className="w-24 h-24 text-xl"
          isBordered
          color="primary"
          name={getInitials(`${EmployeeInfo.fullName}`)}
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold">{EmployeeInfo.userName}</h2>
          <p className="text-default-500">{EmployeeInfo.departamento}</p>
        </div>
        <div className="w-full space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="text-default-500" size={18} />
            <span>{EmployeeInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-default-500" size={18} />
            <span>República, Dominicana</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="text-default-500" size={18} />
            <span>Empresa S.L.</span>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          fullWidth
          color="primary"
          variant="bordered"
          startContent={<Edit size={18} />}
          onClick={() => {
            navigate(`/user/home/editar/${EmployeeInfo.id}`);
          }}
        >
          Editar Perfil
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
