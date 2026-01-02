"use client";
import { controllers, urlAPI } from "@/app/main";
import { useEffect, useState } from "react";

type Districts = {
    id: number,
    name: string | null,
    Country: {
        name: string | null
    }
}

export function GetDistrictsHook() {
    const [cities, setCities] = useState<Districts[]>([]);
    const [citiesArrayCloned, setCitiesArrayCloned] = useState<Districts[]>([]);
    const [getAdminRole, setAdminRole] = useState("");
    const requireAdminRoles = ["Super-Admin", "Supervisor-Admin"];
    const [page, setPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        (async () => {
            const adminRole = window?.localStorage.getItem("adminRole");
            const cities = await controllers.API.getAll(urlAPI, "getCities", null);
            setCities(cities);
            setCitiesArrayCloned(cities);
            setAdminRole(adminRole ?? "")
        })()
    }, []);

    return { citiesArrayCloned, page, setPage, limit, requireAdminRoles, getAdminRole};
}