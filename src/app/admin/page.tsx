import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import Link from "next/link"
import { 
  Users, 
  FileText, 
  Briefcase, 
  Layers, 
  Settings, 
  PlusCircle, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Activity, 
  Globe, 
  FilePlus, 
  Sliders,
  CheckCircle,
  AlertCircle
} from "lucide-react"

export default async function HomeAdmin() {
  const session = await getSession();
  const adminEmail = session?.user?.email || "yonetici@lacin.av.tr";
  const adminName = adminEmail.split("@")[0];
  const displayName = adminName.charAt(0).toUpperCase() + adminName.slice(1);

  // Calculate days for the chart and keys for database query
  const today = new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return d.toLocaleDateString("tr-TR", { weekday: "short" });
  });

  const last7DaysKeys = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `visit_date:${year}-${month}-${day}`;
  });

  // Retrieve statistics from database
  const [
    postsCount, 
    publishedPostsCount, 
    servicesCount, 
    categoriesCount, 
    settingsRecords,
    recentPosts,
    recentServices
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.service.count(),
    prisma.category.count(),
    prisma.setting.findMany({
      where: {
        key: {
          in: ["visitor_count", ...last7DaysKeys]
        }
      }
    }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      include: { 
        category: true 
      }
    }),
    prisma.service.findMany({
      orderBy: { order: "asc" },
      take: 4
    })
  ]);

  const draftPostsCount = postsCount - publishedPostsCount;

  // Map settings records
  const settingsMap = settingsRecords.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);
  
  // Calculate total visitors
  const totalVisitors = parseInt(settingsMap["visitor_count"] || "0", 10);

  // Retrieve visitor trend directly from database values
  const visitorTrend = last7DaysKeys.map(key => parseInt(settingsMap[key] || "0", 10));

  // Calculate chart path points (SVG coords)
  const chartHeight = 180;
  const chartWidth = 500;
  const paddingX = 45;
  const paddingY = 25;

  const maxTraffic = Math.max(...visitorTrend);
  const minTraffic = Math.min(...visitorTrend);
  const trafficRange = (maxTraffic - minTraffic) || 1;

  const pointsCoords = visitorTrend.map((val, idx) => {
    const x = paddingX + (idx * (chartWidth - 2 * paddingX)) / 6;
    const y = chartHeight - paddingY - ((val - minTraffic) / trafficRange) * (chartHeight - 2 * paddingY);
    return { x, y, value: val };
  });

  const linePath = pointsCoords.reduce((acc, p, idx) => {
    return acc + (idx === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`);
  }, "");

  const areaPath = pointsCoords.length > 0 
    ? `${linePath} L ${pointsCoords[pointsCoords.length - 1].x} ${chartHeight - paddingY} L ${pointsCoords[0].x} ${chartHeight - paddingY} Z`
    : "";

  // Circular progress ring parameters
  const publishRate = postsCount > 0 ? Math.round((publishedPostsCount / postsCount) * 100) : 0;
  const radius = 36;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - publishRate / 100);

  // Formatted current date (tr-TR)
  const formattedDate = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long"
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* BACKGROUND GRAPHIC ACCENT */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#d6c2a0_1px,transparent_1.5px)] bg-[size:32px_32px] opacity-30 pointer-events-none" />

      {/* HEADER BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-extrabold tracking-tight text-slate-900">
            Merhaba, {displayName} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Lacin Hukuk & Danışmanlık yönetim paneline hoş geldiniz. Bugün sitenizde her şey yolunda.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <Calendar className="w-4 h-4 text-[#8d6e45]" />
          <span className="text-xs font-semibold text-slate-700 tracking-wide">{formattedDate}</span>
        </div>
      </div>

      {/* STATS METRIC GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-100">
        
        {/* Visitor Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-[#d6c2a0] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_12px_45px_rgba(141,110,69,0.08)] flex items-center justify-between group hover:-translate-y-1">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Toplam Ziyaretçi</span>
            <span className="text-3xl font-serif font-extrabold text-slate-900 mt-1 block">
              {totalVisitors.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                +14.2%
              </span>
              <span className="text-[10px] text-slate-400">bu hafta</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#fbf8f1] border border-[#d6c2a0]/60 text-[#8d6e45] group-hover:bg-[#8d6e45] group-hover:text-white group-hover:scale-105 transition-all duration-350 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Posts Card */}
        <Link href="/admin/posts" className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-[#d6c2a0] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_12px_45px_rgba(141,110,69,0.08)] flex items-center justify-between group hover:-translate-y-1">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Toplam Makale</span>
            <span className="text-3xl font-serif font-extrabold text-slate-900 mt-1 block">
              {postsCount}
            </span>
            <div className="text-[10px] text-slate-500 mt-2.5 font-medium">
              <span className="text-emerald-600 font-bold">{publishedPostsCount}</span> Yayında / <span className="text-amber-600 font-bold">{draftPostsCount}</span> Taslak
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#fbf8f1] border border-[#d6c2a0]/60 text-[#8d6e45] group-hover:bg-[#8d6e45] group-hover:text-white group-hover:scale-105 transition-all duration-350 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </Link>

        {/* Services Card */}
        <Link href="/admin/services" className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-[#d6c2a0] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_12px_45px_rgba(141,110,69,0.08)] flex items-center justify-between group hover:-translate-y-1">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Hizmetler</span>
            <span className="text-3xl font-serif font-extrabold text-slate-900 mt-1 block">
              {servicesCount}
            </span>
            <div className="text-[10px] text-slate-400 mt-2.5 font-semibold tracking-wide">
              Aktif Çalışma Alanı
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#fbf8f1] border border-[#d6c2a0]/60 text-[#8d6e45] group-hover:bg-[#8d6e45] group-hover:text-white group-hover:scale-105 transition-all duration-350 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
        </Link>

        {/* Categories Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-[#d6c2a0] transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_12px_45px_rgba(141,110,69,0.08)] flex items-center justify-between group hover:-translate-y-1">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Kategoriler</span>
            <span className="text-3xl font-serif font-extrabold text-slate-900 mt-1 block">
              {categoriesCount}
            </span>
            <div className="text-[10px] text-slate-400 mt-2.5 font-semibold tracking-wide">
              Farklı Konu Başlığı
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#fbf8f1] border border-[#d6c2a0]/60 text-[#8d6e45] group-hover:bg-[#8d6e45] group-hover:text-white group-hover:scale-105 transition-all duration-350 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* VISUALIZATION SECTION: TRAFFIC CHART & CIRCULAR PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
        
        {/* Trend Area Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_12px_40px_rgba(15,23,42,0.02)]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900">Ziyaretçi Trafik Eğilimi</h2>
              <p className="text-xs text-slate-400 mt-0.5">Son 7 güne ait tekil ziyaretçi sayıları.</p>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8d6e45] bg-[#8d6e45]/5 px-3 py-1.5 rounded-full border border-[#d6c2a0]/40">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>GÜNLÜK AKIŞ</span>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <svg 
              className="w-full h-auto max-h-[220px]" 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Smooth Area Gradient */}
                <linearGradient id="glowingArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8d6e45" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#8d6e45" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={paddingX} y1={50} x2={chartWidth - paddingX} y2={50} stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="5 5" />
              <line x1={paddingX} y1={90} x2={chartWidth - paddingX} y2={90} stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="5 5" />
              <line x1={paddingX} y1={130} x2={chartWidth - paddingX} y2={130} stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="5 5" />

              {/* Value Limits Labels */}
              <text x={paddingX - 10} y={30} textAnchor="end" className="text-[10px] fill-slate-400 font-mono font-bold">{maxTraffic}</text>
              <text x={paddingX - 10} y={chartHeight - paddingY} textAnchor="end" className="text-[10px] fill-slate-400 font-mono font-bold">{minTraffic}</text>

              {/* Glowing Area Fill */}
              {areaPath && <path d={areaPath} fill="url(#glowingArea)" />}

              {/* Trend Curve Line */}
              {linePath && (
                <path 
                  d={linePath} 
                  stroke="#8d6e45" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              )}

              {/* Interaction dots and coordinates */}
              {pointsCoords.map((p, idx) => (
                <g key={idx} className="group/point">
                  {/* Hover tooltip label */}
                  <text 
                    x={p.x} 
                    y={p.y - 12} 
                    textAnchor="middle" 
                    className="text-[9px] fill-slate-800 font-bold opacity-0 group-hover/point:opacity-100 bg-slate-900 transition-opacity duration-300 font-mono"
                  >
                    {p.value}
                  </text>
                  
                  {/* Pulse background circle */}
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="8" 
                    fill="#8d6e45" 
                    fillOpacity="0"
                    className="group-hover/point:fill-opacity-10 transition-all duration-300 cursor-pointer"
                  />
                  {/* Point circle */}
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="4.5" 
                    fill="#ffffff" 
                    stroke="#8d6e45" 
                    strokeWidth="2.5" 
                    className="cursor-pointer transition-transform duration-300 group-hover/point:scale-125"
                  />
                  {/* X Axis Day Label */}
                  <text 
                    x={p.x} 
                    y={chartHeight - 4} 
                    textAnchor="middle" 
                    className={`text-[10px] font-semibold font-mono ${idx === pointsCoords.length - 1 ? 'fill-[#8d6e45] font-bold' : 'fill-slate-400'}`}
                  >
                    {last7Days[idx]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Circular Rate Card */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_12px_40px_rgba(15,23,42,0.02)] flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-serif font-bold text-slate-900">Yayın Durumu</h2>
            <p className="text-xs text-slate-400 mt-0.5">Sitedeki makalelerin yayına alınma oranı.</p>
          </div>

          <div className="flex justify-center items-center py-6">
            <div className="relative flex items-center justify-center">
              <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth={strokeWidth}
                />
                {/* Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="#8d6e45"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              
              {/* Inner Circle Label */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-serif font-extrabold text-slate-800 leading-none">
                  %{publishRate}
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                  YAYINDA
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            {/* Published bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-600">Yayında</span>
                <span className="text-emerald-600 font-bold">{publishedPostsCount} Yazı</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${postsCount > 0 ? (publishedPostsCount / postsCount) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Draft bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-600">Taslak</span>
                <span className="text-amber-600 font-bold">{draftPostsCount} Yazı</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${postsCount > 0 ? (draftPostsCount / postsCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* DETAILED LOGS & QUICK ACTIONS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-300">
        
        {/* Recent Posts Logs */}
        <div className="col-span-1 lg:col-span-2 bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_12px_40px_rgba(15,23,42,0.02)]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900">Son Eklenen Makaleler</h2>
              <p className="text-xs text-slate-400 mt-0.5">Sitenizde en son güncellenen veya yazılan içerikler.</p>
            </div>
            
            <Link 
              href="/admin/posts" 
              className="text-xs font-bold text-[#8d6e45] hover:text-[#725633] transition-colors flex items-center gap-1 group font-mono uppercase tracking-wide"
            >
              <span>TÜMÜNÜ GÖR</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentPosts.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm border border-dashed border-slate-200 rounded-2xl">
                Henüz hiçbir makale eklenmemiş.
              </div>
            ) : (
              recentPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="flex items-center justify-between p-4 bg-slate-50 hover:bg-[#fbf8f1]/50 border border-slate-100 hover:border-[#d6c2a0]/40 rounded-2xl transition-all duration-300 group"
                >
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase
                        ${post.published 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border border-amber-100'}`}
                      >
                        {post.published ? 'Yayında' : 'Taslak'}
                      </span>
                      
                      {post.category && (
                        <span className="text-[10px] text-[#8d6e45] font-semibold bg-[#8d6e45]/5 px-2 py-0.5 rounded-md font-sans">
                          {post.category.name}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#8d6e45] transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    
                    <Link 
                      href="/admin/posts"
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 group-hover:text-[#8d6e45] group-hover:border-[#d6c2a0]/60 transition-all shadow-xs"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_12px_40px_rgba(15,23,42,0.02)] flex flex-col justify-between">
          <div className="mb-6">
            <h2 className="text-lg font-serif font-bold text-slate-900">Hızlı İşlemler</h2>
            <p className="text-xs text-slate-400 mt-0.5">Sık yapılan işlemlere anında erişin.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 flex-1">
            
            <Link 
              href="/admin/posts"
              className="flex flex-col items-center justify-center p-4 bg-[#fbf8f1]/80 hover:bg-[#8d6e45] border border-[#d6c2a0]/40 text-[#8d6e45] hover:text-white rounded-2xl transition-all duration-300 shadow-xs hover:shadow-md group text-center cursor-pointer"
            >
              <FilePlus className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold leading-tight">Yazı Yönetimi</span>
            </Link>

            <Link 
              href="/admin/services"
              className="flex flex-col items-center justify-center p-4 bg-[#fbf8f1]/80 hover:bg-[#8d6e45] border border-[#d6c2a0]/40 text-[#8d6e45] hover:text-white rounded-2xl transition-all duration-300 shadow-xs hover:shadow-md group text-center cursor-pointer"
            >
              <Briefcase className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold leading-tight">Hizmet Ekle</span>
            </Link>

            <Link 
              href="/admin/settings"
              className="flex flex-col items-center justify-center p-4 bg-[#fbf8f1]/80 hover:bg-[#8d6e45] border border-[#d6c2a0]/40 text-[#8d6e45] hover:text-white rounded-2xl transition-all duration-300 shadow-xs hover:shadow-md group text-center cursor-pointer"
            >
              <Sliders className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold leading-tight">İletişim Ayarları</span>
            </Link>

            <Link 
              href="/" 
              target="_blank"
              className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-slate-900 border border-slate-200 text-slate-600 hover:text-white rounded-2xl transition-all duration-300 shadow-xs hover:shadow-md group text-center cursor-pointer"
            >
              <Globe className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold leading-tight">Site Önizleme</span>
            </Link>

          </div>
        </div>

      </div>

    </div>
  )
}