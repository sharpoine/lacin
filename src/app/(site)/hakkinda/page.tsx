export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <main>
        <section className="border-b border-black/5 bg-white/60">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <div className="max-w-4xl">
              <div className="text-xs uppercase tracking-[0.3em] text-[#8d6e45]">
                Hakkında
              </div>
              <h1 className="mt-5 font-serif text-5xl leading-tight md:text-6xl">
                Mesleki ciddiyet, sade iletişim ve güven veren bir yaklaşım.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Bu sayfa; avukatın eğitim geçmişi, mesleki yaklaşımı, çalışma alanları ve
                ofis yapısı hakkında açık, kurumsal ve güven veren bir çerçeve sunmak için tasarlanmıştır.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.05)] lg:p-10">
              <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Profil
              </div>
              <div className="mt-4 font-serif text-3xl">Av. Emre Laçin</div>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                <p><span className="font-medium text-slate-900">Baro:</span> Konya Barosu</p>
                <p><span className="font-medium text-slate-900">Mesleğe Başlama:</span> 2026</p>
                <p><span className="font-medium text-slate-900">Yabancı Dil:</span> Türkçe, English</p>
                <p><span className="font-medium text-slate-900">Çalışma Alanları:</span> Aile Hukuku, İş Hukuku, Ticaret Hukuku</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.05)] lg:p-10">
              <div className="text-xs uppercase tracking-[0.25em] text-[#8d6e45]">
                Mesleki Yaklaşım
              </div>
              <div className="mt-5 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Hukuki süreçler çoğu zaman yalnızca teknik bilgi değil; dikkatli dinleme,
                  açık iletişim ve süreci doğru yapılandırma gerektirir. Bu yaklaşım, müvekkilin
                  içinde bulunduğu durumu net şekilde anlamayı ve en uygun hukuki yol haritasını
                  oluşturmaya odaklanır.
                </p>
                <p>
                  Çalışma anlayışının merkezinde; düzenli bilgilendirme, zamanında geri dönüş,
                  açık değerlendirme ve mesleki özen yer alır. Amaç, süreci karmaşıklaştırmadan,
                  anlaşılır ve güven veren bir çerçevede yürütmektir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Eğitim ve Akademik Arka Plan",
                text: "Mezun olunan üniversite, varsa yüksek lisans çalışmaları, akademik ilgi alanları ve mesleki gelişim odakları burada yer alır.",
              },
              {
                title: "Çalışma Disiplini",
                text: "Dosya hazırlığı, süreç takibi, duruşma öncesi hazırlık ve yazılı bilgilendirme gibi profesyonel çalışma ilkeleri vurgulanır.",
              },
              {
                title: "İletişim Yaklaşımı",
                text: "Müvekkilin süreci anlamasını kolaylaştıran, gereksiz karmaşadan uzak ve açık iletişim esas alınır.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-black/5 bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.05)]"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Detay</div>
                <h2 className="mt-4 font-serif text-2xl">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-slate-900 text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)]">
            <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#d2b48c]">
                  İletişim
                </div>
                <h2 className="mt-4 font-serif text-4xl">Daha fazla bilgi veya görüşme talebi için iletişime geçin</h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">
                  Hukuki destek talepleriniz, çalışma alanlarına ilişkin sorularınız veya ofis ile
                  iletişim kurmak için ilgili iletişim kanallarını kullanabilirsiniz.
                </p>
              </div>
              <div className="flex items-center lg:justify-end">
                <a
                  href="/iletisim"
                  className="rounded-full bg-white px-6 py-3 text-sm text-slate-900 transition hover:opacity-90"
                >
                  İletişim Sayfasına Git
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
