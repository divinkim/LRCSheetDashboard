import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";

export default function UsersList() {
    return (
        <main>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="m-4">
                    <h2 className="font-bold text-[19px]">Ajouter un collaborateur</h2>
                </div>
            </div>
        </main>
    )
}