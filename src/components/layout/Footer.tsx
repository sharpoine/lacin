export default function Footer() {
    return (<footer className="border-t border-black/5 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>© 2026 Av. Emre Laçin Hukuk Bürosu</div>
            <div className="flex gap-5">
                <a href="#">Aydınlatma Metni</a>
                <a href="#">Çerez Politikası</a>
                <a href="#">İletişim</a>
            </div>
        </div>
    </footer>)
}