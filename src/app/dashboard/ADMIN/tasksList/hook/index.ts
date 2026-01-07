"use client";

import { controllers, urlAPI } from "@/app/main";
import HookComponentModal from "@/components/ComponentModal";
import { isValidElement, useEffect, useState } from "react";

type RepportsValue = {
    id: number,
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

export function TasksListHook() {
    const ComponentModal = HookComponentModal();
    const [itemIndex, setItemIndex] = useState<number | null>(null);
    const [itemIndexOnWriting, setItemIndexOnWriting] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [adminResponse, setAdminResponse] = useState("");
    const [monthIndice, setMonthIndice] = useState(new Date().getMonth());
    const [RepportsArray, setRepportsArray] = useState<RepportsValue[]>([]);
    const [repportsArrayCloned, setRepportsArrayCloned] = useState<RepportsValue[]>([]);
    const [EnterpriseId, setEnterpriseId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (() => {
            if (typeof (window) === undefined) return;
            let EnterpriseId = window?.localStorage.getItem("EnterpriseId");
            setRepportsArray(ComponentModal[1].Task?.taskArray ?? []);
            setRepportsArrayCloned(ComponentModal[1].Task?.taskArray ?? []);
            setEnterpriseId(EnterpriseId)
        })()
    }, [ComponentModal[1].Task?.taskArray]);

    const monthsOfYear = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
    ];

    function navigateBetweenMonths(repportArray: RepportsValue[], monthIndice: number, EnterpriseId: number) {
        const newRepportsArray = repportArray.filter(repport => repport.EnterpriseId === EnterpriseId && repport.monthIndice === monthIndice);
        return setRepportsArrayCloned(newRepportsArray)
    }

    function filterRepportsByUsersNames(value: string, monthIndice: number) {
        const repports = RepportsArray.filter(repport => (repport.User?.firstname.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()) || repport.User?.lastname.toLocaleLowerCase()?.includes(value.toLocaleLowerCase())) && repport.monthIndice === monthIndice);
        setRepportsArrayCloned(repports)
    }

    async function sendAdminResponse(adminResponse: string, tableName: string, id: number, email: string, UserId: number, lastname: string, firstname: string) {
        setIsLoading(true);

        if (adminResponse === "") {
            return setTimeout(() => {
                controllers.alertMessage(false, "Champs invalides", "Veuillez saisir un commentaire", null);
                setIsLoading(false)
            }, 1500);
        }

        const response = await controllers.API.UpdateOne(urlAPI, "sendResponseAdmin", id, { adminResponse, tableName, UserId, email, lastname, firstname });

        controllers.alertMessage(response.status, response.title, response.message, response.status ? "/dashboard/ADMIN/repportsList" : null);
        setIsLoading(false);
    }

    return { itemIndex, setItemIndex, isVisible, setIsVisible, itemIndexOnWriting, setItemIndexOnWriting, setAdminResponse, setMonthIndice, monthIndice, repportsArrayCloned, EnterpriseId, ComponentModal, filterRepportsByUsersNames, navigateBetweenMonths, adminResponse, monthsOfYear, RepportsArray, sendAdminResponse, isLoading, setIsLoading, }
}