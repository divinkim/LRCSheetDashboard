'use client';
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { formElements } from "@/components/FormElements/forms";


type input = {
    name: string | null,
    description: string | null,
    enterpriseId: number | null,
    enterprise: string | null,

}



export default function AddDepartment(){


    return (
        <main className="bg-ray-100 dark:bg-transparent">
            <Header />
            
            <div className="flex">
                <Sidebar/>

                <div className="mx-4 mb-2 mt-4 w-full">

                    {/**map du formulaire */}
                    {
                        formElements.map((element) =>(
                            <div className="text-gray-700 space-y-4 md:space-y-0 w-full items-center">
                                <div className="flex justify-between flex-wrap">
                                    <h1 className="text-gray-700 text-[20pn] mb-3 font-bold dark:text-gray-300  ">
                                        Ajouter un départemnt
                                    </h1>
                                    <p className="text-blue-700 dark:text-blue-600" >
                                        Dashboard/ADMIN/Ajouter un départemnt
                                    </p>
                                </div>
                                
                                <hr className="bg-gray-400 h-[1px] boder-0 " />
                                <div className="flex flex-wrap itemq-center space-y-4 lg:space-x-4">
                                   

                                </div>


                            </div>

                        ))
                    }

                </div>



            </div>
            
        </main>
    )
}