'use client';
import { urlAPI } from "@/app/main";
import { controllers } from "@/app/main";
import { FormEvent, useEffect, useState } from "react";

type DynamicArrayData = {
    alias: string,
    arrayData: {
        value: any,
        title: string,
    }[],
}

type InputsValue = {
    EnterpriseId: number | null,
    DepartmentPostId: number | null,
    title: string | null,
    description: string | null,
    [key: string]: string | number | null
}

export default function AddOrUpdatePostHookModal() {
    const [enterprises, setEnterprises] = useState<any[]>([]);
    const [getDepartmentPosts, setGetDepartmentPosts] = useState<any[]>([]);
    const [EnterpriseId, setEnterpriseId] = useState(0);
    const [getEnterpriseIdOfadmin, setEnterpriseIdOfAdmin] = useState<string | null>(null);
    const [getAdminRole, setAdminRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState<InputsValue>({
        EnterpriseId: null,
        DepartmentPostId: null,
        title: null,
        description: null,
    });

    //Récupère les données de champs en mémoire
    useEffect(() => {
        if (typeof (window) === "undefined") return;
        (() => {
            const inputMemory = window?.localStorage.getItem("inputMemoryAddPost");
            inputMemory ? setInputs(JSON.parse(inputMemory ?? "")) : setInputs({ ...inputs });
            setDynamicArrayDatasCloned(dynamicArrayDatas);
        })();
    }, []);

    // Récupération des entreprises et filtrage en fonction de l'id de l'administrateur courant
    useEffect(() => {
        if (typeof (window) === "undefined") return;
        (async () => {
            const role = window?.localStorage.getItem("adminRole");
            const getEnterpriseIdOfAdmin = window?.localStorage.getItem("EnterpriseId");

            const enterprises = await controllers.API.getAll(urlAPI, "getEnterprises", null);

            if (parseInt(getEnterpriseIdOfAdmin ?? "") !== 1) {
                const filterEnterpriseByEnterpriseId = enterprises.filter(
                    (enterprise: { id: number }) => enterprise.id === parseInt(getEnterpriseIdOfAdmin ?? "")
                );
                setEnterprises(filterEnterpriseByEnterpriseId);
                return;
            }

            setEnterprises(enterprises);
            setEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin);
            setAdminRole(role);
        })();
    }, []);

    // Récupération des départements d'entreprises
    useEffect(() => {
        (async () => {
            const getDepartmentPosts = await controllers.API.getAll(urlAPI, "getDepartmentPosts", null);
            if (getAdminRole !== "Super-Admin") {
                const filteredDepartmentPosts = getDepartmentPosts.filter((department: { EnterpriseId: number }) => department.EnterpriseId === EnterpriseId);
                setGetDepartmentPosts(filteredDepartmentPosts)
            } else {
                setGetDepartmentPosts(getDepartmentPosts)
            }
        })()
    }, [inputs.EnterpriseId]);

    // const adminRoles = ['Super-Admin', 'Supervisor-Admin'];
    // const role = window?.localStorage.getItem("adminRole") ?? "";

    let dynamicArrayDatas: DynamicArrayData[] = [
        {
            alias: "EnterpriseId",
            arrayData: enterprises.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },
        {
            alias: "DepartmentPostId",
            arrayData: getDepartmentPosts.filter(item => item.id && item.name).map(item => ({ value: item.id, title: item.name }))
        },
    ];

    let staticArrayData = [
        {
            alias: "gender",
            arrayData: [
                { title: "Homme", value: "Homme" },
                {
                    title: "Femme",
                    value: "Femme"
                },
                {
                    title: "Aucun",
                    value: "Aucun"
                }
            ]

        },

        {
            alias: "role",
            arrayData: [
                {
                    title: "Super administrateur",
                    value: "Super-Admin"
                },
                {
                    title: "Administrateur de gestion",
                    value: "Supervisor-Admin"
                },
                {
                    title: "Administrateur de contrôle",
                    value: "Controllor-Admin"
                }
            ]
        },
    ]

    const [dynamicArrayDatasCloned, setDynamicArrayDatasCloned] = useState<DynamicArrayData[]>([]);

    const handleSubmit = async () => {
        setIsLoading(true);

        const response = await controllers.API.SendOne(urlAPI, "createPoste", null, inputs);

        if (response.status) window?.localStorage.removeItem("inputMemory")

        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? "/dashboard/ADMIN/addPost" : null
        );

        setIsLoading(false);
    };

    return { dynamicArrayDatas, staticArrayData, inputs, setInputs, isLoading, handleSubmit, dynamicArrayDatasCloned }
}