"use client";
import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";

type PostsList = {
    id:number,
    title: string | null,
    description: string | null,
    Enterprise: {
        name: string,
    },
    DepartmentPost: {
        name: string
    },
}

export function PostsListHook() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);             // page courante
    const limit = 5;                                 // items par page


    const [postsList, setPostsList] = useState<PostsList[]>([]);
    const [postsListCloned, setPostsListCloned] = useState<PostsList[]>([]);

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

            const request = await controllers.API.getAll(urlAPI, "getPosts", null);

            if (parseInt(getEnterpriseIdOfAdmin ?? "") === 1) {
                const filterPostsByAdminEnterpriseId = request.filter((post: { EnterpriseId: number }) => [1, 2, 3, 4].includes(post.EnterpriseId));
                setPostsList(filterPostsByAdminEnterpriseId);
                setPostsListCloned(filterPostsByAdminEnterpriseId)
            } else {
                const filterPostByEnterpriseId = request.filter((post: { EnterpriseId: number }) => post.EnterpriseId === parseInt(getEnterpriseIdOfAdmin ?? ""));
                setPostsList(filterPostByEnterpriseId);
                setPostsListCloned(filterPostByEnterpriseId);
            }
        })();
    }, []);

    // 🔎 Filtrer par recherche
    function onSearch(value: string) {
        let filtered = postsList.filter(item => item?.title?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()))
        setPostsListCloned(filtered)
    }

    // 📑 Pagination
    const start = (page - 1) * limit;
    const maxPage = Math.ceil(postsListCloned.length / limit);

    const arrayUsersRefactory = postsListCloned;

    return { postsListCloned, start, maxPage, onSearch, requireAdminRoles, getAdminRole, limit, setPage, page};
}