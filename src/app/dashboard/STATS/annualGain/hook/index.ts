"use client";
import { controllers, urlAPI } from "@/app/main";
import { useEffect, useState } from "react";

type Attendances = {
    status: string,
    arrivalTime: string;
    Salary: { dailySalary: string, netSalary: string },
    EnterpriseId: number | null,
    mounth: number,
    UserId: number,
    createdAt: string,
    Planning: {
        startTime: string,
    },
    Enterprise: {
        toleranceTime: null,
        maxToleranceTime: null,
        pourcentageOfHourlyDeduction: null,
        maxPourcentageOfHourlyDeduction: null
    }
};

export function AnnualGainHook() {
    const [totalDeductionByMonth, setTotalDeductionByMonth] = useState(0);
    const [attendances, setAttendances] = useState<Attendances[]>([]);
    const [EnterpriseId, setEnterpriseId] = useState<string | null>(null);
    const [adminRole, setAdminRole] = useState<string | null>(null);

    function getDuductionByMonth(attendances: Attendances[], monthIndice: number) {

        const filterAttendanceByMonth = attendances.filter(a => a.mounth === monthIndice && new Date(a.createdAt).getFullYear() === new Date().getFullYear());

        let totalAmount: number = 0;
        let totalLates: number = 0;
        let totalAbsences: number = 0;

        for (const attendance of filterAttendanceByMonth) {
            const status = attendance.status;
            const arrivalTime = parseInt(attendance.arrivalTime.split(":")?.pop() ?? "");
            const toleranceTime = parseInt(attendance.Enterprise?.toleranceTime ?? "");
            const maxToleranceTime = parseInt(attendance.Enterprise?.maxToleranceTime ?? "") ?? 0;
            const pourcentageOfHourlyDeduction = parseFloat(attendance.Enterprise?.pourcentageOfHourlyDeduction ?? "") ?? 0;
            const maxPourcentageOfHourlyDeduction = parseFloat(attendance.Enterprise?.maxPourcentageOfHourlyDeduction ?? "") ?? 0;
            const pourcent = pourcentageOfHourlyDeduction / 100;
            const maxPourcent = maxPourcentageOfHourlyDeduction / 100;
            const dailySalary = parseInt(attendance.Salary?.dailySalary);

            if (status === "En retard" && arrivalTime > toleranceTime && arrivalTime < maxToleranceTime) {
                totalLates += dailySalary * pourcent;
            } else if (status === "En retard" && arrivalTime > maxToleranceTime) {
                totalLates += dailySalary * maxPourcent;
            }
            else if (attendance.status === "Absent") {
                totalAbsences += dailySalary;
            }
        }
        return totalAmount = totalLates + totalAbsences;
    };

    const monthlyBalances = [
        { month: "Jan", value: getDuductionByMonth(attendances, 0) },
        { month: "Fev", value: getDuductionByMonth(attendances, 1) },
        { month: "Mar", value: getDuductionByMonth(attendances, 2) },
        { month: "Avr", value: getDuductionByMonth(attendances, 3) },
        { month: "Mai", value: getDuductionByMonth(attendances, 4) },
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
            const filter = attendances.filter(a => a.mounth === new Date().getMonth() && a.UserId === 1);
            for (const att of filter) totalSalary += parseInt(att?.Salary?.dailySalary);
            setTotalDeductionByMonth(totalSalary);
        })();
    }, [attendances]);

    const MONTHLY_LIMIT = totalDeductionByMonth * 26;
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