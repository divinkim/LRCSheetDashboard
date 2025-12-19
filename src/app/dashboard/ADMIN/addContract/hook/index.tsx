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


         //Récupérer la liste des contrats
            useEffect(() => {
                (async () => {
        
                    const methodName = "getContracts"
                    const getContract = await controllers.API.getAll(urlAPI, methodName, null)
                    const filteredContrat = getContract.filter(
                        (item: { ContractTypeId: number, EnterpriseId: number }) =>
                            item.ContractTypeId === inputsValues.ContractTypeId && item.EnterpriseId === inputsValues.EnterpriseId)
                    setGetContract(filteredContrat)
                    console.log("La liste des contrats:", filteredContrat)
        
                })()
            }, [inputsValues.ContractTypeId])
        
            //Récupérer les entreprises
            useEffect(() => {
                (async () => {
                    if (typeof (window) === undefined) return;
                    const authToken = localStorage.getItem("authToken")
                    const role = localStorage.getItem("role")
                    let getEnterpriseIdOfAdmin = localStorage.getItem("EnterpriseId")
        
                    setGetEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin)
                    setGetAdminRole(role)
        
                    const methodName = "getEnterprises"
                    const getEnterprise = await controllers.API.getAll(urlAPI, methodName, null)
        
                    if (parseInt(getEnterpriseIdOfAdmin ?? "") !== 1) {
                        const filteredEnterpriseIdOdAdmin = getEnterprise.filter((item: { id: number }) => item.id === parseInt(getEnterpriseIdOfAdmin ?? ""))
        
                        setGetEnterprise(filteredEnterpriseIdOdAdmin)
                        return;
        
                    }
                    setGetEnterprise(getEnterprise)
                    console.log("l'id de l'entreprise:", getEnterprise)
        
                })()
            }, [])
        
            //Récupérer le type de contrat
            useEffect(() => {
                (async () => {
        
                    const methodName = "getContractTypes"
                    const getContractType = await controllers.API.getAll(urlAPI, methodName, null)
                    const filteredContratType = getContractType.filter(
                        (item: { ContractTypeId: number, EnterpriseId: number }) =>
                            item.EnterpriseId === inputsValues.EnterpriseId)
                    setGetContractType(filteredContratType)
                    console.log("La liste des contrats:", filteredContratType)
        
                })()
            }, [inputsValues.EnterpriseId])



     let dynamicArrayData= [

        {
            alias: "ContractTypeId",
            value: getContractType.filter(item => item.id && item.title).map(item => (
                { id: item.id, value: item.title }))
        },

        {
            alias: "EnterpriseId",
            value: getEnterprise.filter(item => item.id && item.name).map(item => (
                { id: item.id, value: item.name })),
        },

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

    return {dynamicArrayData, staticArrayData}
        
    
}