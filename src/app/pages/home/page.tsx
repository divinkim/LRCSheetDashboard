import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
export default function HomePage() {
    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="">
                </div>
            </div>
        </div>
    )
}