"use client";
import { controllers, urlAPI } from "@/app/main";
import { useEffect, useState } from "react";

type Quarters = {
    id: number,
    name: string | null,
    District: {
        name: string | null
    },
    City: {
        name: string | null
    },
    Country: {
        name: string | null
    }
}

export function GetQuartersHook() {
    const [quarters, setQuarters] = useState<Quarters[]>([]);
    const [quartersArrayCloned, setQuartersArrayCloned] = useState<Quarters[]>([]);
    const [getAdminRole, setAdminRole] = useState("");
    const requireAdminRoles = ["Super-Admin", "Supervisor-Admin"];
    const [page, setPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        (async () => {
            const adminRole = window?.localStorage.getItem("adminRole");
            const quarters = await controllers.API.getAll(urlAPI, "getQuarters", null);
            setQuarters(quarters);
            setQuartersArrayCloned(quarters);
            setAdminRole(adminRole ?? "")
        })()
    }, []);

    return { quartersArrayCloned, page, setPage, limit, requireAdminRoles, getAdminRole};
}