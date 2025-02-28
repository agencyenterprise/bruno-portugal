'use server'

import prisma from '@/prisma/client'
import { NextRequest } from 'next/server'

export interface UserFromDB {
    id: number
    name: string | null
  }

export const fetchUsers = async () => {
    try {
        const users: UserFromDB[] = await prisma.user.findMany({
            select: {
                id: true,
                name: true
            }
        });
        console.log(users);
        return users;
    } catch (error) {
        return [];
    }
}