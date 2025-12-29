"use client";

import { controllers, urlAPI } from "@/app/main";
import { useEffect, useState } from "react";

type DepartmentList = {
    id: number,
    name: string | null,
    description: string | null,
    Enterprise: {
        name: number
    }
}

export function DepartmentsListHook (){

    const [search, setSearch] = useState("");
    const [departmentList, setDepartmentList] = useState<DepartmentList[]>([]) //page actuel
    const [departementListCloned, setDepartmentListCloned] = useState<DepartmentList[]>([]) // liste des pages filtrées (recherche, pagination)

    const getAdminRole = localStorage.getItem("authRole") // rôle de l’admin connecté
    const requireAdminRoles = ['Super-Admin', 'Supervisor-Admin'] // rôles autorisés pour certaines actions (ex: créer, modifier, supprimer)

    const [page, setPage] = useState(1)
    const limit = 5

    //Vérification du token
    useEffect(() => {
        (() => {
            const authToken = localStorage.getItem("authToken")
            if(authToken === null){
                window.location.href = "/" //rédiriger vers le login
            }

        })()
    },[])

    //Récupération et filtrage des départements
    useEffect(() => {
        (async () => {

            let getEnterpriseIdOfAdmin = localStorage.getItem("EnterpriseId") // On récupère l’EnterpriseId de l’admin

            const methodName = "getDepartmentPosts"
            const response = await controllers.API.getAll(urlAPI, methodName, null)

            //Cas super admin
            if(parseInt(getEnterpriseIdOfAdmin ?? "") === 1){ // Si l’admin appartient à l’entreprise 1
                const filterDepartmentByAdminEnterpriseId = response.filter((item: {EnterpriseId: number}) => 
                    [1,2,3,4].includes(item.EnterpriseId)) //l peut voir les départements des entreprises 1,2,3,4
                setDepartmentList(filterDepartmentByAdminEnterpriseId)
                setDepartmentListCloned(filterDepartmentByAdminEnterpriseId)

            } 
            else{
                const filterDepartmentEnterpriseId = response.filter((item: {EnterpriseId: number}) => 
                  item.EnterpriseId === parseInt(getEnterpriseIdOfAdmin ?? ""))
                setDepartmentList(filterDepartmentEnterpriseId)
                setDepartmentListCloned(filterDepartmentEnterpriseId)
            }

        })()
    },[])

    //Filtrage pour la recherche du département
    function onSearch(input: string){
    const filtered = departmentList.filter(item => item?.name?.toLocaleLowerCase()?.includes(input.toLocaleLowerCase()))
    setDepartmentListCloned(filtered)

    }

    const start = (page - 1) * limit // index de départ pour slice
     const maxPage = Math.ceil(departementListCloned.length / limit)// nombre total de pages

    return {onSearch, departementListCloned, getAdminRole, requireAdminRoles, maxPage, start, page, setPage, limit}

}