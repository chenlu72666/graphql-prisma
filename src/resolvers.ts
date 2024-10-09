import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        users: async () => await prisma.user.findMany({ include: { posts: true } }),
        user: async (parent, args) => await prisma.user.findUnique({
            where: { id: Number(args.id) },
            include: { posts: true }
        }),
    },
    Mutation: {
        createUser: async (parent, args, context) => {
            const { name, email } = args;
            return await prisma.user.create({
                data: {
                    name,
                    email
                },
            });
        },
        deleteUser: async (parent, args, context) => {
            const { id } = args;
            return await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })
        },
        createPost: async (parent, args, context) => {
            const { title, content, authorId } = args;
            return await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: Number(authorId),
                },
            });
        },
    },
};
