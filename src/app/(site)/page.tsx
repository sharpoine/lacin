import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Posts from "@/components/home/Posts";
import Services from "@/components/home/Services";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [dbServices, dbPosts, dbSettings] = await Promise.all([
    prisma.service.findMany({ orderBy: { order: 'asc' }, take: 3 }),
    prisma.post.findMany({ 
      where: { published: true }, 
      orderBy: { createdAt: 'desc' }, 
      take: 3 
    }),
    prisma.setting.findMany()
  ]);

  const settings = dbSettings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>);

  const formattedPosts = dbPosts.map(post => ({
    title: post.title,
    excerpt: post.description || "",
    slug: post.slug,
    date: new Date(post.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' })
  }));

  return (
    <>
      <Hero />
      <About />
      {dbServices.length > 0 && <Services services={dbServices} />}
      {formattedPosts.length > 0 && <Posts posts={formattedPosts} />}
      <Contact address={settings.address} phone={settings.phone} email={settings.email} />
    </>
  );
}
