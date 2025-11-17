
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        try {
            await prisma.$queryRaw`SELECT 1`;
            console.log("DB OK");
        } catch (e) {
            console.log("DB FAIL", e);
        }


        const body = await request.json();
        const { email, password } = body;

        const user = await prisma.employees.findFirst({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({
                title: "Utilisateur non trouvé !",
                message: "Les identifiants fournis ne correspondent à aucun utilisateur !",
                status: true
            }, {
                status: 404
            })
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            return NextResponse.json({
                title: "Echec d'authentification",
                message: "Le mot de passe saisie est incorrecte.",
                status: false
            }, {
                status: 400
            })
        }
        const Token = process.env.TOKEN as string

        const token = jwt.sign(
            {
                id: user.id
            },
            Token,
            { expiresIn: "8h" }
        );

        (await cookies()).set("token", token, {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
            path: "/",
        });

        console.log(user);

        return NextResponse.json(
            {
                status: true,
                data: {
                    id: user.id.toString(),
                    firstname: user.firstname,
                    lastname: user.lastname,
                    image: user.photo,
                    authToken: token,
                    adminRole: user?.role,
                    EnterpriseId: user?.EnterpriseId,
                    adminService: user.adminService,
                }
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                title: "Opération échouée",
                message: "Une erreur est survenue lors de l'exécution de ce processus",
                status: false
            }
            ,
            { status: 500 })
    }
}