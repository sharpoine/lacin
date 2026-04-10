export default function Home() {
  const services = [
    {
      title: "Aile Hukuku",
      text: "Boşanma, velayet, mal paylaşımı ve nafaka süreçlerinde hukuki danışmanlık ve avukatlık hizmeti.",
    },
    {
      title: "İş Hukuku",
      text: "İşçi ve işveren uyuşmazlıkları, fesih süreçleri, tazminat ve arabuluculuk başvuruları.",
    },
    {
      title: "Ticaret Hukuku",
      text: "Şirketler hukuku, ticari sözleşmeler, alacak ve uyuşmazlık yönetimi odaklı destek.",
    },
  ];

  const posts = [
    {
      title: "Anlaşmalı Boşanma Davasında Süreç Nasıl İlerler?",
      excerpt:
        "Anlaşmalı boşanma davalarında başvuru, protokol hazırlanması ve duruşma aşamalarına dair genel çerçeve.",
      date: "10 Nisan 2026",
    },
    {
      title: "İşten Çıkarılan İşçi Hangi Haklara Sahiptir?",
      excerpt:
        "Kıdem, ihbar, işe iade ve arabuluculuk bakımından ilk değerlendirilmesi gereken başlıklar.",
      date: "6 Nisan 2026",
    },
    {
      title: "Kiracının Tahliyesi Hangi Hallerde Mümkündür?",
      excerpt:
        "Tahliye taahhüdü, ihtiyaç nedeniyle tahliye ve kira uyuşmazlıklarında genel hukuki çerçeve.",
      date: "1 Nisan 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f4ee]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div>
            <div className="font-serif text-2xl tracking-wide">Av. Ayşe Demir</div>
            <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Hukuk Bürosu
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#hakkinda" className="hover:text-slate-600">Hakkında</a>
            <a href="#alanlar" className="hover:text-slate-600">Çalışma Alanları</a>
            <a href="#yazilar" className="hover:text-slate-600">Yazılar</a>
            <a href="#iletisim" className="hover:text-slate-600">İletişim</a>
          </nav>
          <a
            href="#iletisim"
            className="rounded-full border border-slate-900 px-5 py-2 text-sm transition hover:bg-slate-900 hover:text-white"
          >
            İletişime Geç
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-[#8d6e45]">
              İstanbul Barosu’na Kayıtlı Avukat
            </div>
            <h1 className="max-w-3xl font-serif text-5xl leading-tight md:text-6xl">
              Hukuki süreçlerde sade, güven veren ve kurumsal bir yaklaşım.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Aile hukuku, iş hukuku ve ticaret hukuku alanlarında genel bilgilendirme,
              hukuki danışmanlık ve avukatlık hizmeti sunan modern bir hukuk ofisi sitesi örneği.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#alanlar"
                className="rounded-full bg-slate-900 px-6 py-3 text-sm text-white transition hover:opacity-90"
              >
                Çalışma Alanlarını İncele
              </a>
              <a
                href="#yazilar"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm transition hover:border-slate-900"
              >
                Yazılara Göz At
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 h-32 w-32 rounded-full bg-[#c8a977]/20 blur-2xl" />
            <div className="absolute -bottom-8 right-8 h-40 w-40 rounded-full bg-slate-300/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
              <div className="border-b border-black/5 px-8 py-6">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Ofis Profili</div>
                <div className="mt-3 font-serif text-3xl">Kurumsal ve Zamansız Görünüm</div>
              </div>
              <div className="space-y-6 px-8 py-8 text-sm leading-7 text-slate-600">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Çalışma Alanı</div>
                    <div className="mt-2 text-base font-medium text-slate-900">Aile Hukuku</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Dil</div>
                    <div className="mt-2 text-base font-medium text-slate-900">Türkçe / English</div>
                  </div>
                </div>
                <div className="rounded-3xl border border-[#d6c2a0] bg-[#fbf8f1] p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#8d6e45]">Yayın Modülü</div>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    Sitede düzenli olarak yayımlanan hukuki bilgilendirme yazıları ile hem güven
                    oluşturulur hem de arama motoru görünürlüğü desteklenir.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900 p-6 text-white">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60">İletişim Alanı</div>
                  <div className="mt-3 text-2xl font-serif">Ofis Bilgileri ve Form</div>
                  <p className="mt-3 text-sm leading-7 text-white/75">
                    Basit, güven veren ve abartısız bir dönüşüm kurgusu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="hakkinda" className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="grid gap-8 rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.05)] lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45]">Hakkında</div>
              <h2 className="mt-4 font-serif text-4xl">Mesleki ciddiyet, sade iletişim, güven veren dil.</h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-slate-600">
              <p>
                Bu bölümde avukatın eğitim geçmişi, baro kaydı, çalışma alanları, mesleğe başlama yılı
                ve genel yaklaşımı kurumsal bir dille sunulur.
              </p>
              <p>
                Amaç abartılı iddialar değil; netlik, erişilebilirlik ve mesleki güven duygusudur.
              </p>
            </div>
          </div>
        </section>

        <section id="alanlar" className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45]">Çalışma Alanları</div>
              <h2 className="mt-4 font-serif text-4xl">Uzmanlık alanları için ayrı sayfalar</h2>
            </div>
            <p className="hidden max-w-xl text-sm leading-7 text-slate-500 md:block">
              Her çalışma alanı sayfası hem kullanıcıyı bilgilendirir hem de SEO için hedefli bir giriş noktası olur.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-[1.75rem] border border-black/5 bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-1"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Hizmet Alanı</div>
                <h3 className="mt-4 font-serif text-2xl">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{service.text}</p>
                <div className="mt-8 text-sm text-[#8d6e45]">Detay sayfası →</div>
              </div>
            ))}
          </div>
        </section>

        <section id="yazilar" className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="mb-10">
            <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45]">Yazılar</div>
            <h2 className="mt-4 font-serif text-4xl">Bilgilendirme odaklı makale alanı</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
              >
                <div className="h-48 bg-[linear-gradient(135deg,#e9dfcf,#f7f4ee,#dfe5ec)]" />
                <div className="p-7">
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{post.date}</div>
                  <h3 className="mt-4 font-serif text-2xl leading-snug">{post.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{post.excerpt}</p>
                  <div className="mt-6 text-sm text-[#8d6e45]">Yazıyı oku →</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="iletisim" className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="grid overflow-hidden rounded-[2rem] border border-black/5 bg-slate-900 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-8 lg:p-12">
              <div className="text-xs uppercase tracking-[0.3em] text-[#d2b48c]">İletişim</div>
              <h2 className="mt-4 font-serif text-4xl">Görüşme talebi için iletişim bırakın</h2>
              <div className="mt-8 space-y-4 text-sm leading-7 text-white/75">
                <p>Adres: Örnek Mah. Örnek Cad. No:10, İstanbul</p>
                <p>Telefon: +90 5xx xxx xx xx</p>
                <p>E-posta: info@hukukofisi.com</p>
              </div>
            </div>
            <div className="bg-white p-8 text-slate-900 lg:p-12">
              <div className="grid gap-4">
                <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Ad Soyad" />
                <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Telefon veya E-posta" />
                <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Konu" />
                <textarea className="min-h-[140px] rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Mesajınız" />
                <label className="flex items-start gap-3 text-sm leading-6 text-slate-500">
                  <input type="checkbox" className="mt-1" />
                  <span>Kişisel verilerimin iletişim amacıyla işlenmesine ilişkin bilgilendirmeyi okudum.</span>
                </label>
                <button className="rounded-full bg-slate-900 px-6 py-3 text-sm text-white transition hover:opacity-90">
                  Mesaj Gönder
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Av. Ayşe Demir Hukuk Bürosu</div>
          <div className="flex gap-5">
            <a href="#">Aydınlatma Metni</a>
            <a href="#">Çerez Politikası</a>
            <a href="#">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
