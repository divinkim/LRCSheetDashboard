"use client";
import { controllers, urlAPI } from "@/app/main";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { useEffect, useState } from "react";

type User = {
    firstname: string | null,
    lastname: string | null,
    birthDate: string | null,
    gender: string | null,
    email: string | null,
    password: string | null,
    phone: string | null,
    EnterpriseId: number | null,
    PostId: number | null,
    SalaryId: number | null,
    ContractTypeId: number | null,
    ContractId: number | null,
    CountryId: number | null,
    CityId: number | null,
    DistrictId: number | null,
    QuarterId: number | null,
    photo: string | null,
    role: string | null,
    DepartmentPostId: number | null,
    maritalStatus: string | null,
    adminService: string | null,
    status: string | null
}

export default function GetUserProfil() {

    const [user, setUser] = useState<User>({
        firstname: null,
        lastname: null,
        birthDate: null,
        gender: null,
        email: null,
        password: null,
        phone: null,
        EnterpriseId: null,
        PostId: null,
        SalaryId: null,
        ContractTypeId: null,
        ContractId: null,
        CountryId: null,
        CityId: null,
        DistrictId: null,
        QuarterId: null,
        photo: null,
        role: null,
        DepartmentPostId: null,
        maritalStatus: null,
        adminService: null,
        status: null
    });

    useEffect(() => {
        (async () => {
            const id = window.location.href.split("/").pop()
            if (!id) return;
            const getUser = await controllers.API.getOne(urlAPI, 'getUser', parseInt(id));

            setUser({
                firstname: getUser.firstname ?? null,
                lastname: getUser.lastname ?? null,
                birthDate: getUser.birthDate ? new Date(getUser.birthDate).toISOString().split("T")[0] : null,
                gender: getUser.gender ?? null,
                email: getUser.email ?? null,
                password: getUser.password ?? null,
                phone: getUser.phone ?? null,
                EnterpriseId: getUser.EnterpriseId ?? null,
                PostId: getUser.PostId ?? null,
                SalaryId: getUser.SalaryId ?? null,
                ContractTypeId: getUser.ContractTypeId ?? null,
                ContractId: getUser.ContractId ?? null,
                CountryId: getUser.CountryId ?? null,
                CityId: getUser.CityId ?? null,
                DistrictId: getUser.DistrictId ?? null,
                QuarterId: getUser.QuarterId ?? null,
                photo: getUser.photo ?? null,
                role: getUser.role ?? null,
                DepartmentPostId: getUser.DepartmentPostId ?? null,
                maritalStatus: getUser.maritalStatus ?? null,
                adminService: getUser.adminService ?? null,
                status: getUser.status ?? null
            });
        })();
    }, []);

    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mx-4 mt-6 mb-4 w-full">

                    <div className="flex justify-between mb-6">
                        <h1 className='dark:text-gray-300 text-[20px] text-gray-700 font-bold'>Profil de l'utilisateur</h1>
                        <p className="text-blue-600">Dashboard / RH / Profil utilisateur</p>
                    </div>

                    <hr className="bg-gray-400 h-[1px] border-0" />

                    <div className="mt-10 border border-gray-400 px-6 py-12 rounded-xl">

                        {/* Photo */}
                        <div className="mb-5 flex justify-start">
                            {user.photo ? (
                                <img
                                    className="object-cover w-[150px] h-[150px] rounded-full border border-gray-400"
                                    src={`${urlAPI}/images/${user.photo}`}
                                />
                            ) : (
                                <div className="w-[150px] h-[150px] bg-gray-300 rounded-full"></div>
                            )}
                        </div>

                        <hr className="bg-gray-400 h-[1px] border-0" />

                        {/* Informations */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-gray-700 mt-5 dark:text-gray-300 font-semibold">

                            <p><span className="font-bold">Nom :</span> {user.lastname}</p>
                            <p><span className="font-bold">Prénom :</span> {user.firstname}</p>

                            <p><span className="font-bold">Date de naissance :</span> {user.birthDate}</p>
                            <p><span className="font-bold">Genre :</span> {user.gender}</p>

                            <p><span className="font-bold">Email :</span> {user.email}</p>
                            <p><span className="font-bold">Téléphone :</span> {user.phone}</p>

                            <p><span className="font-bold">Role :</span> {user.role}</p>
                            <p><span className="font-bold">Statut :</span> {user.status}</p>

                            <p><span className="font-bold">État civil :</span> {user.maritalStatus}</p>
                            <p><span className="font-bold">Service Admin :</span> {user.adminService}</p>

                            <p><span className="font-bold">Entreprise :</span> {user.EnterpriseId}</p>
                            <p><span className="font-bold">Poste :</span> {user.PostId}</p>

                            <p><span className="font-bold">Département :</span> {user.DepartmentPostId}</p>
                            <p><span className="font-bold">Salaire :</span> {user.SalaryId}</p>

                            <p><span className="font-bold">Type de contrat :</span> {user.ContractTypeId}</p>
                            <p><span className="font-bold">Contrat :</span> {user.ContractId}</p>

                            <p><span className="font-bold">Pays :</span> {user.CountryId}</p>
                            <p><span className="font-bold">Ville :</span> {user.CityId}</p>

                            <p><span className="font-bold">District :</span> {user.DistrictId}</p>
                            <p><span className="font-bold">Quartier :</span> {user.QuarterId}</p>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
