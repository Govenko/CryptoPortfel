// === Настройки портфеля (вручную) ===
const portfolio = [
  { symbol: "XCH", name: "Chia", amount: 33.87, buyPrice: 19.28 },
{ symbol: "OP", name: "Optimism", amount: 204.72, buyPrice: 1.8168 },  
{ symbol: "ARB", name: "Arbitrum", amount: 350.15, buyPrice: 0.8941 },
{ symbol: "NOT", name: "Notcoin", amount: 40712.00, buyPrice: 0.007664 },
{ symbol: "DOT", name: "Polkadot", amount: 29.08, buyPrice: 5.6279 },
{ symbol: "STRK", name: "Starknet", amount: 88.58, buyPrice: 0.9132 },
{ symbol: "FIL", name: "Filecoin", amount: 22.71, buyPrice: 3.2311 },
{ symbol: "BAT", name: "Basic Attention Token", amount: 248.00, buyPrice: 0.1857 },
{ symbol: "ATOM", name: "Cosmos", amount: 10.6000, buyPrice: 4.3000 },
{ symbol: "MANA", name: "Decentraland", amount: 135.43, buyPrice: 0.3317 },
{ symbol: "ZETA", name: "ZetaChain", amount: 27.89, buyPrice: 1.5500 },
{ symbol: "DYDX", name: "dYdX", amount: 34.93, buyPrice: 1.2125 },
{ symbol: "ZK", name: "ZKsync", amount: 399.25, buyPrice: 0.09479 },
{ symbol: "SOL", name: "Solana", amount: 0.1698, buyPrice: 155.00 },
{ symbol: "XRP", name: "XRP", amount: 11.68, buyPrice: 2.1332 },
{ symbol: "PYTH", name: "Pyth Network", amount: 164.81, buyPrice: 0.2027 },
{ symbol: "TIA", name: "Celestia", amount: 3.6000, buyPrice: 9.0000 },
{ symbol: "CYBER", name: "Cyber", amount: 4.0100, buyPrice: 7.7300 },
{ symbol: "ORDI", name: "ORDI", amount: 0.99, buyPrice: 28.76 },
{ symbol: "ZEN", name: "Horizen", amount: 0.95, buyPrice: 15.66 },
{ symbol: "WLD", name: "Worldcoin", amount: 9.9000, buyPrice: 2.3000 },
{ symbol: "COMP", name: "Compound", amount: 0.3966, buyPrice: 47.73 },
{ symbol: "LINEA", name: "Linea", amount: 837.58, buyPrice: 0.02054 },
{ symbol: "APE", name: "ApeCoin", amount: 27.61, buyPrice: 0.5825 },
{ symbol: "ICP", name: "Internet Computer", amount: 1.5100, buyPrice: 9.5760 },
{ symbol: "BLUR", name: "Blur", amount: 189.88, buyPrice: 0.07452 },
{ symbol: "ME", name: "Magic Eden", amount: 23.00, buyPrice: 0.4338 },
{ symbol: "CELO", name: "Celo", amount: 30.21, buyPrice: 0.36 },
{ symbol: "CHZ", name: "Chiliz", amount: 240.00, buyPrice: 0.04518 },
{ symbol: "MORPHO", name: "Morpho", amount: 4.78, buyPrice: 1.98 },
{ symbol: "LDO", name: "Lido DAO", amount: 10.97, buyPrice: 0.8918 },
{ symbol: "SCRT", name: "Secret", amount: 44.23, buyPrice: 0.2031 },
{ symbol: "FXS", name: "Frax (prev. FXS)", amount: 6.40, buyPrice: 1.3832 },
{ symbol: "MNT", name: "Mantle", amount: 5.60, buyPrice: 1.56 },
{ symbol: "SUI", name: "Sui", amount: 1.0000, buyPrice: 4.4400 },
{ symbol: "FLOW", name: "Flow", amount: 7.5000, buyPrice: 0.5 },
{ symbol: "VELO", name: "Velo", amount: 100.00, buyPrice: 0.025 },
{ symbol: "GMX", name: "GMX", amount: 0.09, buyPrice: 17.53 },
{ symbol: "KASTA", name: "Kasta", amount: 150.00, buyPrice: 0.01099 },
{ symbol: "TRUMP", name: "OFFICIAL TRUMP", amount: 0.339, buyPrice: 5.83 },
{ symbol: "PEPE", name: "Pepe", amount: 874732.00, buyPrice: 0.00001307 },
{ symbol: "HMSTR", name: "Hamster Kombat", amount: 48300.00, buyPrice: 0.006119 },
{ symbol: "MAJOR", name: "Major", amount: 15.00, buyPrice: 0.769 },
{ symbol: "VRTS", name: "Vertus", amount: 1797.00, buyPrice: 0.0001 },
{ symbol: "CATS", name: "CATS", amount: 500000.00, buyPrice: 0.0000587 },
{ symbol: "DOGS", name: "DOGS", amount: 46605.00, buyPrice: 0.01001 }
];

