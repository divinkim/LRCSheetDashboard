"use client"
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { DepartmentsListHook } from "./hook/page";
import { tablesModal } from "@/components/Tables/tablesModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faS, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Swal from "sweetalert2";
import { controllers, urlAPI } from "@/app/main";

export default function DepartmentsList(){

     const {departementListCloned, onSearch, start, maxPage, requireAdminRoles, getAdminRole, page, setPage, limit } = DepartmentsListHook()
    return (
        <div className="">
            <Header/>
            <div className="flex justify-center w-full mx-auto ">
                <Sidebar/>

                <main className="m-4 bg-gray-100 font-semibold text-gray-700 dark:text-gray-300 dark:bg-transparent" >
                    {
                        tablesModal.map((e) => (
                            <div className="flex justify-between items-center">
                                <h1 className="text-[20px] my-4 font-bold dark:text-gray-300"> {e.departementList.pageTitle} </h1>
                                <p className='text-blue-700 dark:text-blue-600 hidden xl:block'> {e.departementList.path} </p>
                            </div>
                        ))
                    }

                    <hr className='bg-gray-400 border-0 h-[1px]' />
                    <div className="flex flex-col justify-between items-center space-y-4 xl:space-y-0  lg:flex-row ">

                        <div className="relative w-[250px] mt-4" >
                            <input type="texte" placeholder="Rechercher un département..." 
                            onChange={(u) => {
                                onSearch(u.target.value)
                                
                            }} 
                            className=" border  outline-none border-gray-300 dark:bg-transparent px-3 py-2.5 rounded-md my-6 w-full"/>

                            <FontAwesomeIcon icon={faSearch} 
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /> 

                        </div>

                        {
                            tablesModal.map((item) => (
                                item.departementList.links.map((e) => (
                                    <Link href={e.href} className="bg-blue-800 hover:bg-blue-900 ease duration-500 py-3 px-4">
                                    <FontAwesomeIcon icon={e.icon}/>
                                    <span className="text-white font-semibold">{e.title}</span>
                                    </Link>
                                ))
                            ))
                        }

                    </div>

                    <table className="border w-full mx-auto mt-8">
                        <thead >
                            <tr className="bg-gray-800 dark:bg-transparent ">

                            {
                                tablesModal.map((item) => (
                                    item.departementList.table.titles.map((e) => (
                                        <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-300  2xl:px-10 px-2 dark:text-gray-300">
                                            {e.title}
                                         </th>
                                    ))
                                ))
                            }
                            </tr>


                        </thead>

                        <tbody>
                            {
                                departementListCloned.length > 0 ? departementListCloned.slice(start, start + limit).map((v) => (
                                    <tr>
                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{v.name}</td>
                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{v.description}</td>
                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{v?.Enterprise.name}</td>
                                        <td className="text-center py-5 font-semibold border-b border-r  space-x-3 flex justify-center h-auto p-2 border-gray-400 dark:border-gray-300">
                                            <button type="button" className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md" 
                                            onClick={() => {
                                                if(!requireAdminRoles.includes(getAdminRole ?? "")){
                                                    return Swal.fire({
                                                        icon: "warning",
                                                        title: "Vioaltion d'accès!",
                                                        text: "Vous n'avez aucun droit d'effectuer cette opération. Veuillez contacter votre administrateur local"
                                                    })

                                                }
                                                Swal.fire({
                                                    icon: "warning",
                                                    title: "Voulez-vous supprimer ce poste ?",
                                                    showCancelButton: true,
                                                    cancelButtonText: "Annuler",
                                                    confirmButtonText: "Oui"
                                                }).then( async (confirmed) => {
                                                    if(confirmed.isConfirmed){
                                                        const methodName = "deleteDepartmentPosts"
                                                        const response = await controllers.API.deleteOne(urlAPI, methodName, v.id, {})
                                                        controllers.alertMessage(response.status, 
                                                            response.title, 
                                                            response.message, 
                                                            "/pages/dashboard/ADMIN/departmentsList")
                                                    }
                                                })
                                            }} >

                                                <Link href={`/dashboard/ADMIN/updateDepartment/${v.id}`} >
                                                <p className="text-center">🖊️</p>
                                                </Link>

                                            </button>
                                            <button type="button" onClick={() => {
                                                if(!requireAdminRoles.includes(getAdminRole ?? "")){
                                                    return Swal.fire({
                                                       icon: "warning",
                                                       title: "Vioaltion d'accès!",
                                                       text: "Vous n'avez aucun droit d'effectuer cette opération. Veuillez contacter votre administrateur local"
                                                   })
                                                }
                                            }} className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md" >
                                                <p className="text-center">🗑️</p>

                                            </button>

                                        </td>
                                    </tr>

                                ))
                                :
                                <tr>
                                    <td>
                                        <p className="text-center absolute left-1/2 right-1/2 w-[200px] mt-3">
                                            Aucune donnée trouvée
                                        </p>
                                    </td>

                                </tr>

                            }

                        </tbody>
                    </table>

                    <div className="flex items-center justify-center space-x-4 mt-14">

                        <button className="px-4 py-2 bg-green-500 ease duration-500
                         hover:bg-green-600 text-white font-semibold rounded disabled:opacity-40"
                         onClick={() => {
                            setPage(page - 1)
                         }} disabled={page === 1}>
                            Suivant
                        </button>
                        <span>Page {page} / {maxPage} </span>
                        Précédent

                    </div>

                </main>
            </div>
        </div>
    )
}