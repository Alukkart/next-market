import { prisma } from "@/prisma/prisma-client"
import { authOptions } from "@/shared/constants/auth-options"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export async function GET(req: any, res: any) {
    try {
        const user = await getServerSession(req, res, authOptions)
        console.log(user, 999)
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 401 })
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.user.id)
            },
            select:{
                fullName: true,
                email: true,
                password: false,
            }
        })

        return NextResponse.json(data)
        
    } catch (error) {
        console.log(`[ME_GET] Error ${__filename} ${error}`)
        return NextResponse.json({ message: `[USER_GET] Error` }, { status: 500 })
    }
}