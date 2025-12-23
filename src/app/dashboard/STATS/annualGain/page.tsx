"use client";
import {
    PieChart, Pie, Cell, Tooltip, Legend,
    RadialBarChart, RadialBar,
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar
} from "recharts";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { useEffect, useState } from "react";
import { controllers, urlAPI } from "@/app/main";

type Attendances = {
    status: string,
    Salary: { dailySalary: string },
    EnterpriseId: number | null,
    mounth: number,
    UserId: number
};

export default function DashboardPage() {
    const [totalDeductionByMonth, setTotalDeductionByMonth] = useState(0);
    const [attendances, setAttendances] = useState<Attendances[]>([]);
    const [EnterpriseId, setEnterpriseId] = useState<string | null>(null);
    const [adminRole, setAdminRole] = useState<string | null>(null);

    function getDuductionByMonth(attendances: Attendances[], monthIndice: number) {
        let totalLates = 0, totalAbsences = 0;
        const filterAttendanceByMonth = attendances.filter(a => a.mounth === monthIndice);
        for (const attendance of filterAttendanceByMonth) {
            if (attendance.status === "En retard") totalLates += parseInt(attendance.Salary?.dailySalary) / 2;
            else if (attendance.status === "Absent") totalAbsences += parseInt(attendance.Salary?.dailySalary);
        }
        return totalLates + totalAbsences;
    }

    const monthlyBalances = [
        { month: "Jan", value: 0 },
        { month: "Fev", value: 0 },
        { month: "Mar", value: 0 },
        { month: "Avr", value: 0 },
        { month: "Mai", value: 0 },
        { month: "Juin", value: getDuductionByMonth(attendances, 0) },
        { month: "Jul", value: getDuductionByMonth(attendances, 0) },
        { month: "Aug", value: getDuductionByMonth(attendances, 0) },
        { month: "Sep", value: getDuductionByMonth(attendances, 0) },
        { month: "Oct", value: getDuductionByMonth(attendances, 9) },
        { month: "Nov", value: getDuductionByMonth(attendances, 10) },
        { month: "Dec", value: getDuductionByMonth(attendances, 11) },
    ];

    useEffect(() => {
        if (typeof (window) === "undefined") return;
        
        (async () => {
            const EnterpriseId = window?.localStorage.getItem("EnterpriseId");
            const adminRole = window?.localStorage.getItem("adminRole");

            const attendances = await controllers.API.getAll(urlAPI, "getAllAttendances", null);
            const filtered = parseInt(EnterpriseId ?? "") !== 1
                ? attendances.filter((a: { EnterpriseId: number }) => a.EnterpriseId === parseInt(EnterpriseId ?? ""))
                : attendances.filter((a: { EnterpriseId: number }) => [1, 2, 3, 4, null].includes(a.EnterpriseId));
            setAttendances(filtered);
            setEnterpriseId(EnterpriseId);
            setAdminRole(adminRole);
        })();
    }, []);

    useEffect(() => {
        (() => {
            let totalSalary = 0;
            const filter = attendances.filter(a => a.mounth === 10 && a.UserId === 1);
            for (const att of filter) totalSalary += parseInt(att?.Salary?.dailySalary) / 2;
            setTotalDeductionByMonth(totalSalary);
        })();
    }, [attendances]);

    const MONTHLY_LIMIT = totalDeductionByMonth * 24;
    const YEARLY_LIMIT = MONTHLY_LIMIT * 12;

    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
    const selectedMonth = monthlyBalances[selectedMonthIndex];
    const yearlySum = monthlyBalances.reduce((a, b) => a + b.value, 0);

    const COLORS = ["#1e90ff", "#ff4757", "#2ed573", "#ffa502", "#ff6b81", "#70a1ff", "#5352ed", "#ff7f50", "#3742fa", "#2ed573", "#ffa502", "#ff4757"];

    // Données pour les LineChart et BarChart
    const lineData = monthlyBalances.map(m => ({ month: m.month, value: m.value }));
    const barData = monthlyBalances.map((m, idx) => ({
        month: m.month,
        solde: m.value,
        limite: MONTHLY_LIMIT
    }));

    console.log("les horaires", attendances);
    console.log("id", EnterpriseId)
    return (
        <main className="bg-gray-100 dark:bg-transparent">
            <Header />
            <div className="flex min-w-0">
                <Sidebar />

                <div className="mx-4 mt-6 mb-4 w-full min-w-0">
                    <div className="flex justify-between items-center mb-5">
                        <h1 className="text-[24px] font-bold text-gray-700 dark:text-gray-300">Statistiques de gains annuels</h1>
                        <p className="text-blue-700 dark:text-blue-600">Dashboard / Statistiques / Gain annuel</p>
                    </div>
                    <hr className='bg-gray-400 border-0 h-[1px]' />

                    {/* Boutons de mois */}
                    <div className="flex gap-3 flex-wrap mt-5">
                        {monthlyBalances.map((m, index) => (
                            <button
                                key={m.month}
                                onClick={() => setSelectedMonthIndex(index)}
                                className={`px-4 py-2 rounded border ${selectedMonthIndex === index ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            >
                                {m.month}
                            </button>
                        ))}
                    </div>

                    {/* Grille de graphiques */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 min-w-0">

                        {/* PieChart mensuel */}
                        <div className="p-4 border rounded-lg shadow">
                            <h2 className="text-lg font-bold mb-4 text-center">Solde conservé en {selectedMonth.month}</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={[{ name: "Solde", value: selectedMonth.value }, { name: "Limite", value: MONTHLY_LIMIT - selectedMonth.value }]}
                                        dataKey="value"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        label
                                    >
                                        {[
                                            { name: "Solde", value: selectedMonth.value },
                                            { name: "Limite", value: MONTHLY_LIMIT - selectedMonth.value }
                                        ].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* RadialBarChart annuel */}
                        <div className="p-4 border rounded-lg shadow">
                            <h2 className="text-lg font-bold mb-4 text-center">Solde total par rapport au plafond annuel</h2>
                            <div className="text-center mb-2">
                                <strong>Total annuel :</strong> {yearlySum.toLocaleString()} / {YEARLY_LIMIT.toLocaleString()}
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadialBarChart
                                    innerRadius="10%"
                                    outerRadius="80%"
                                    data={[{ name: "Annuel", value: yearlySum, fill: "#1e90ff" }]}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <RadialBar
                                        dataKey="value"
                                        cornerRadius={15}
                                        background
                                        fill="#1e90ff"
                                    />
                                    <Tooltip />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* LineChart mensuel */}
                        <div className="p-4 border rounded-lg shadow">
                            <h2 className="text-lg font-bold mb-4 text-center">Évolution mensuelle des déductions</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#ff6b81" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* BarChart comparatif solde vs limite */}
                        <div className="p-4 border rounded-lg shadow">
                            <h2 className="text-lg font-bold mb-4 text-center">Comparatif solde / limite mensuelle</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="solde" fill="#2ed573" radius={[10, 10, 0, 0]} />
                                    <Bar dataKey="limite" fill="#ff4757" radius={[10, 10, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
