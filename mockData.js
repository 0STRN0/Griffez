// ═══════════════════════════════════════════
// GRIFFERZ - MOCK DATA
// ═══════════════════════════════════════════

export const STORIES_DATA = [
  { id: 1, user: "Seu Story", emoji: "＋", live: false, isOwn: true },
  { id: 2, user: "DRXP", emoji: "💎", live: true },
  { id: 3, user: "NÏGHT", emoji: "🌙", live: false },
  { id: 4, user: "ZEN", emoji: "⚡", live: false },
  { id: 5, user: "CHROME", emoji: "🪞", live: false },
  { id: 6, user: "FUTURE", emoji: "🌌", live: true },
  { id: 7, user: "KÏDØ", emoji: "🖤", live: false },
  { id: 8, user: "GLITCH", emoji: "💫", live: false },
];

export const POSTS_DATA = [
  {
    id: 1,
    user: "XØVERA",
    handle: "@xovera_fits",
    av: "🦋",
    verified: true,
    likes: 24700,
    likesStr: "24.7K",
    cmts: 1200,
    cmtsStr: "1.2K",
    shares: 892,
    desc: "Outfit do dia: full chrome com corset metálico 🪞✨ A peça chegou e estou obcecada",
    tags: ["#ChromeCore", "#AltFashion", "#GRIFFERZ"],
    product: "Chrome Corset Set",
    productPrice: "R$ 890",
    emoji: "🪞",
    sub: "CHROME COLLECTION 2099",
    bg: "linear-gradient(160deg, #0e0e0e 0%, #1a1a2e 50%, #0e0e0e 100%)",
    timeAgo: "2h",
    location: "São Paulo, BR",
  },
  {
    id: 2,
    user: "DRXP GOLD",
    handle: "@drxp.official",
    av: "💎",
    verified: true,
    likes: 61300,
    likesStr: "61.3K",
    cmts: 3400,
    cmtsStr: "3.4K",
    shares: 2100,
    desc: "Novo grill full VVS banhado a ouro ⚡ Disponível só na nossa loja do GRIFFERZ",
    tags: ["#Grillz", "#VVS", "#Luxo"],
    product: "Gold VVS Grillz",
    productPrice: "R$ 2.400",
    emoji: "👑",
    sub: "VVS GRILLZ — OURO 18K",
    bg: "linear-gradient(160deg, #0d0d0d 0%, #1a1a0e 50%, #0d0d0d 100%)",
    timeAgo: "4h",
    location: "Rio de Janeiro, BR",
  },
  {
    id: 3,
    user: "NÏGHT.CLUB",
    handle: "@nightclub.br",
    av: "🌙",
    verified: true,
    likes: 18900,
    likesStr: "18.9K",
    cmts: 834,
    cmtsStr: "834",
    shares: 445,
    desc: "Streetwear rave season 2099 chegou 🔮 Só aqui no GRIFFERZ, edição limitada",
    tags: ["#RaveWear", "#Streetwear", "#Underground"],
    product: "Rave Season Set",
    productPrice: "R$ 1.290",
    emoji: "🔮",
    sub: "RAVE SEASON 2099",
    bg: "linear-gradient(160deg, #0c0c0c 0%, #0e0c1a 50%, #0c0c0c 100%)",
    timeAgo: "6h",
    location: "Curitiba, BR",
  },
  {
    id: 4,
    user: "CHROME.BIO",
    handle: "@chrome.bio",
    av: "💫",
    verified: false,
    likes: 8400,
    likesStr: "8.4K",
    cmts: 312,
    cmtsStr: "312",
    shares: 156,
    desc: "Alien Ring Set — o futuro das joias chegou 💫 Edição limitada, corra!",
    tags: ["#AlienJewel", "#FutureRings", "#Chrome"],
    product: "Alien Ring Set",
    productPrice: "R$ 680",
    emoji: "💫",
    sub: "ALIEN COLLECTION",
    bg: "linear-gradient(160deg, #0a0a0a 0%, #0a0e1a 50%, #0a0a0a 100%)",
    timeAgo: "8h",
    location: "Belo Horizonte, BR",
  },
];

export const CHIPS_DATA = ["TUDO", "GRILLZ", "RAVE", "STREETWEAR", "JOIAS", "ACESSÓRIOS"];

export const TRENDS_DATA = [
  { r: 1, tag: "#ChromeCore", posts: "847K posts", hot: true },
  { r: 2, tag: "#GrillzSzn", posts: "623K posts", hot: true },
  { r: 3, tag: "#RaveWear2099", posts: "512K posts", hot: false },
  { r: 4, tag: "#AltFashionBR", posts: "389K posts", hot: false },
  { r: 5, tag: "#VVSGang", posts: "267K posts", hot: true },
  { r: 6, tag: "#CyberpunkFits", posts: "201K posts", hot: false },
  { r: 7, tag: "#UndergroundLux", posts: "178K posts", hot: false },
];

