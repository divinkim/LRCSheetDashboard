import { controllers } from "@/app/main"
import { urlAPI } from "@/app/main";
import { useEffect, useState } from "react"

type ContratValues = {
    startDate: number | null,
    endDate: number | null,
    delay: number | null,
    ContractType: string | null,
    Enterprise: string | null,
    contractTypeId: number | null,
    enterpriseId: number | null


}

export default function listContrat(){

    const [getContrat, setGetContrat] = useState<any []>([])
    const [inputsValues, setInputsValues] = useState<ContratValues>({
        startDate: null,
        endDate: null,
        delay: null,
        ContractType: null,
        Enterprise: null,
        contractTypeId: null,
        enterpriseId: null
    })

    //Récupérer la liste des contrats
    useEffect(() => {
        (async () => {
            
          const methodName = "getContracts"
          const getContrat = await controllers.API.getAll(urlAPI, methodName, null)
          const filteredContrat = getContrat.filter((item: {ContractTypeId: number, EnterpriseId: number}) => item.ContractTypeId === inputsValues.contractTypeId && item.EnterpriseId === inputsValues.enterpriseId)
          setGetContrat(filteredContrat)
          console.log("La liste des contrats:",filteredContrat)
          
        })()
    }, [inputsValues.contractTypeId, inputsValues.enterpriseId])

    
    return (
        <div></div>
    )
}