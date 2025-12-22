"use client";
import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";

type SalariesList = {
    id:number,
    grossSalary: string | null,
    dailySalary: string | null,
    Enterprise: {
        name: string,
    },
    Post: {
        title: string
    },
}

export function PostsListHook() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);             // page courante
    const limit = 5;                                 // items par page


    const [salariesList, setSalariesList] = useState<SalariesList[]>([]);
    const [salariesListCloned, setSalariesListCloned] = useState<SalariesList[]>([]);

    const getAdminRole = localStorage.getItem("adminRole");
    const [loading, setIsLoading] = useState(false);
    const requireAdminRoles = ['Super-Admin', 'Supervisor-Admin'];

    useEffect(() => {
        (() => {
            const authToken = localStorage.getItem("authToken");
            if (authToken === null) {
                window.location.href = "/"
            }
        })()
    }, []);

    useEffect(() => {
        (async () => {
            let getEnterpriseIdOfAdmin = localStorage.getItem("EnterpriseId");

            const request = await controllers.API.getAll(urlAPI, "getSalaries", null);

            if (parseInt(getEnterpriseIdOfAdmin ?? "") === 1) {
                const filterPostsByAdminEnterpriseId = request.filter((salary: { EnterpriseId: number }) => [1, 2, 3, 4].includes(salary.EnterpriseId));
                setSalariesList(filterPostsByAdminEnterpriseId);
                setSalariesListCloned(filterPostsByAdminEnterpriseId)
            } else {
                const filterPostByEnterpriseId = request.filter((salary: { EnterpriseId: number }) => salary.EnterpriseId === parseInt(getEnterpriseIdOfAdmin ?? ""));
               setSalariesList(filterPostByEnterpriseId);
               setSalariesListCloned(filterPostByEnterpriseId);
            }
        })();
    }, []);

    // 🔎 Filtrer par recherche
    function onSearch(value: string) {
        let filtered = salariesList.filter(salary => salary?.Post?.title.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()))
        setSalariesListCloned(filtered)
    }

    // 📑 Pagination
    const start = (page - 1) * limit;
    const maxPage = Math.ceil(salariesListCloned.length / limit);

    const arrayUsersRefactory = salariesListCloned;

    return { salariesListCloned, start, maxPage, onSearch, requireAdminRoles, getAdminRole, limit, setPage, page};
}