// === Маппинг символа → ID CoinGecko ===
const coinGeckoIds = {
  XCH: "chia",
  ARB: "arbitrum",
  OP: "optimism",
  DOT: "polkadot",
  NOT: "notcoin",
  DOGS: "dogs",
  FIL: "filecoin",
  MANA: "decentraland",
  BAT: "basic-attention-token",
  ATOM: "cosmos",
  XRP: "ripple",
  HMSTR: "hamster-kombat",
  DYDX: "dydx",
  PYTH: "pyth-network",
  WLD: "worldcoin",
  COMP: "compound-governance-token",
  STRK: "starknet",
  ORDI: "ordinals",
  SOL: "solana",
  ICP: "internet-computer",
  CYBER: "cyberconnect",
  ZEN: "horizen",
  TIA: "celestia",
  ZK: "zksync",
  ZETA: "zetachain",
  SUI: "sui",
  FLOW: "flow",
  MAJOR: "major",
  VELO: "velo",
  GMX: "gmx",
  LINEA: "linea",
  CATS: "cats",
  APE: "apecoin",
  ME: "magic-eden",
  LDO: "lido-dao",
  MORPHO: "morpho",
  BLUR: "blur",
  FXS: "frax-share",
  MNT: "mantle",
  CHZ: "chiliz",
  CELO: "celo",
  SCRT: "secret",
  PEPE: "pepe",
  TRUMP: "official-trump",
  VRTS: "vertus",
  KASTA: "kasta"
};

// === Обновление таблицы ===
async function updatePortfolio() {
  const tbody = document.getElementById("portfolio-body");
  const totalProfitEl = document.getElementById("total-profit");
  const loader = document.getElementById("loader");

  loader.style.display = "block";
  tbody.innerHTML = "";

  let totalInvested = 0;
  let totalCurrent = 0;

  // Собираем ID для массового запроса
  const ids = portfolio.map(p => coinGeckoIds[p.symbol]).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    portfolio.forEach(coin => {
      const id = coinGeckoIds[coin.symbol];
      const currentPrice = data[id]?.usd || 0;

      const invested = coin.amount * coin.buyPrice;
      const current = coin.amount * currentPrice;
      const diff = current - invested;
      const percent = invested > 0 ? (diff / invested) * 100 : 0;

      totalInvested += invested;
      totalCurrent += current;

     const row = document.createElement("tr");

// Форматируем каждое поле по-своему
const formattedAmount = Math.round(coin.amount).toLocaleString();           // Целое
const formattedBuyPrice = coin.buyPrice.toFixed(2);                         // 2 знака
const formattedInvested = Math.round(invested).toLocaleString();            // Целое
const formattedCurrentPrice = currentPrice.toFixed(2);                      // 2 знака
const formattedCurrentValue = Math.round(current).toLocaleString();         // Целое
const formattedDiff = Math.round(diff).toLocaleString();                    // Целое
const formattedPercent = Math.round(percent) + '%';                         // Целый %

row.innerHTML = `
  <td>${coin.name} (${coin.symbol})</td>
  <td>${formattedAmount}</td>
  <td>$${formattedBuyPrice}</td>
  <td>$${formattedInvested}</td>
  <td>$${formattedCurrentPrice}</td>
  <td>$${formattedCurrentValue}</td>
  <td class="${diff >= 0 ? 'positive' : 'negative'}">$${formattedDiff}</td>
  <td class="${diff >= 0 ? 'positive' : 'negative'}">${formattedPercent}</td>
`;

      tbody.appendChild(row);
    });

    const totalDiff = totalCurrent - totalInvested;
    const totalPercent = totalInvested > 0 ? (totalDiff / totalInvested) * 100 : 0;
    totalProfitEl.textContent = `${formatNumber(totalDiff)} (${
      totalDiff >= 0 ? '+' : ''
    }${formatNumber(totalPercent)}%)`;
    totalProfitEl.className = totalDiff >= 0 ? 'positive' : 'negative';

  } catch (error) {
    console.error("Ошибка загрузки цен:", error);
    totalProfitEl.textContent = "Ошибка";
  } finally {
    loader.style.display = "none";
  }
}

// Универсальная функция для форматирования чисел
function formatNumber(num) {
  if (Math.abs(num) < 0.01 && num !== 0) {
    return num.toExponential(4);
  }
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
}

// Обновляем каждые 60 сек
updatePortfolio();
setInterval(updatePortfolio, 60000);
