import { urlAPI } from "@/app/main";

export default function Loader({ isLoading = true }) {
    return (
        <div className={!isLoading ? "hidden" : "h-screen w-screen bg-white overflow-hidden flex justify-center items-center"}>
            <div className="w-[100px] h-[100px]">
                <img src={`${urlAPI}/images/loader.gif`} alt="" className="h-full w-full object-cover" />
            </div>
        </div>
    )
}