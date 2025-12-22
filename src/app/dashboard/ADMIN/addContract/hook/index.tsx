'use client';
import { useEffect, useState } from "react"
import { controllers } from "@/app/main"
import { urlAPI } from "@/app/main";

type ContratValues = {
    startDate: number | null,
    endDate: number | null,
    delay: number | null,
    ContractTypeId: number | null,
    EnterpriseId: number | null
    ContractType: string | null,
    Enterprise: string | null,
    [key: string]: string | number | null

}

type dynamicArrayData = {
    alias: string,
    arrayData:{
        value:any,
        title: string
    }[]
}


export default function AddContractHookModal(){
    const [getEnterprise, setGetEnterprise] = useState<any[]>([])
    const [getContract, setGetContract] = useState<any[]>([])
    const [getContractType, setGetContractType] = useState<any[]>([])
    const [getEnterpriseIdOfAdmin, setGetEnterpriseIdOfAdmin] = useState<string | null>(null)
    const [getAdminRole, setGetAdminRole] = useState<string | null>(null)
    const [inputsValues, setInputsValues] = useState<ContratValues>({
      startDate: null,
      endDate: null,
      delay: null,
      ContractTypeId: null,
      EnterpriseId: null,
      ContractType: null,
      Enterprise: null,
     })

        const [isLoading, setIsLoading] = useState(false);

         //Récupérer les entreprises
            useEffect(() => {
                (async () => {

                    if (typeof (window) === undefined) return;
                   // const authToken = localStorage.getItem("authToken")
                    const role = localStorage.getItem("adminRole")
                    let getEnterpriseIdOfAdmin = localStorage.getItem("EnterpriseId")
        
        
                    const methodName = "getEnterprises"
                    const getEnterprise = await controllers.API.getAll(urlAPI, methodName, null)
        
                    if (parseInt(getEnterpriseIdOfAdmin ?? "") !== 1) {
                        const filteredEnterpriseIdOdAdmin = getEnterprise.filter((item: { id: number }) => item.id === parseInt(getEnterpriseIdOfAdmin ?? ""))
        
                        setGetEnterprise(filteredEnterpriseIdOdAdmin)
                        return;
        
                    }

                    setGetEnterprise(getEnterprise)
                    setGetEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin)
                    setGetAdminRole(role)
                   // console.log("l'id de l'entreprise:", getEnterprise)
        
                })()
            }, [])


            //Récupérer la liste des contrats
            useEffect(() => {
                (async () => {
        
                    const methodName = "getContracts"
                    const getContract = await controllers.API.getAll(urlAPI, methodName, null)
                    const filteredContrat = getContract.filter((item: { ContractTypeId: number, EnterpriseId: number }) => 
                        item.ContractTypeId === inputsValues.ContractTypeId &&
                        item.EnterpriseId === inputsValues.EnterpriseId
                    )

                    setGetContract(filteredContrat)
                    console.log("La liste des contrats:", filteredContrat)
        
                })()
            }, [inputsValues.ContractTypeId])
        
           
            //Récupérer le type de contrat
            useEffect(() => {
                (async () => {
        
                    const methodName = "getContractTypes"
                    const getContractType = await controllers.API.getAll(urlAPI, methodName, null)
                    const filteredContratType = getContractType.filter(
                        (item: { ContractTypeId: number, EnterpriseId: number }) =>
                         item.EnterpriseId === inputsValues.EnterpriseId
                    )

                    setGetContractType(filteredContratType)
                    console.log("La liste des contrats:", filteredContratType)
        
                })()
            }, [inputsValues.EnterpriseId])

       
     const [dynamicArrayDatasCloned, setDynamicArrayDatasCloned] = useState<dynamicArrayData[]>([])

     let dynamicArrayData: dynamicArrayData[] = [

        {
            alias: "ContractTypeId",
            arrayData: getContractType.filter(item => item.id && item.title).map(item => (
                { value: item.id, title: item.title }))
        },

        {
            alias: "EnterpriseId",
            arrayData: getEnterprise.filter(item => item.id && item.name).map(item => (
                { value: item.id, title: item.name })),
        },


    ];

    const staticArrayData = [
        {
            alias: "delay",
            value: [
                {
                    id: "3 mois", value: "3 mois"
                },

                {
                    id: "6 mois", value: "6 mois"
                },

                {
                    id: "1 année", value: "1 année"
                },

            ]
        }
    ]
        
        
            //Récupérer les données des champs en mémoire
            useEffect(() => {
                (() => {
                    const inputMemory = localStorage.getItem("inputMemory")
                    inputMemory ? setInputsValues(JSON.parse(inputMemory ?? "")) : setInputsValues({...inputsValues})
                    setDynamicArrayDatasCloned(dynamicArrayData)
                    
                })()
            },[dynamicArrayData])
        
        
        
            const handleSubmit = async () => {
                setIsLoading(true);

                {/** 
                const requireField = {
                    startDate: inputsValues.startDate,
                    endDate: inputsValues.endDate,
                    delay: inputsValues.delay,
                    ContractType: inputsValues.ContractType,
                    Enterprise: inputsValues.Enterprise,
                    ContractTypeId: inputsValues.ContractTypeId ?? null,
                    EnterpriseId: inputsValues.EnterpriseId ?? null
        
                }
        
                console.log("les données:", requireField)
                */}
        
                const methodName = "createContract"
                const response = await controllers.API.SendOne(urlAPI, methodName, null, inputsValues)

                if(response.status)
                localStorage.removeItem("inputMemory")
        
                controllers.alertMessage(
                    response.status,
                    response.title,
                    response.message,
                    response.status ? "/dashboard/ADMIN/addContract" : null
                )
        
        
                setIsLoading(false);
            }
        
     
    return {dynamicArrayData, staticArrayData, handleSubmit, isLoading, dynamicArrayDatasCloned, inputsValues, setInputsValues}
        
    
}