'use client';
import { Header } from "@/components/Layouts/header";

import { Sidebar } from "@/components/Layouts/sidebar";
import { formElements } from "@/components/FormElements/forms";
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { controllers } from "@/app/main"
import { urlAPI } from "@/app/main";
import {FormEvent ,useEffect, useState } from "react";

type input = {
    name: string | null,
    description: string | null,
    enterpriseId: number | null,
    enterprise: string | null,
    [key: string]: string | number | null

};


type dynamicArrayData = {
    alias: string,
    arrayData:{
        value:any,
        title: string
    }[]
}


 export default function AddDepartmentHookUser(){

    const [getEnterpriseId, setGetEnterpriseId] = useState<any[]>([])
    const [getEnterpriseIdOfAdmin, setGetEnterpriseIdOfAdmin] = useState<string | null>(null)
    const [getAdminRole, setGetAdminRole] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
     const [inputs, setInputs] = useState<input>({
      name: null,
      description:  null,
      enterpriseId: null,
      enterprise: null,

    })


    //Récupération des entreprises
        useEffect(() =>{
            (async () => {
                if(typeof (window) === "undefined") return;
    
              //  const authToken = await localStorage.getItem("authToken")
                const role = await localStorage.getItem("adminRole")
                const getEnterpriseIdOfAdmin = await localStorage.getItem("EnterpriseId")
                
    
                const methodName = "getEnterprises"
                const getEnterprise = await controllers.API.getAll(urlAPI, methodName, null)
    
                if(parseInt(getEnterpriseIdOfAdmin ?? "") !== 1){
                
                    const filteredIdOfAdmin = getEnterprise.filter((item : {id: number}) => item.id === parseInt(getEnterpriseIdOfAdmin ?? "" ))
    
                    setGetEnterpriseId(filteredIdOfAdmin)
                    return;
    
                }

                setGetEnterpriseId(getEnterpriseId)
                setGetEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin)
                setGetAdminRole(role)
              //  console.log("l'id de l'entreprise", getEnterpriseId)
                   
                    
            })()
        }, [] )
    
        let DynamicArrayDatas: dynamicArrayData[] =[
            {
                alias: "EnterpriseId",
                arrayData: getEnterpriseId.filter(item => item.id === item.name).map(item => (
                    {value: item.id, title: item.name}
                ))
            }
        ]

         const [dynamicArrayDatasCloned, setDynamicArrayDatasCloned] = useState<dynamicArrayData[]>([])

         //Récupère les données de champs en mémoire
         useEffect(() => {
         (() => {
            const inputMemory = localStorage.getItem("inputMemory")
            inputMemory ? setInputs(JSON.parse(inputMemory ?? "")) : setInputs({...inputs})
            setDynamicArrayDatasCloned(DynamicArrayDatas)

        })()
    },[DynamicArrayDatas])

    

    const handleSubmit = async () => {
        setIsLoading(true)

        {/** 
        const datas = {
            name : inputs.name,
            description: inputs.description,
            enterpriseId: inputs.enterpriseId,
            enterprise: inputs.enterprise
        }

        console.log("les données:", datas)

        */}

        const methodName = "creatDepartmentPost"
        const response = await controllers.API.SendOne(urlAPI, methodName, null, inputs)

        if(response.status) 
        localStorage.removeItem("inputMemory")
        
       controllers.alertMessage(
        response.status,
        response.title,
        response.message,
        response.status ? "/dashboard/ADMIN/addDepartment" : null
       )

       setIsLoading(false)
       
    }

        
        return {DynamicArrayDatas, isLoading, dynamicArrayDatasCloned, handleSubmit, inputs, setInputs};
    }