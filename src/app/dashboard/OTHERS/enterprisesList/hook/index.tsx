'use client';
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { controllers } from "@/app/main";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { formElements } from "@/components/FormElements/forms";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { urlAPI } from "@/app/main";
import { cn } from "@/lib/utils";

type EnterpriseProps = {
    id: number,
    name: string | null,
    description: string | null,
    logo: string | null,
    activityDomain: string | null,
    phone: string | null,
    toleranceTime: string | null,
    pourcentageOfHourlyDeduction: string | null,
    email: string | null,
    address: string | null,
    website: string | null,
    latitude: string | null,
    longitude: string | null,
    CityId: number,
    CountryId: number,
    legalForm: string | null,
    rccm: string | null,
    nui: string | null,
    subscriptionType: string | null,
    subscriptionStatus: string | null,
    [key: string]: string | number | null | undefined,
}

export function EnterprisesListHookModal() {
    const [enterprises, setEnterprises] = useState<EnterpriseProps[]>([]);
    const [searchData, setSearchData] = useState("");
    const limit = 5;
    const requireRoles = ['Super-Admin', 'Supervisor-Admin'];
    const [getAdminRole, setAdminRole] = useState<string | null>();
    const [page, setPage] = useState(1);  

    useEffect(() => {
        (async () => {
            const getAllEnterprises = await controllers.API.getAll(urlAPI, "getEnterprises", null);
            setEnterprises(getAllEnterprises);
        })()
    }, []);

    useEffect(() => {
        (() => {
            if (typeof (window) === "undefined") return;
            const authToken = localStorage.getItem("authToken");
            const getAdminRole = localStorage.getItem("adminRole");

            if (authToken === null) {
                window.location.href = "/"
            }
            setAdminRole(getAdminRole);
        })()
    }, []);

    // 📑 Pagination
    const start = (page - 1) * limit;
    const maxPage = Math.ceil(enterprises.length / limit);

    // 🔎 Filtrer par recherche
    function onSearch(value: string) {
        let filteredEntreprises = enterprises.filter(item => item?.name?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()));
        setEnterprises(filteredEntreprises);
        setSearchData(value);
    }

    useEffect(() => {
        onSearch(searchData);
    }, [searchData])

    return {  enterprises, onSearch, 
      
    }
}