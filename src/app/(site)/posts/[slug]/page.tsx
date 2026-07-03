import { prisma } from '@/lib/prisma'
import PostPreviewClient, { PostLayout } from './PostPreviewClient'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
        slug: string
    }
}

//Seo için dinamik metadata
export async function generateMetadata({ params }: PageProps) {
    if (params.slug === "preview") {
        return { title: 'Post Önizleme' }
    }
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
        select: {
            title: true,
            description: true
        }
    })
    if (!post) return { title: 'Post bulunamadı' }
    return {
        title: `${post.title} | Laçin Hukuk`,
        description: post.description
    }
}

export default async function PostDetailPage({ params }: PageProps) {
    if (params.slug === "preview") {
        return <PostPreviewClient />
    }

    //include ilişkisel kategori verisini de getirmesi için ekleniyor
    const post = await prisma.post.findUnique({
        where: {
            slug: params.slug,
            published: true
        },
        include: {
            category: true,
        }
    })

    if (!post) {
        notFound()
    }

    const formattedPost = {
        title: post.title,
        description: post.description,
        content: post.content || "",
        createdAt: post.createdAt.toISOString(),
        tags: "", // Veritabanı modelinde tags kolonu olmadığı için boş string geçiyoruz
        category: post.category?.name
    }

    return <PostLayout post={formattedPost} />
}