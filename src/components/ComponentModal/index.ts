"use client";
import { controllers, urlAPI } from "@/app/main";
import { useEffect, useState } from "react";

type RepportsValue = {
    title: string,
    content: string,
    files: string,
    UserId: number,
    EnterpriseId: number,
    monthIndice: number,
    createdAt: string,
    adminResponse: string,
    User: {
        firstname: string,
        lastname: string,
        email: string,
        photo: string,
    }
}

export default function HookComponentModal() {

    const [repports, setRepports] = useState<RepportsValue[]>([]);
    let EnterpriseId = localStorage.getItem("EnterpriseId");

    useEffect(() => {
        (async () => {
            const allRepports = await controllers.API.getAll(urlAPI, "getAllRepports", null);
            if (parseInt(EnterpriseId ?? "") !== 1) {
                const getRepportsByEnterprise = allRepports.filter((repport: { EnterpriseId: number }) => repport.EnterpriseId === parseInt(EnterpriseId ?? ""));
                return setRepports(getRepportsByEnterprise)
            }
            const getRepportsByEnterprise = allRepports.filter((repport: { EnterpriseId: number }) => repport.EnterpriseId === 1 || repport.EnterpriseId === 4);
            setRepports(getRepportsByEnterprise)
        })()
    }, [])

    const ComponentModal = [
        {
            Repport: {
                titlePage: "Liste des rapports",
                path: "Dashboard/Administration/Rapports",
                repportsArray: repports
            }
        }
    ]

    return ComponentModal;
}
