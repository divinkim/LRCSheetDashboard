import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

export default function PresencesList() {
    return (
        <main>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="m-4">
                    <h2 className='text-[20px] font-bold'>Liste de présence au poste</h2>
                </div>
            </div>
        </main>
    )
}