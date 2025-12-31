"use client";

import { controllers, urlAPI } from "@/app/main"
import { useEffect, useState } from "react";

type contractList = {
    id: number,
    startDate: string | number,
    endDate: string | number,
    delay: string | number,
    ContractType: {
        title: string 
    },
    Enterprise: {
        name: string
    }
}


export default function contractListHook (){

    const [search, setSearch] = useState("")
    const [contractLists, setContractLists] = useState<contractList[]>([])
    const [contractListCloned, setContractListCloned] = useState<contractList[]>([])
    
    const [page, setPage] = useState(1)
    const limit = 5
    
    const getAdminRole = localStorage.getItem("adminRole")
    const requireAdminRoles = ['Super-Admin', 'Supervisor-Admin']

useEffect(() => {
    (() => {
        const authToken = localStorage.getItem("authToken")
        if(authToken === null){
            window.location.href = "/"
        }

    })()
}, [])

//Récupérer les contrats
useEffect(() => {
    (async () => {
        const methodName = "getContracts"
        const response = await controllers.API.getAll(urlAPI, methodName, null)
        console.log("Liste des contrats:", response)

        const result = response?.datas ?? []

        setContractListCloned(result)
        setContractLists(result) 
        

    })()
},[])

//Récuperer l'entreprise
//useEffect(() => {
  //  (async () => {
    //    const getEnterpriseIdOfAdmin = localStorage.getItem("EnterpriseId")

     //   const methodName = "getEnterprises"
     //   const response = await controllers.API.getAll(urlAPI, methodName, null)
        
      //  if(parseInt(getEnterpriseIdOfAdmin ?? "") === 1){
      //      const filterContractByAdminEnterpriseId = response.filter((item : {EnterpriseId: number}) => {
      //          [1,2,3,4].includes(item.EnterpriseId)
      //      })
//
       //     setContractLists(filterContractByAdminEnterpriseId)
       //     setContractListCloned(filterContractByAdminEnterpriseId)
       // }
       // else {
       //     const filterContractEnterpriseId = response.filter((item : {EnterpriseId: number}) => {
       //         item.EnterpriseId === parseInt(getEnterpriseIdOfAdmin ?? "")
       //     })
       //     setContractListCloned(filterContractEnterpriseId)
       //     setContractLists(filterContractEnterpriseId)
       //     
       // }

   // })()
// },[])



//Filtrage pour la recherche du contrat
function onSearch (input: string){
    const filtered = contractLists.filter((item) => 
      item?.ContractType?.title?.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
    setContractListCloned(filtered)

}

//Pagination
const start = (page -1) * limit 
const maxPage = Math.ceil(contractListCloned.length / limit)


return {requireAdminRoles, getAdminRole, onSearch, start, maxPage, contractListCloned, limit, page, setPage}

}