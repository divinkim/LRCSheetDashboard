import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";

export default function ContractsList(){
    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />

            <div className="flex">
                <Sidebar/>

            </div>
            
            
        </main>
    )
}