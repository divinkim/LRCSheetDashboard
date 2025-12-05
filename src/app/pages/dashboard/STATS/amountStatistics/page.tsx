"use client";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    LineChart, Line, ResponsiveContainer
} from "recharts";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";
type Attendances = {
    status: string,
    Salary: {
        dailySalary: string
    },
    EnterpriseId: number | null,
    mounth: number,
    UserId: number
}

export default function DashboardPage() {
    const [totalDeductionByMonth, setTotalDeductionByMonth] = useState(0);
    const [attendances, setAttendances] = useState<Attendances[]>([]);
    const EnterpriseId = localStorage.getItem("EnterpriseId");

    function getDuductionByMonth(attendances: Attendances[], monthIndice: number) {
        let totalAmount: number = 0;
        let totalLates: number = 0;
        let totalAbsences: number = 0;

        const filterAttendanceByMonth = attendances.filter((attendance: { mounth: number }) => attendance.mounth === monthIndice);

        for (const attendance of filterAttendanceByMonth) {
            if (attendance.status === "En retard") {
                totalLates += parseInt(attendance.Salary?.dailySalary) / 2
            } else if (attendance.status === "Absent") {
                totalAbsences += parseInt(attendance.Salary?.dailySalary)
            }
        }

        return totalAmount = totalLates + totalAbsences;
    }

    const monthlyBalances = [
        { month: "Jan", value: 0 },
        { month: "Fev", value: 0 },
        { month: "Mar", value: 0 },
        { month: "Avr", value: 0 },
        { month: "Mai", value: 0 },
        { month: "Juin", value: getDuductionByMonth(attendances, 5) },
        { month: "Jul", value: getDuductionByMonth(attendances, 6) },
        { month: "Aug", value: getDuductionByMonth(attendances, 7) },
        { month: "Sep", value: getDuductionByMonth(attendances, 8) },
        { month: "Oct", value: getDuductionByMonth(attendances, 9) },
        { month: "Nov", value: getDuductionByMonth(attendances, 10) },
        { month: "Dec", value: getDuductionByMonth(attendances, 11) },
    ];

    useEffect(() => {
        (async () => {
            const attendances = await controllers.API.getAll(urlAPI, "getAllAttendances", null);
            if (parseInt(EnterpriseId ?? "") !== 1) {
                const filterAttendancesByEnterpriseId = attendances.filter((attendance: { EnterpriseId: number }) => attendance.EnterpriseId === parseInt(EnterpriseId ?? ""));
                return setAttendances(filterAttendancesByEnterpriseId);
            }
            const filterAttendancesByEnterpriseId = attendances.filter((attendance: { EnterpriseId: number }) => attendance.EnterpriseId === 1 || attendance.EnterpriseId === 2 || attendance.EnterpriseId === 3 || attendance.EnterpriseId === 4 || attendance.EnterpriseId === null);
            return setAttendances(filterAttendancesByEnterpriseId)
        })()
    }, [])

    useEffect(() => {
        (() => {
            let dailySalaryLate: number = 0;
            let dailySalaryAbsence: number = 0;
            let totalSalary: number = 0;
            const filterAttendanceByMonth = attendances.filter((attendance: { mounth: number, UserId: number }) => attendance.mounth === 10 && attendance.UserId === 1);
            for (const attendance of filterAttendanceByMonth) {
                dailySalaryLate += (parseInt(attendance?.Salary?.dailySalary) / 2);
                dailySalaryAbsence += parseInt(attendance?.Salary?.dailySalary);
            }
            totalSalary = dailySalaryLate + dailySalaryLate;
            setTotalDeductionByMonth(totalSalary);
        })();
    }, [attendances]);

 

    const MONTHLY_LIMIT = totalDeductionByMonth * 24;
    const YEARLY_LIMIT = MONTHLY_LIMIT * 12;

    console.log("dédution par mois", MONTHLY_LIMIT)
    
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
    const selectedMonth = monthlyBalances[selectedMonthIndex];

    const yearlySum = monthlyBalances.reduce((a, b) => a + b.value, 0);

    const barData = [
        { name: selectedMonth.month, saved: selectedMonth.value, limit: MONTHLY_LIMIT }
    ];

    const lineData = monthlyBalances.map(m => ({
        month: m.month,
        saved: m.value,
    }));

    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />

            <div className="flex min-w-0">
                <Sidebar />

                {/* MAIN CONTENT */}
                <div className="mx-4 mt-6 mb-4 w-full min-w-0">

                    {/* BUTTONS */}
                    <div className="flex gap-3 flex-wrap">
                        {monthlyBalances.map((m, index) => (
                            <button
                                key={m.month}
                                onClick={() => setSelectedMonthIndex(index)}
                                className={`px-4 py-2 rounded border ${selectedMonthIndex === index
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                                    }`}
                            >
                                {m.month}
                            </button>
                        ))}
                    </div>

                    {/* GRAPHS */}
                    <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-6 min-w-0">

                        {/* GRAPH 1 */}
                        <div className="p-4 border rounded-lg shadow min-w-0 overflow-visible">
                            <h2 className="font-bold text-lg mb-4 text-center">
                                Solde conservé en {selectedMonth.month}
                            </h2>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="saved" fill="#2ed573" name="Solde" />
                                    <Bar dataKey="limit" fill="#ff4757" name="Limite mensuelle" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* GRAPH 2 */}
                        <div className="p-4 border rounded-lg shadow min-w-0 overflow-visible">
                            <h2 className="font-bold text-lg mb-4 text-center">
                                Solde total par rapport au plafond annuel
                            </h2>

                            <div className="text-center mb-2">
                                <strong>Total annuel :</strong> {yearlySum.toLocaleString()} /
                                {YEARLY_LIMIT.toLocaleString()}
                            </div>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="saved" stroke="#1e90ff" strokeWidth={3} name="Solde mensuel" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
