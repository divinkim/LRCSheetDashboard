import { controllers, urlAPI } from "@/app/main"
import { useEffect, useState } from "react"

type contractList = {
    startDate: number,
    endDate: number,
    delay: string | number,
    ContractTypeId: {
        title: string 
    },
    EnterpriseId: {
        name: string
    }
}


export default function contractListHook (){

    const [search, setSearch] = useState("")
    const [contractLists, setContractLists] = useState<contractList[]>([])
    const [contractListCloned, setContractListCloned] = useState<[]>([])
    
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

useEffect(() => {
    (async () => {
        const getEnterpriseIdOfAdmin = localStorage.getItem("EnterpriseId")

        const methodName = "getContracts"
        const response = await controllers.API.getAll(urlAPI, methodName, null)
        
        if(parseInt(getEnterpriseIdOfAdmin ?? "") === 1){
            const filterContractByAdminEnterpriseId = response.filter((item : {EnterpriseId: number}) => {
                [1,2,3,4].includes(item.EnterpriseId)
            })

            setContractLists(filterContractByAdminEnterpriseId)
            setContractListCloned(filterContractByAdminEnterpriseId)
        }
        else {
            const filterContractEnterpriseId = response.filter((item : {EnterpriseId: number}) => {
                item.EnterpriseId === parseInt(getEnterpriseIdOfAdmin ?? "")
            })
            setContractListCloned(filterContractEnterpriseId)
            setContractLists(filterContractEnterpriseId)
        }

    })()
},[])

//Filtrage pour la recherche du contrat
function onSearch (input: string){

}

return {requireAdminRoles, getAdminRole}

}