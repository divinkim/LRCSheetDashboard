"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import HomeComponent from "./hook";
type PropsType = {
    searchParams: Promise<{
        selected_time_frame?: string;
    }>;
};

import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { faArrowAltCircleUp, faEye, faUserGraduate, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import GetAnnualGain from "../dashboard/STATS/annualGain/page";
import { controllers, urlAPI } from "../main";

export default function HomePage({ searchParams }: PropsType) {
    const requireAdminRoles = ['Super-Admin', 'Supervisor-Admin'];
    const [EnterpriseId, setEnterpriseId] = useState<string | null>(null);
    const [adminRole, setAdminRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { cardComponent } = HomeComponent();

    //Mise à jour ou ajout fcmToken administrateur
    useEffect(() => {
        (async () => {
            const EnterpriseId = localStorage.getItem("EnterpriseId");
            const adminRole = localStorage.getItem("adminRole");
            const adminFcmToken = localStorage.getItem("adminFcmToken");
            const UserId = localStorage.getItem("id");

            const requireAdminRoles = ["Super-Admin", "Supervisor-Admin"];

            if (requireAdminRoles.includes(String(adminRole))) {
                const data = {
                    EnterpriseId: parseInt(EnterpriseId ?? ""),
                    adminRole,
                    adminFcmToken,
                    UserId: Number(UserId),
                }
                await controllers.API.SendOne(urlAPI, "updateOrAddAdminFcmToken", null, data);
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
            setEnterpriseId(EnterpriseId);
            setAdminRole(adminRole);
        })()
    }, []);

    const formatNumber = (index: number, value: number) => {
        if (index === 2) {
            const somme = value.toString();
            const sommeLength = somme.length;
            const sommeRegex = somme.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

            if (sommeLength >= 4) {
                return sommeRegex + " K"
            } else if (sommeLength >= 7) {
                return sommeRegex + " M"
            }
            return sommeRegex
        }
        return value
    }

    return (
        <div>
            <Loader isLoading={isLoading} />
            <div className={isLoading ? "hidden" : "block"}>
                <Header />
                <div className="flex">
                    <Sidebar />
                    <div className="mx-auto w-full py-4">
                        {/* <Suspense fallback={<OverviewCardsSkeleton />}>
                       
                    </Suspense> */}
                        {/* <OverviewCardsGroup /> */}
                        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-8 px-3">
                            {
                                cardComponent.map((element, index) => (
                                    <div className={cn("rounded-xl p-4 h-[200px] dark:bg-gray-800/50 shadow-xl dark:shadow-none ease duration-500 bg-white", index === 2 && !requireAdminRoles.includes(adminRole ?? "") && "hidden")}>
                                        <div style={{ background: element.backgroundColor }} className={cn("w-[55px] rounded-full p-4 ")}>
                                            <FontAwesomeIcon icon={element.icon} className='text-white' />
                                        </div>
                                        <div className="mt-5 relative top-5  font-semibold text-gray-600 dark:text-gray-300">
                                            <p className="text-[25px]">{formatNumber(index, element.value)}</p>
                                            <div className="flex justify-between w-full">
                                                <p className='text-gray-500'>{element.title}</p>
                                                <Link href={element.path} className={cn("rounded-full  ease duration-500", index === 2 && "hidden")}><FontAwesomeIcon icon={faEye} style={{ background: element.backgroundColor }} className={"hover:scale-90 ease duration-500 rounded-full px-3.5 py-4   text-white relative left-1 -top-4"} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
                            <PaymentsOverview
                            className="col-span-12 xl:col-span-7"
                            key={extractTimeFrame("payments_overview")}
                            timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
                        />

                        <WeeksProfit
                            key={extractTimeFrame("weeks_profit")}
                            timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
                            className="col-span-12 xl:col-span-5"
                        />

                            <UsedDevices
                            className="col-span-12 xl:col-span-5"
                            key={extractTimeFrame("used_devices")}
                            timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
                        />

                            <RegionLabels />

                            <div className="col-span-12 grid xl:col-span-8">
                            <Suspense fallback={<TopChannelsSkeleton />}>
                                <TopChannels />
                            </Suspense>
                        </div>
                            
                        <Suspense fallback={null}>
                            <ChatsCard />
                        </Suspense>
                        </div> */}
                        <div className={!requireAdminRoles.includes(adminRole ?? "") ? "hidden" : "block"}>
                            <GetAnnualGain />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}