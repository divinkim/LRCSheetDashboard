'use client';
import { Header } from "@/components/Layouts/header";

import { Sidebar } from "@/components/Layouts/sidebar";
import { formElements } from "@/components/FormElements/forms";
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { controllers } from "@/app/main"
import { urlAPI } from "@/app/main";
import { FormEvent, useEffect, useState } from "react";

type input = {
    name: string | null,
    description: string | null,
    EnterpriseId: number | null,
    [key: string]: string | number | null | undefined

};


type dynamicArrayData = {
    alias: string,
    arrayData: {
        value: any,
        title: string
    }[]
}

export default function AddDepartmentHookUser() {

    const [getEnterprises, setGetEnterprises] = useState<any[]>([])
    const [getEnterpriseIdOfAdmin, setGetEnterpriseIdOfAdmin] = useState<string | null>(null);
    const [getAdminRole, setGetAdminRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dynamicArrayDatasCloned, setDynamicArrayDatasCloned] = useState<dynamicArrayData[]>([]);
    const [inputs, setInputs] = useState<input>({
        name: null,
        description: null,
        EnterpriseId: null,
    })

    // //Récupération des entreprises
    useEffect(() => {
        (async () => {
            const inputMemory = localStorage.getItem("inputMemoryOfAddDepartment")
            inputMemory ? setInputs(JSON.parse(inputMemory ?? "")) : setInputs({ ...inputs })

            const role = localStorage.getItem("adminRole")
            const getEnterpriseIdOfAdmin = localStorage.getItem("EnterpriseId")

            const methodName = "getEnterprises"
            const getEnterprises = await controllers.API.getAll(urlAPI, methodName, null)

            const filterEnterpriseByAdminEnterpriseId = getEnterprises.filter((item: { id: number }) => item.id === Number(getEnterpriseIdOfAdmin));

            setGetEnterprises(filterEnterpriseByAdminEnterpriseId)
            setGetEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin)
            setGetAdminRole(role)
            console.log("les entreprises", filterEnterpriseByAdminEnterpriseId)
        })()
    }, [])


    let DynamicArrayDatas: dynamicArrayData[] = [
        {
            alias: "EnterpriseId",
            arrayData: getEnterprises.filter(item => item.id && item.name).map(item => (
                { value: item.id, title: item.name }
            ))
        }
    ]

    const handleSubmit = async () => {
        setIsLoading(true);

        const methodName = "createDepartmentPost"
        const response = await controllers.API.SendOne(urlAPI, methodName, null, inputs)

        if (response.status)
            localStorage.removeItem("inputMemoryOfAddDepartment")

        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? "/dashboard/ADMIN/addDepartment" : null
        )

        setIsLoading(false)

    }


    return { DynamicArrayDatas, isLoading, dynamicArrayDatasCloned, handleSubmit, inputs, setInputs };
}