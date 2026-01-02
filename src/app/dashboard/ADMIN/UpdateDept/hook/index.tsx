"use client";
import { useState, useEffect } from "react";
import { controllers, urlAPI } from "@/app/main";


type input = {
    name: string | null,
    description: string | null,
    enterpriseId: number | null,
    enterprise: string | null,
    [key: string]: string | number | null | undefined

};

export default function UpdateDeptHookModal () {

    const [getEnterprises, setGetEnterprises] = useState<any[]>([])
    const [getEnterpriseIdOfAdmin, setGetEnterpriseIdOfAdmin] = useState<string | null>(null);
    const [getAdminRole, setGetAdminRole] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState<input>({
      name: null,
      description: null,
      enterpriseId: null,
      enterprise: null,
    
    })

    //Récupération des entrerises
    useEffect(() => {
        (async () => {
         
          if(typeof (window) === "undefined") return;
          const authToken = window?.localStorage.getItem("authToken")
          const role = window?.localStorage.getItem("adminRole")
          const getEnterpriseIdOfAdmin = localStorage.getItem("EnterpriseId") 
          setGetAdminRole(role)
          setGetEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin) 

          const methodName = "getEnterprises"
          const getEnterprises = await controllers.API.getAll(urlAPI, methodName, null)
          
          if(parseInt(getEnterpriseIdOfAdmin ?? "")){
            const filterEnterpriseByAdminEnterpriseId = getEnterprises.filter((item : {id: number}) => 
            item.id === parseInt(getEnterpriseIdOfAdmin ?? ""))

            setGetEnterprises(filterEnterpriseByAdminEnterpriseId)
            return;

          }

          setGetEnterprises(getEnterprises)
          console.log(getEnterprises)
       
      })()    
    }, [])

    let dynamicArrayData = [
        {
            alias: "getEnterpriseId",
            arrayData: getEnterprises.filter(item => item.id && item.name).map((item) => (
                {value: item.id, title: item.name}
            ))
        }
    ]

    const handleSubmit = async () => {
        setIsLoading(true)

        const methodName = "creatDepartmentPost"
        const response = await controllers.API.SendOne(urlAPI, methodName, null, inputs)

         if (response.status)
             localStorage.removeItem("inputMemory")

         controllers.alertMessage(
             response.status,
             response.title,
             response.message,
             response.status ? "/dashboard/ADMIN/addDepartment" : null
         )

         setIsLoading(false)

     }



    return { dynamicArrayData, getAdminRole, inputs, setInputs, handleSubmit, isLoading, setIsLoading}
}