export const DISC_DATA = [
  { e: "🦋", l: "CHROME CORE" },
  { e: "💎", l: "GRILLZ VVS" },
  { e: "⚡", l: "RAVE WEAR" },
  { e: "🔮", l: "UNDERGROUND" },
  { e: "🪞", l: "MIRROR FIT" },
  { e: "🌌", l: "SPACE AGE" },
  { e: "🎵", l: "DJ CULTURE" },
  { e: "👑", l: "LUXURY GRILL" },
  { e: "🌙", l: "NIGHT CLUB" },
  { e: "💫", l: "ALIEN JEWEL" },
  { e: "🔥", l: "HOT DROPS" },
  { e: "🖤", l: "DARK MODE" },
];

export const PRODUCTS_DATA = [
  { id: 1, n: "Chrome Corset", brand: "XØVERA", price: "R$ 890", e: "🪞", tag: "NOVO", tagType: "new", sales: "1.2K vendidos" },
  { id: 2, n: "VVS Full Gold Grillz", brand: "DRXP GOLD", price: "R$ 2.400", e: "💎", tag: "HOT", tagType: "hot", sales: "893 vendidos" },
  { id: 3, n: "Rave Cargo Neon", brand: "NÏGHT.CLUB", price: "R$ 1.290", e: "⚡", tag: "LIM.", tagType: "lim", sales: "567 vendidos" },
  { id: 4, n: "Alien Ring Set", brand: "CHROME.BIO", price: "R$ 680", e: "💫", tag: "TREND", tagType: "hot", sales: "2.1K vendidos" },
  { id: 5, n: "Mirror Bomber", brand: "XØVERA", price: "R$ 1.780", e: "🦋", tag: "EXCLUSIVO", tagType: "lim", sales: "234 vendidos" },
  { id: 6, n: "Holographic Bag", brand: "FUTURESELF", price: "R$ 540", e: "🌌", tag: "NOVO", tagType: "new", sales: "786 vendidos" },
];

export const CHATS_DATA = [
  { id: 1, u: "XØVERA STUDIO", av: "🦋", msg: "Oi! O corset chegou hoje 🪞", time: "agr", unread: 3, on: true },
  { id: 2, u: "DRXP GOLD", av: "💎", msg: "Seu pedido foi enviado ✈️", time: "2min", unread: 1, on: true },
  { id: 3, u: "Kai._.rave", av: "🌙", msg: "que look INSANO esse!", time: "5min", unread: 0, on: false },
  { id: 4, u: "NÏGHT.CLUB", av: "🔮", msg: "Nova coleção amanhã 🔥", time: "12min", unread: 2, on: true },
  { id: 5, u: "ZEN.GRIFF", av: "⚡", msg: "consegui os grillz 💎💎", time: "1h", unread: 0, on: false },
  { id: 6, u: "FUTURESELF", av: "🌌", msg: "Obrigado pela compra! 🙏", time: "3h", unread: 0, on: false },
];

export const NOTIFS_DATA = [
  { id: 1, av: "💎", name: "DRXP GOLD", msg: "Curtiu sua foto", time: "agora", unread: true, type: "like" },
  { id: 2, av: "🦋", name: "XØVERA", msg: "Começou a te seguir", time: "2 min", unread: true, type: "follow" },
  { id: 3, av: "🌙", name: "NÏGHT.CLUB", msg: "Comentou: 'insano 🔥🔥'", time: "8 min", unread: true, type: "comment" },
  { id: 4, av: "⚡", name: "ZEN.GRIFF", msg: "Compartilhou seu post", time: "15 min", unread: false, type: "share" },
  { id: 5, av: "🔮", name: "CHROME.BIO", msg: "Marcou você em um post", time: "1h", unread: false, type: "tag" },
  { id: 6, av: "🌌", name: "FUTURESELF", msg: "Novo drop disponível", time: "2h", unread: false, type: "promo" },
  { id: 7, av: "👑", name: "LUXURY.GR", msg: "Curtiu seu comentário", time: "3h", unread: false, type: "like" },
];

export const CONV_MSGS = [
  { t: "Oi! Tô passada com o corset novo 🪞", s: false, time: "14:22" },
  { t: "Sério?? Manda foto!", s: true, time: "14:23" },
  { t: "Chegou hoje e já tô usando 😍 Ficou PERFEITO", s: false, time: "14:23" },
  { t: "Preciso do meu também 🔥🔥 Ainda tem na loja?", s: true, time: "14:24" },
  { t: "Ainda tem! Vi agora na vitrine do Grifferz", s: false, time: "14:24" },
  { t: "Tô indo comprar agora mesmo ⚡", s: true, time: "14:25" },
];

export const MARKET_CHIPS = ["TODOS", "GRILLZ", "ROUPAS", "JOIAS", "ACESSÓRIOS"];

export const PROF_EMOJIS = ["🦋", "💎", "⚡", "🔮", "🪞", "🌌", "🎵", "👑", "🌙", "💫", "🔥", "🖤"];

export const PROFILE_DATA = {
  name: "XØVERA",
  handle: "@xovera_fits",
  location: "São Paulo, BR",
  bio: "Criadora de moda alternativa · Rave enthusiast",
  bioSub: "Chrome Core · Cyberpunk Luxo · Underground Scene",
  mood: "RAVE SEASON ACTIVATED",
  av: "🦋",
  posts: 247,
  followers: "89.4K",
  following: 512,
  likes: "1.2M",
  verified: true,
};
