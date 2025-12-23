import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { DepartmentsListHook } from "./hook/page";
import { tablesModal } from "@/components/Tables/tablesModal";

export default function DepartmentsList(){

    // const {departementListCloned, onSearch, setDepartmentList, departmentList, start, maxPage, limit} = DepartmentsListHook
    return (
        <div>
            <Header/>
            <div className="flex justify-center w-full mx-auto">
                <Sidebar/>

                <main className="m-4 bg-gray-100 font-semibold text-gray-700 dark:text-gray-300 dark:bg-transparent" >
                    {
                        tablesModal.map((e) => (
                            <div className="flex justify-between items-center">
                                <h1 className="text-[20px] my-4 font-bold dark:text-gray-300"> {e.departementLis.pageTitle} </h1>
                                <p className='text-blue-700 dark:text-blue-600 hidden xl:block'> {e.departementLis.path} </p>
                            </div>
                        ))
                    }

                    <hr className='bg-gray-400 border-0 h-[1px]' />

                </main>
            </div>
        </div>
    )
}