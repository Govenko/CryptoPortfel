// === Конфигурация портфеля ===
// Здесь ты вручную указываешь свои монеты
const portfolio = [
  { symbol: "Chia", amount: 33.87, buyPrice: 19.28 },
  { symbol: "Arbitrum", amount: 338.15, buyPrice: 0.4873 },
  { symbol: "Optimism", amount: 198.52, buyPrice: 0.7349 },
  { symbol: "Polkadot", amount: 28.74, buyPrice: 4.1215 },
  { symbol: "Notcoin", amount: 40031.00, buyPrice: 0.001842 },
  { symbol: "DOGS", amount: 498018.00, buyPrice: 0.0001329 },
  { symbol: "Filecoin", amount: 22.71, buyPrice: 2.3866 },
  { symbol: "Decentraland", amount: 135.43, buyPrice: 0.3300 },
  { symbol: "Basic Attention Token", amount: 236.00, buyPrice: 0.1520 },
  { symbol: "Cosmos", amount: 7.0000, buyPrice: 4.4741 },
  { symbol: "XRP", amount: 10.00, buyPrice: 3.0102 },
  { symbol: "Hamster Kombat", amount: 32995.00, buyPrice: 0.0006854 },
  { symbol: "dYdX", amount: 34.93, buyPrice: 0.6001 },
  { symbol: "Pyth Network", amount: 114.81, buyPrice: 0.1570 },
  { symbol: "Worldcoin", amount: 9.9000, buyPrice: 1.4803 },
  { symbol: "Compound", amount: 0.32, buyPrice: 43.36 },
  { symbol: "Starknet", amount: 77.15, buyPrice: 0.1298 },
  { symbol: "ORDI", amount: 0.99, buyPrice: 9.3007 },
  { symbol: "Solana", amount: 0.03, buyPrice: 232.02 },
  { symbol: "Internet Computer", amount: 1.4900, buyPrice: 4.6435 },
  { symbol: "Cyber", amount: 4.0100, buyPrice: 1.7137 },
  { symbol: "Horizen", amount: 0.95, buyPrice: 7.1736 },
  { symbol: "Celestia", amount: 3.6000, buyPrice: 1.6654 },
  { symbol: "ZKsync", amount: 99.00, buyPrice: 0.05696 },
  { symbol: "NEAR Protocol", amount: 1.9900, buyPrice: 2.5889 },
  { symbol: "ZetaChain", amount: 25.89, buyPrice: 0.1834 },
  { symbol: "Sui", amount: 1.0000, buyPrice: 3.4806 },
  { symbol: "Flow", amount: 7.0000, buyPrice: 0.3942 },
  { symbol: "Major", amount: 15.00, buyPrice: 0.1582 },
  { symbol: "DappRadar", amount: 1000.00, buyPrice: 0.001748 },
  { symbol: "Velo", amount: 100.00, buyPrice: 0.01518 },
  { symbol: "GMX", amount: 0.09, buyPrice: 14.79 },
  { symbol: "Linea", amount: 41.00, buyPrice: 0.02639 },
  { symbol: "CATS", amount: 500000.00, buyPrice: 0.000001928 },
];

// === Маппинг названий монет к ID CoinGecko ===
// Важно: нужно знать ID каждой монеты в CoinGecko API
const coinGeckoIds = {
  "Chia": "chia",
  "Arbitrum": "arbitrum",
  "Optimism": "optimism",
  "Polkadot": "polkadot",
  "Notcoin": "notcoin",
  "DOGS": "dogs",
  "Filecoin": "filecoin",
  "Decentraland": "decentraland",
  "Basic Attention Token": "basic-attention-token",
  "Cosmos": "cosmos",
  "XRP": "ripple",
  "Hamster Kombat": "hamster-kombat",
  "dYdX": "dydx",
  "Pyth Network": "pyth-network",
  "Worldcoin": "worldcoin",
  "Compound": "compound-governance-token",
  "Starknet": "starknet",
  "ORDI": "ordinals",
  "Solana": "solana",
  "Internet Computer": "internet-computer",
  "Cyber": "cyberconnect",
  "Horizen": "horizen",
  "Celestia": "celestia",
  "ZKsync": "zksync",
  "NEAR Protocol": "near",
  "ZetaChain": "zetachain",
  "Sui": "sui",
  "Flow": "flow",
  "Major": "major",
  "DappRadar": "dappradar",
  "Velo": "velo",
  "GMX": "gmx",
  "Linea": "linea",
  "CATS": "cats",
};

// === Основная функция ===
let pricesCache = {};
let lastUpdate = null;

async function updatePrices() {
  const ids = Object.values(coinGeckoIds).join(",");
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );
    const data = await response.json();

    // Кэшируем цены
    for (const [name, id] of Object.entries(coinGeckoIds)) {
      if (data[id]?.usd) {
        pricesCache[name] = data[id].usd;
      }
    }

    lastUpdate = new Date().toLocaleString("ru-RU");
    document.getElementById("last-update").textContent = lastUpdate;
    renderTable();
  } catch (err) {
    console.error("Ошибка получения цен:", err);
    alert("Не удалось получить цены. Проверь подключение.");
  }
}

function renderTable() {
  const tbody = document.querySelector("#portfolio-table tbody");
  tbody.innerHTML = "";

  let totalInvested = 0;
  let totalCurrent = 0;

  portfolio.forEach((coin) => {
    const currentPrice = pricesCache[coin.symbol] || 0;
    const invested = coin.amount * coin.buyPrice;
    const currentWorth = coin.amount * currentPrice;
    const diff = currentWorth - invested;
    const percent = invested > 0 ? (diff / invested) * 100 : 0;

    totalInvested += invested;
    totalCurrent += currentWorth;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td data-label="Монета">${coin.symbol}</td>
      <td data-label="Цена покупки">${coin.buyPrice.toFixed(6)}</td>
      <td data-label="Количество">${coin.amount.toLocaleString('ru-RU', { maximumFractionDigits: 6 })}</td>
      <td data-label="Вложено">${invested.toFixed(2)}</td>
      <td data-label="Текущая цена">${currentPrice > 0 ? currentPrice.toFixed(6) : '---'}</td>
      <td data-label="Сейчас стоит">${currentWorth.toFixed(2)}</td>
      <td data-label="Разница" class="${diff >= 0 ? 'positive' : 'negative'}">${diff.toFixed(2)}</td>
      <td data-label="% прибыли" class="${percent >= 0 ? 'positive' : 'negative'}">${percent.toFixed(2)}%</td>
    `;

    tbody.appendChild(row);
  });

  const totalProfit = totalCurrent - totalInvested;
  document.getElementById("total-profit").textContent =
    `${totalProfit > 0 ? '+' : ''}${totalProfit.toFixed(2)}$`;

  // Сохраняем общую прибыль в localStorage для возможного виджета
  localStorage.setItem("cryptoPortfolioTotal", JSON.stringify({
    profit: totalProfit,
    timestamp: lastUpdate
  }));
}

// === Загрузка при старте ===
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("refresh").addEventListener("click", updatePrices);

  // Попробовать загрузить кэш
  if (localStorage.getItem("pricesCache")) {
    pricesCache = JSON.parse(localStorage.getItem("pricesCache"));
    lastUpdate = localStorage.getItem("lastUpdate");
    document.getElementById("last-update").textContent = lastUpdate || "неизвестно";
  }

  // Всё равно обновляем онлайн
  updatePrices();

  // Автообновление каждые 10 минут
  setInterval(updatePrices, 10 * 60 * 1000);
});
