'use client';

import { useEffect, useState } from "react";
import { controllers } from "@/app/main";
import { urlAPI } from "@/app/main";

type Salary = {
    grossSalary: string | null,
    dailySalary: string | null,
    EnterpriseId: number,
    PostId: number,
}

export function AddSalaryHookModal() {
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState<Salary>({
        grossSalary: null,
        dailySalary: null,
        EnterpriseId: 0,
        PostId: 0,
    });

    const [getEnterprises, setGetEnterprises] = useState<any[]>([]);
    const [getEnterpriseIdOfadmin, setEnterpriseIdOfAdmin] = useState<string | null>(null);
    const [getAdminRole, setAdminRole] = useState<string | null>(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const authToken = window?.localStorage.getItem("authToken");
            const role = window?.localStorage.getItem("adminRole");
            let getEnterpriseIdOfAdmin = window?.localStorage.getItem("EnterpriseId");

            setEnterpriseIdOfAdmin(getEnterpriseIdOfAdmin);
            setAdminRole(role)
            const getEnterprises = await controllers.API.getAll(urlAPI, "getEnterprises", null);

            if (parseInt(getEnterpriseIdOfAdmin ?? "") !== 1) {

                const filterEnterpriseByEnterpriseId = getEnterprises.filter((enterprise: { id: number }) => enterprise.id === parseInt(getEnterpriseIdOfAdmin ?? ""));
                setGetEnterprises(filterEnterpriseByEnterpriseId);
                return
            }
            setGetEnterprises(getEnterprises);
            console.log(getEnterprises);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const getPosts = await controllers.API.getAll(urlAPI, "getPosts", null);
            const filteredPosts = getPosts.filter((post: { EnterpriseId: number }) => post.EnterpriseId === inputs.EnterpriseId);
            setPosts(filteredPosts)
            console.log(filteredPosts);
        })()
    }, [inputs.EnterpriseId]);

    const dynamicOptions = [
        {
            alias: "EnterpriseId",
            arrayMaped: getEnterprises.filter((enterprise: { id: number, name: string }) => enterprise.id?.toString() && enterprise.name).map((enterprise: { id: number, name: string }) => ({ value: enterprise.id?.toString(), title: enterprise.name }))
        },
        {
            alias: "PostId",
            arrayMaped: posts.filter((post: { id: number, title: string }) => post.id?.toString() && post.title).map((post: { id: number, title: string }) => ({ value: post.id?.toString(), title: post.title }))
        }
    ]


    const handleSubmit = async () => {
        setIsLoading(true);
        const data = {
            ...inputs,
            netSalary: inputs.grossSalary
        }

        const response = await controllers.API.SendOne(urlAPI, "addSalary", null, data);
        controllers.alertMessage(
            response.status,
            response.title,
            response.message,
            response.status ? "/dashboard/COMPTA/addSalary" : null
        );

        setIsLoading(false);
    };
    return {isLoading, inputs, dynamicOptions, posts, setInputs, handleSubmit}
}