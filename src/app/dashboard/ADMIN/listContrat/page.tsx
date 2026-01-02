// "use client"
// import { Header } from "@/components/Layouts/header";
// import { Sidebar } from "@/components/Layouts/sidebar";
// import { tablesModal } from "@/components/Tables/tablesModal";
// import contractListHook from "./hook/page";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";
// import Swal from "sweetalert2";
// import { controllers, urlAPI } from "@/app/main";

// export default function ListContrat (){

   // const {onSearch, contractListCloned, limit, start, page, maxPage,  setPage, requireAdminRoles, getAdminRole} = contractListHook()


   // return(
   //     <div>
   //         <Header/>
   //         <div className="flex min-h-screen w-full">
   //             <Sidebar/>

   //             <main className="flex-1 flex justify-center">
   //                 <div className="w-full max-w-7xl m-4 bg-gray-100 font-semibold text-gray-700 dark:text-gray-300 dark:bg-transparent">

    //                    {
    //                        tablesModal.map((e) => (
    //                            <div className="flex items-center justify-between gap-4">
    //                                <h1 className="text-[20px] my-4 font-bold dark:text-gray-300" >{e.contractList.pageTitle}</h1>
    //                                <p className="text-blue-700 dark:text-blue-600 hidden xl:block">{e.contractList.path}</p>
    //                            </div>

    //                        ))
    //                    }

    //                    <hr className='bg-gray-400 border-0 h-[1px]' />
    //                    <div className="flex flex-col justify-between items-center space-y-4 xl:space-y-0  lg:flex-row " >
    //                        <div className="relative w-[250px] mt-4">
    //                            <input placeholder="Rechercher un contrat..." type="text"
    //                            onChange={(u) => {
    //                                onSearch(u.target.value)
    //                                
    //                            }} className=" border  outline-none border-gray-300 dark:bg-transparent px-4 py-3 pr-8 rounded-md my-6 w-full"/>
//
    //                            <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    //                        </div>
//
    //                        {
    //                            tablesModal.map((item) => (
    //                                item.contractList.links.map((e) => (
    //                                    <Link href={e.href} className="bg-blue-800 hover:bg-blue-900 ease duration-500 py-3 px-4" >
    //                                        <FontAwesomeIcon icon={e.icon} />
    //                                        <span className="text-white font-semibold" >{e.title}</span>
    //                                    </Link>
    //                                ))
    //                            ))
    //                        }
//
    //                    </div>
//
    //                    <table className="border w-full mx-auto mt-8">
    //                        {/**Tête du tableau */}
    //                        <thead>
    //                            <tr className="bg-gray-800 dark:bg-transparent ">
    //                                {
    //                                    tablesModal.map((e) => (
    //                                        e.contractList.tables.titles.map((item) => (
    //                                            <th className="border py-2 xl:px-5 border-gray-400 dark:border-gray-300 text-gray-300  2xl:px-10 px-2 dark:text-gray-300">
    //                                                {item.title}
    //                                            </th>
    //                                        ))
    //                                    ))
    //                                }
//
    //                            </tr>
    //                        </thead>
    //                        
    //                        {/**Corps du tableau */}
    //                        <tbody>
    //                            {
    //                                contractListCloned.length > 0 && (
    //                                    contractListCloned.slice(start, start + limit).map((v) => (
    //                                        <tr>
    //                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{v?.startDate}</td>
    //                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{v?.endDate}</td>
    //                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{v?.delay}</td>
    //                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{v.ContractType.title}</td>
    //                                        <td className="border p-2 border-gray-400 dark:border-gray-300  text-center font-semibold dark:text-gray-300">{v?.Enterprise.name}</td>
//
    //                                        <td className="text-center py-5 font-semibold border-b border-r  space-x-3 flex justify-center h-auto p-2 border-gray-400 dark:border-gray-300">
    //                                            <button onClick={() => {
    //                                                if(!requireAdminRoles.includes(getAdminRole ?? "")){
    //                                                    return Swal.fire({
    //                                                      icon: "warning",
    //                                                      title: "Vioaltion d'accès!",
    //                                                      text: "Vous n'avez aucun droit d'effectuer cette opération. Veuillez contacter votre administrateur local"
    //                                                    })
    //                                                }
//
    //                                                Swal.fire({
    //                                                    icon: "warning",
    //                                                    title: "Voulez-vous supprimer ce poste ?",
    //                                                    showCancelButton: true,
    //                                                    cancelButtonText: "Annuler",
    //                                                    confirmButtonText: "Oui"
    //                                                }).then(async (confirmed) => {
    //                                                    if(confirmed.isConfirmed){
    //                                                        const methodName = "deleteContract"
    //                                                        const response = await controllers.API.getAll(urlAPI, methodName, null)
    //                                                        controllers.alertMessage(response.status, 
    //                                                        response.title, 
    //                                                        response.message, 
    //                                                        "/pages/dashboard/ADMIN/listContrat")
    //                                                    }
    //                                                })
//
    //                                            }}
    //                                             className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md">
//
    //                                            </button>
//
    //                                            <button type="button" onClick={() => {
    //                                                 if(!requireAdminRoles.includes(getAdminRole ?? "")){
    //                                                     return Swal.fire({
    //                                                        icon: "warning",
    //                                                        title: "Vioaltion d'accès!",
    //                                                        text: "Vous n'avez aucun droit d'effectuer cette opération. Veuillez contacter votre administrateur local"
    //                                                    })
    //                                                 }
    //                                             }}
    //                                              className="bg-gray-300 hover:scale-105 ease duration-500 p-2 rounded-md" >
    //                                                 <p className="text-center">🗑️</p>
    //
    //                                             </button>
    //                                        </td>
    //                                        </tr>
    //                                    ))
//
    //                                )
    //                                
    //                            }
//
    //                        </tbody>
    //                    </table>
//
    //                    <div className="flex items-center justify-center space-x-4 mt-14">
//
    //                    <button className="px-4 py-2 bg-green-500 ease duration-500
    //                     hover:bg-green-600 text-white font-semibold rounded disabled:opacity-40"
    //                     onClick={() => {
    //                        setPage(page - 1)
    //                     }} disabled={page === 1}>
    //                        Suivant
    //                    </button>
//
    //                    <span> 
    //                        Page {page} / {maxPage} 
    //                    </span>
//
    //                    <button className="px-4 py-2  font-semibold text-white ease duration-500
    //                     hover:bg-red-600 bg-red-500 rounded disabled:opacity-40"
    //                     onClick={() => {
    //                        setPage(page + 1)
    //                     }} disabled={page === maxPage}>
//
    //                        Précédent
    //                    </button>
//
//
    //                </div>
//
    //                </div>
    //            </main>
    //        </div>
    //    </div>
    //)
//}