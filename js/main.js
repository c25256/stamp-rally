document.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i <= 6; i++) {
    const stampKey = `stamp${i}`;
    const hasStamp = localStorage.getItem(stampKey);
    const img = document.getElementById(`stamp-${i}`);
    if (hasStamp === "true") {
      img.src = `assets/stamps/stamp${i}.png`;  // スタンプ画像
    }
  }
});
function onScanSuccess(decodedText, decodedResult) {
  console.log(`読み取った内容: ${decodedText}`);

  // 表示更新
  document.getElementById("qr-content").textContent = decodedText;

  // localStorageに保存（ページ更新後も残る）
  localStorage.setItem("qrData", decodedText);

  // 読み取り停止（必要なら）
  html5QrcodeScanner.clear();
}

window.addEventListener("load", () => {
  // 保存されたQRコード内容を表示
  const saved = localStorage.getItem("qrData");
  if (saved) {
    document.getElementById("qr-content").textContent = saved;
  }

  // QRコードスキャナー初期化・開始
const html5QrCode = new Html5Qrcode("reader"); // ← QRコードを表示するdivのID
html5QrCode.start(
  { facingMode: "environment" }, // 背面カメラ
  { fps: 10, qrbox: 250 },       // 設定（オプション）
  (decodedText, decodedResult) => {
    console.log("読み取った内容:", decodedText);
  },
  (errorMessage) => {
    // スキャン失敗時の処理（省略可）
  }
);

