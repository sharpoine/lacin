"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export async function updatePostStatus(id: string, published: boolean) {
    try {
        await prisma.post.update({
            where: { id },
            data: { published }
        });
        revalidatePath("/admin/posts");
        return { success: true };
    } catch (error) {
        console.error("Failed to update post status:", error);
        return { success: false, error: "Durum güncellenemedi" };
    }
}

export async function updatePost(id: string, title: string, description: string, content: string, published: boolean) {
    try {
        const slug = slugify(title);
        await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                content,
                published
            }
        });
        revalidatePath("/admin/posts");
        return { success: true };
    } catch (error) {
        console.error("Failed to update post:", error);
        return { success: false, error: "Post güncellenemedi" };
    }
}

export async function deletePost(id: string) {
    try {
        await prisma.post.delete({
            where: { id }
        });
        revalidatePath("/admin/posts");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete post:", error);
        return { success: false, error: "Post silinemedi" };
    }
}

export async function createPost(formData: FormData) {
    let success = false;
    try {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const content = formData.get("content") as string;
        const published = formData.get("published") === "1" || formData.get("published") === "true";
        const categoryName = (formData.get("category") as string) || "Genel";

        if (!title || title.trim() === '' || !content || content.trim() === '' || !description || description.trim() === '') {
            return { success: false, error: "Boş alan bırakmayınız." };
        }

        const slug = slugify(title);
        const categorySlug = slugify(categoryName);

        const category = await prisma.category.upsert({
            where: { slug: categorySlug },
            update: {},
            create: {
                name: categoryName,
                slug: categorySlug
            }
        });

        await prisma.post.create({
            data: {
                title,
                slug,
                description,
                content,
                published,
                categoryId: category.id
            }
        });

        revalidatePath("/admin/posts");
        success = true;
    } catch (error) {
        console.error("Failed to create post:", error);
        return { success: false, error: "Post oluşturulamadı" };
    }

    if (success) {
        redirect("/admin/posts");
    }
}
