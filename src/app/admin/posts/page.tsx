import PostList from "./PostList";
import { prisma } from "@/lib/prisma";

async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                title: true,
                description: true,
                published: true,
                content: true,
                slug: true,
                createdAt: true
            }
        });
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export default async function Posts() {
    const posts = await getPosts();

    return (
        <div className="w-full max-w-7xl mx-auto">
            <PostList posts={posts} />
        </div>
    );
}