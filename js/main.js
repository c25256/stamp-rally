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
  window.html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader",
    { fps: 10, qrbox: 250 },
    false
  );
  html5QrcodeScanner.render(onScanSuccess);
});
