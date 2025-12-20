'use client';
import { Header } from "@/components/Layouts/header";

import { Sidebar } from "@/components/Layouts/sidebar";
import { formElements } from "@/components/FormElements/forms";
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { controllers } from "@/app/main"
import { urlAPI } from "@/app/main";
import {FormEvent ,useEffect, useState } from "react";

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

    //Récupération des entreprise
        useEffect(() =>{
            (async () => {
    
                const authToken = await localStorage.getItem("authToken")
                const role = await localStorage.getItem("role")
                const getEnterpriseIdOfAdmin = await localStorage.getItem("EnterpriseId")
    
                setGetEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin)
                setGetAdminRole(role)
    
                const methodName = "getDepartmentPosts"
    
                const getEnterprise = await controllers.API.getAll(urlAPI, methodName, null)
    
                if(parseInt(getEnterpriseIdOfAdmin ?? "") !== 1){
                
                    const filteredIdOfAdmin = getEnterprise.filter((item : {id: number}) => item.id === parseInt(getEnterpriseIdOfAdmin ?? "" ))
    
                    setGetEnterpriseId(filteredIdOfAdmin)
                    return;
    
                }
                setGetEnterpriseId(getEnterpriseId)
                console.log("l'id de l'entreprise", getEnterpriseId)
                   
                    
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
        
        return {DynamicArrayDatas};
    }