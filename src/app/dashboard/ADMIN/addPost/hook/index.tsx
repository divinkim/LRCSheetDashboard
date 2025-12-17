'use client';
import { urlAPI } from "@/app/main";
import { controllers } from "@/app/main";
import { FormEvent, useEffect, useState } from "react";

export default function AddOrUpdatePostHookModal() {
    const [enterprises, setEnterprises] = useState<any[]>([]);
    const [getDepartmentPosts, setGetDepartmentPosts] = useState<any[]>([]);

    const [getEnterpriseIdOfadmin, setEnterpriseIdOfAdmin] = useState<string | null>(null)
    const [getAdminRole, setAdminRole] = useState<string | null>(null)

    // Récupération des entreprises et filtrage en fonction de l'id de l'administrateur courant
    useEffect(() => {
        if (typeof (window) === "undefined") return; // important
        (async () => {
            const role = localStorage.getItem("adminRole");
            const getEnterpriseIdOfAdmin = localStorage.getItem("EnterpriseId");

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
                const filteredDepartmentPosts = getDepartmentPosts.filter((department: { EnterpriseId: number }) => department.EnterpriseId === parseInt(getEnterpriseIdOfadmin ?? ""));
                setGetDepartmentPosts(filteredDepartmentPosts)
            } else {
                setGetDepartmentPosts(getDepartmentPosts)
            }
        })()
    }, [enterprises]);

    // const adminRoles = ['Super-Admin', 'Supervisor-Admin'];
    // const role = localStorage.getItem("adminRole") ?? "";

    let dynamicArrayDatas = [
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

    return { dynamicArrayDatas, staticArrayData }
}