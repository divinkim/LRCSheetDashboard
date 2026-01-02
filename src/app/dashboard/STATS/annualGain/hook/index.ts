"use client";
import { controllers, urlAPI } from "@/app/main";
import { useEffect, useState } from "react";

type Attendances = {
    status: string,
    Salary: { dailySalary: string },
    EnterpriseId: number | null,
    mounth: number,
    UserId: number
};

export function AnnualGainHook() {
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
    };

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

    return { getDuductionByMonth, monthlyBalances, MONTHLY_LIMIT, YEARLY_LIMIT, setSelectedMonthIndex, selectedMonth, yearlySum, COLORS, lineData, barData, EnterpriseId, adminRole, attendances, selectedMonthIndex }
}