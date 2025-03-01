import prisma from '@/prisma/client'

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
        return users;
    } catch (error) {
        return [];
    }
}