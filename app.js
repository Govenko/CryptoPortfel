// === Настройки портфеля ===
const portfolio = [
  { symbol: "XCH", name: "Chia", amount: 33.87, buyPrice: 19.28 },
  { symbol: "ARB", name: "Arbitrum", amount: 338.15, buyPrice: 0.8941 },
  { symbol: "OP", name: "Optimism", amount: 198.52, buyPrice: 1.8105 },
  { symbol: "DOT", name: "Polkadot", amount: 28.74, buyPrice: 5.6279 },
  { symbol: "NOT", name: "Notcoin", amount: 40031.00, buyPrice: 0.007664 },
  { symbol: "DOGS", name: "DOGS", amount: 498018.00, buyPrice: 0.001001 },
  { symbol: "FIL", name: "Filecoin", amount: 22.71, buyPrice: 3.2311 },
  { symbol: "MANA", name: "Decentraland", amount: 135.43, buyPrice: 0.3317 },
  { symbol: "BAT", name: "Basic Attention Token", amount: 236.00, buyPrice: 0.1857 },
  { symbol: "ATOM", name: "Cosmos", amount: 7.0000, buyPrice: 4.0000 },
  { symbol: "XRP", name: "XRP", amount: 10.00, buyPrice: 2.0934 },
  { symbol: "HMSTR", name: "Hamster Kombat", amount: 32995.00, buyPrice: 0.006119 },
  { symbol: "DYDX", name: "dYdX", amount: 34.93, buyPrice: 1.2125 },
  { symbol: "PYTH", name: "Pyth Network", amount: 114.81, buyPrice: 0.2030 },
  { symbol: "WLD", name: "Worldcoin", amount: 9.9000, buyPrice: 2.3000 },
  { symbol: "COMP", name: "Compound", amount: 0.32, buyPrice: 46.34 },
  { symbol: "STRK", name: "Starknet", amount: 77.15, buyPrice: 1.0346 },
  { symbol: "ORDI", name: "ORDI", amount: 0.99, buyPrice: 28.76 },
  { symbol: "SOL", name: "Solana", amount: 0.03, buyPrice: 155.00 },
  { symbol: "ICP", name: "Internet Computer", amount: 1.4900, buyPrice: 9.5760 },
  { symbol: "CYBER", name: "Cyber", amount: 4.0100, buyPrice: 7.7300 },
  { symbol: "ZEN", name: "Horizen", amount: 0.95, buyPrice: 15.66 },
  { symbol: "TIA", name: "Celestia", amount: 3.6000, buyPrice: 9.0000 },
  { symbol: "ZK", name: "ZKsync", amount: 99.00, buyPrice: 0.1765 },
  { symbol: "NEAR", name: "NEAR Protocol", amount: 1.9900, buyPrice: 5.5800 },
  { symbol: "ZETA", name: "ZetaChain", amount: 25.89, buyPrice: 1.5500 },
  { symbol: "SUI", name: "Sui", amount: 1.0000, buyPrice: 4.4400 },
  { symbol: "FLOW", name: "Flow", amount: 7.0000, buyPrice: 0.5 },
  { symbol: "MAJOR", name: "Major", amount: 15.00, buyPrice: 0.769 },
  { symbol: "RADAR", name: "DappRadar", amount: 1000.00, buyPrice: 0.005919 },
  { symbol: "VELO", name: "Velo", amount: 100.00, buyPrice: 0.025 },
  { symbol: "GMX", name: "GMX", amount: 0.09, buyPrice: 17.53 },
  { symbol: "LINEA", name: "Linea", amount: 41.00, buyPrice: 0.02526 },
  { symbol: "CATS", name: "CATS", amount: 500000.00, buyPrice: 0.0000587 }
];

// === Маппинг символ → CoinGecko ID ===
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
  DYDX: "dydx-chain",
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
  NEAR: "near",
  ZETA: "zetachain",
  SUI: "sui",
  FLOW: "flow",
  MAJOR: "major",
  RADAR: "dappradar",
  VELO: "velo",
  GMX: "gmx",
  LINEA: "linea",
  CATS: "catswap"
};

// === DOM Elements ===
const tableBody = document.getElementById("portfolio-body");
const totalProfitCell = document.getElementById("total-profit");
const lastUpdated = document.getElementById("last-updated");

// === Обновление цен ===
async function refreshPrices() {
  const symbols = portfolio.map(p => p.symbol);
  const ids = symbols.map(s => coinGeckoIds[s]).filter(Boolean).join(",");

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );
    const data = await response.json();

    let totalInvested = 0;
    let totalCurrent = 0;

    tableBody.innerHTML = "";

    portfolio.forEach(asset => {
      const id = coinGeckoIds[asset.symbol];
      const currentPrice = data[id]?.usd || null;
      const invested = asset.amount * asset.buyPrice;
      const currentValue = currentPrice ? asset.amount * currentPrice : 0;
      const difference = currentValue - invested;
      const percent = invested > 0 ? (difference / invested) * 100 : 0;

      totalInvested += invested;
      totalCurrent += currentValue;

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${asset.name} (${asset.symbol})</td>
        <td>${asset.amount.toLocaleString(undefined, { maximumFractionDigits: 6 })}</td>
        <td>$${asset.buyPrice.toFixed(6)}</td>
        <td>$${invested.toFixed(2)}</td>
        <td>$${currentPrice ? currentPrice.toFixed(6) : "—"}${currentPrice === null ? ' <small style="color:red">?</small>' : ''}</td>
        <td>$${currentValue.toFixed(2)}</td>
        <td class="${difference >= 0 ? 'positive' : 'negative'}">$${difference.toFixed(2)}</td>
        <td class="${difference >= 0 ? 'positive' : 'negative'}">${percent.toFixed(2)}%</td>
      `;

      tableBody.appendChild(row);
    });

    const totalDiff = totalCurrent - totalInvested;
    totalProfitCell.textContent = `$${totalDiff.toFixed(2)} (${((totalDiff / totalInvested) * 100).toFixed(2)}%)`;
    totalProfitCell.className = totalDiff >= 0 ? "positive" : "negative";

    lastUpdated.textContent = new Date().toLocaleString("ru-RU");
  } catch (error) {
    console.error("Ошибка получения цен:", error);
    alert("Не удалось загрузить данные о ценах.");
  }
}

// === Автообновление при загрузке ===
document.addEventListener("DOMContentLoaded", () => {
  refreshPrices();
});
