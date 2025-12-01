"use client";
import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { UsedDevices } from "@/components/Charts/used-devices";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { ChatsCard } from "../../(home)/_components/chats-card";
import { OverviewCardsGroup } from "../../(home)/_components/overview-cards";
import { OverviewCardsSkeleton } from "../../(home)/_components/overview-cards/skeleton";
import { RegionLabels } from "../../(home)/_components/region-labels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import HomeComponent from ".";


type PropsType = {
    searchParams: Promise<{
        selected_time_frame?: string;
    }>;
};

import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { faArrowAltCircleUp, faUserGraduate, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

export default function HomePage({ searchParams }: PropsType) {
    // const { selected_time_frame } = await searchParams;
    // const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);
    const requireAdminRoles = ['Super-Admin', 'Supervisor-Admin'];
    const enterpriseId = localStorage.getItem("EnterpriseId");
    const adminRole = localStorage.getItem("adminRole");

    const HomeCard = HomeComponent();
    console.log(HomeCard)

    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="mx-auto w-full p-4">
                    {/* <Suspense fallback={<OverviewCardsSkeleton />}>
                       
                    </Suspense> */}
                    {/* <OverviewCardsGroup /> */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        {
                            HomeCard.map((element, index) => (
                                <Link href={!requireAdminRoles.includes(adminRole ?? "") ? "" : element.path} className={"rounded-xl p-4 h-[200px] dark:bg-gray-800 shadow-xl dark:shadow-none cursor-pointer ease duration-500 hover:scale-95 bg-white"}>
                                    <div className={cn(element.color, "w-[55px] rounded-full p-4 ")}>
                                        <FontAwesomeIcon icon={element.icon} className='text-white' />
                                    </div>
                                    <div className="mt-5  font-semibold text-gray-600 dark:text-gray-300">
                                        <p className="text-[40px]">{index === 2 ? element.value?.toLocaleString() + " FCFA" : element.value}</p>
                                        <div className="flex justify-between w-full">
                                            <p className='text-gray-500'>{element.title}</p>
                                            <p className="text-green-600">2.45% <span><FontAwesomeIcon icon={faArrowAltCircleUp} /></span></p>
                                        </div>
                                    </div>
                                </Link>
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