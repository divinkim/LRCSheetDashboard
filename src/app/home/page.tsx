"use client";
// import { PaymentsOverview } from "@/components/Charts/payments-overview";
// import { UsedDevices } from "@/components/Charts/used-devices";
// import { WeeksProfit } from "@/components/Charts/weeks-profit";
// import { TopChannels } from "@/components/Tables/top-channels";
// import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
// import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
// import { Suspense } from "react";
// import { ChatsCard } from "../../(home)/_components/chats-card";
// import { OverviewCardsGroup } from "../../(home)/_components/overview-cards";
// import { OverviewCardsSkeleton } from "../../(home)/_components/overview-cards/skeleton";
// import { RegionLabels } from "../../(home)/_components/region-labels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import HomeComponent from ".";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/firebase/firebaseConfig";
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
import { controllers, urlAPI } from "@/app/main";
import Swal from "sweetalert2";

export default function HomePage({ searchParams }: PropsType) {
    // const { selected_time_frame } = await searchParams;
    // const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);
    const requireAdminRoles = ['Super-Admin', 'Supervisor-Admin'];
    const [EnterpriseId, setEnterpriseId] = useState<string | null>(null)
    const [adminRole, setAdminRole] = useState<string | null>(null)

    useEffect(() => {
        (() => {
            const EnterpriseId = localStorage.getItem("EnterpriseId");
            const adminRole = localStorage.getItem("adminRole");
            setEnterpriseId(EnterpriseId);
            setAdminRole(adminRole);
        })()
    }, [])

    const HomeCard = HomeComponent();

    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mx-auto w-full p-4">
                    {/* <Suspense fallback={<OverviewCardsSkeleton />}>
                       
                    </Suspense> */}
                    {/* <OverviewCardsGroup /> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {
                            HomeCard.map((element, index) => (
                                <div className={index === 2 && !requireAdminRoles.includes(adminRole ?? "") ? "hidden" : index === 1 && parseInt(EnterpriseId ?? "") !== 1 ? "hidden" : "rounded-xl p-4 h-[200px] dark:bg-gray-800 shadow-xl dark:shadow-none ease duration-500  bg-white"}>
                                    <div style={{ background: element.backgroundColor }} className={cn("w-[55px] rounded-full p-4 ")}>
                                        <FontAwesomeIcon icon={element.icon} className='text-white' />
                                    </div>
                                    <div className="mt-5 relative top-5  font-semibold text-gray-600 dark:text-gray-300">
                                        <p className="text-[30px]">{index === 2 ? element.value?.toLocaleString() + " FCFA" : element.value}</p>
                                        <div className="flex justify-between w-full">
                                            <p className='text-gray-500'>{element.title}</p>
                                            <Link href={element.path} className="rounded-full  ease duration-500"><FontAwesomeIcon icon={faEye} style={{ background: element.backgroundColor }} className={cn("hover:scale-90 ease duration-500 rounded-full px-3.5 py-4   text-white relative left-1 -top-4")} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
                        {/* <PaymentsOverview
                            className="col-span-12 xl:col-span-7"
                            key={extractTimeFrame("payments_overview")}
                            timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
                        />

                        <WeeksProfit
                            key={extractTimeFrame("weeks_profit")}
                            timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
                            className="col-span-12 xl:col-span-5"
                        /> */}

                        {/* <UsedDevices
                            className="col-span-12 xl:col-span-5"
                            key={extractTimeFrame("used_devices")}
                            timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
                        /> */}

                        {/* <RegionLabels /> */}

                        {/* <div className="col-span-12 grid xl:col-span-8">
                            <Suspense fallback={<TopChannelsSkeleton />}>
                                <TopChannels />
                            </Suspense>
                        </div> */}
                        {/* 
                        <Suspense fallback={null}>
                            <ChatsCard />
                        </Suspense> */}
                    </div>
                </div>
            </div>
        </div>
    )
}