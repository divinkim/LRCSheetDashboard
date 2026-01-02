"use client";
import { controllers, urlAPI } from "@/app/main";
import { useEffect, useState } from "react";

type Districts = {
    id: number,
    name: string | null,
    City: {
        name: string | null
    },
    Country: {
        name: string | null
    }
}

export function GetDistrictsHook() {
    const [districts, setdistricts] = useState<Districts[]>([]);
    const [districtsArrayCloned, setdistrictsArrayCloned] = useState<Districts[]>([]);
    const [getAdminRole, setAdminRole] = useState("");
    const requireAdminRoles = ["Super-Admin", "Supervisor-Admin"];
    const [page, setPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        (async () => {
            const adminRole = window?.localStorage.getItem("adminRole");
            const districts = await controllers.API.getAll(urlAPI, "getdistricts", null);
            setdistricts(districts);
            setdistrictsArrayCloned(districts);
            setAdminRole(adminRole ?? "")
        })()
    }, []);

    return { districtsArrayCloned, page, setPage, limit, requireAdminRoles, getAdminRole};
}