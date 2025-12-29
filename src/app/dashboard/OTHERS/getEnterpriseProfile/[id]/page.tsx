"use client";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { GetEnterpriseHook } from "../hook";
import { urlAPI } from "@/app/main";
import { cn } from "@/lib/utils";

export default function GetEnterpriseProfile() {
    const { enterpriseDataArray } = GetEnterpriseHook();
    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mx-4 flex flex-col space-y-5 lg:space-y-0 lg:flex-row mt-6 items-center mb-4 w-full font-semibold">
                    <div className="lg:w-[80%] dark:bg-gray-800 p-4 bg-white shadow-xl dark:shadow-none rounded-md h-auto flex flex-col space-y-5">
                        <div className="w-[100px] h-[100px] rounded-full shadow-xl dark:shadow-none dark:bg-transparent bg-white">
                            <img src={`${urlAPI}/images/${enterpriseDataArray?.[0]?.value}`} alt="" className="w-full h-full rounded-full object-cover" />
                        </div>
                        {
                            enterpriseDataArray?.map((enterprise, index) => (
                                <div key={index} className={cn(enterprise.label === "Logo" ? "hidden" : "flex space-x-2 dark:text-gray-300 text-gray-700")}>
                                    <h2 className="font-bold">{enterprise.label}: </h2>
                                    <p className="font-normal">{enterprise.value}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="w-full lg:pl-4 ">
                        <div className="w-full h-[300px]">
                            <img src="https://cdn.core.homeviews.com/development/ba8d0401-4212-45ee-a1f5-b7588be1e085/Voyager-House.jpg" className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="w-full h-[500px] mt-4">
                            <iframe
                                src={`https://www.google.com/maps?q=${enterpriseDataArray?.[15]?.value},${enterpriseDataArray[16]?.value}&z=14&output=embed`}
                                width="100%"
                                height="100%"
                                // style="border:0;"
                                loading="lazy"
                            >
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}