"use client";
import { Select } from "@/components/FormElements/select";
import { AddQuarterHook } from "./hook";
import { formElements } from "@/components/FormElements/forms";
import { ClipLoader } from "react-spinners";

export default function AddDistrict({ isVisibleFormDistrict = false }) {
    const { inputs, setInputs, handleSubmit, dynamicArrayDatas, isLoading } = AddQuarterHook();

    return (
        <div className={isVisibleFormDistrict ? "w-full h-full flex items-center justify-center fixed bg-black/50" : "hidden"}>
            <div className="p-4 w-1/2 bg-white dark:bg-gray-800  rounded-md  relative right-[140px] -top-14">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-[18px]">{formElements[0].addDistrict.titleForm}</h1>
                    <p className="font-bold"><span className="text-red-600 font-bold">*</span> Champs obligatoires</p>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-1 mb-4  gap-4">
                    {
                        formElements[0].addDistrict.inputs.map((item, index) => (
                            <div key={index} className="flex flex-col w-full ">
                                <div className=''>
                                    <label htmlFor="" className="mb-4 font-semibold dark:text-gray-300 text-gray-700">
                                        <span className={item.requireField ? "text-red-600" : "hidden"}>*</span>
                                        {item.label}</label>
                                    {
                                        !item.selectedInput ?
                                            <input onChange={async (u) => {
                                                const field = item.alias
                                                let fieldValue;

                                                fieldValue = {
                                                    ...inputs,
                                                    [field]: u.target.value
                                                }
                                                setInputs(fieldValue)
                                                localStorage.setItem("inputMemoryOfAddDistrictPage", JSON.stringify(fieldValue))
                                            }} type={item.type} maxLength={item.type === "tel" ? 9 : undefined} placeholder={item.placeholder} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent border
                                                                       border-gray-400 dark:border-gray-300  dark:placeholder-gray-300 font-normal dark:text-gray-300 text-gray-700" />

                                            :
                                            <select onChange={(u) => {

                                                const field = item.alias
                                                const fieldValue = {
                                                    ...inputs,
                                                    [field]: item.type === "number" ? parseInt(u.target.value) : u.target.value
                                                }

                                                setInputs(fieldValue)
                                                localStorage.setItem("inputMemoryOfAddDistrctPage", JSON.stringify(fieldValue))

                                            }} className="w-full mt-1 outline-none rounded-md  dark:shadow-none p-2.5 bg-transparent 
                                                                         border border-gray-400 dark:border-gray-300 dark:bg-transparent font-normal dark:placeholder-gray-300 dark:text-gray-300 text-gray-700" >

                                                <option selected disabled >
                                                    {item.placeholder}
                                                </option>

                                                {
                                                    dynamicArrayDatas.find(items => items.alias === item.alias)?.arrayData.map(option => (
                                                        <option className="dark:bg-gray-800" value={option.value}>
                                                            {option.title}
                                                        </option>
                                                    ))
                                                }

                                            </select>
                                    }

                                </div>

                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-end">
                    <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-10 my-5 font-semibold">
                        {!isLoading ? " Ajouter" : <ClipLoader color="#fff" size={16} />}
                    </button>
                </div>
            </div>
        </div>
    )
}