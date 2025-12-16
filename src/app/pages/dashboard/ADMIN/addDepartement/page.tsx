'use client'
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";


export default function AddDepartment(){
    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header/>

            <div>
            <Sidebar/>


            </div>
            
        </main>
    )
}