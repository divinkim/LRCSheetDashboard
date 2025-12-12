"use client";
import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";

type Users = {
    lastname: string | null,
    firstname: string | null
    id: number,
    PlanningId: number,
    EnterpriseId: number,
     photo: string | null
}

export default function AddOrEditUserPlanningOfWeek() {
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
        (async () => {
            let getEnterpriseId = localStorage.getItem("EnterpriseId");

            const users = await controllers.API.getAll(urlAPI, "getUsers", null);

            const filterUserByEnterpriseId = users.filter((user: { EnterpriseId: number }) => user.EnterpriseId === parseInt(getEnterpriseId ?? ""));

            setUsers(filterUserByEnterpriseId);

        })()
    }, []);

   const weekDays = [
    { id: 1, day: "lundi" },
    { id: 2, day: "mardi" },
    { id: 3, day: "mercredi" },
    { id: 4, day: "jeudi" },
    { id: 5, day: "vendredi" },
    { id: 6, day: "samedi" },
    { id: 7, day: "dimanche" }
];


    const addEditUserPlanningOfWeek = {
        addUserInPlanningOfWeek: {
            titlePage: "Ajout d'un collaborateur au planning",
            path: "Dashboard/RH/ajouter au collaborateur au planning",
        }
    }

    return { users, addEditUserPlanningOfWeek, weekDays}
}
