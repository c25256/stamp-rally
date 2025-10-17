// ページ読み込み時：スタンプの状態を復元
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i <= 6; i++) {
    const stampKey = `stamp${i}`;
    const hasStamp = localStorage.getItem(stampKey);
    const img = document.getElementById(`stamp-${i}`);
    if (hasStamp === "true") {
      img.src = `assets/stamps/stamp${i}.png`;
    }
  }

  // 保存済みのQRコード内容（デバッグ用）
  const saved = localStorage.getItem("qrData");
  if (saved) {
    document.getElementById("qr-content").textContent = saved;
  }

  // 最初はQRリーダー非表示
  document.getElementById("qr-reader").style.display = "none";
  document.getElementById("start-camera").style.display = "inline-block";
});

// QRコード読み取り成功時の処理
function onScanSuccess(decodedText, decodedResult) {
  console.log(`読み取った内容: ${decodedText}`);
  document.getElementById("qr-content").textContent = decodedText;
  localStorage.setItem("qrData", decodedText);

  // === ✅ スタンプ用QRコードだった場合 ===
  if (decodedText.startsWith("stamp")) {
    const num = decodedText.replace("stamp", "");
    const img = document.getElementById(`stamp-${num}`);
    if (img) {
      img.src = `assets/stamps/stamp${num}.png`;
      localStorage.setItem(`stamp${num}`, "true");
    }

    // カメラ停止と表示切り替え
    html5QrcodeScanner.stop().then(() => {
      document.getElementById("qr-reader").style.display = "none";
      document.getElementById("start-camera").style.display = "inline-block";
    }).catch(err => {
      console.error("カメラ停止エラー:", err);
    });

    return;
  }

  // === ✅ URLだった場合は自動遷移 ===
  if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
    window.location.href = decodedText;
    return;
  }

  // === ✅ それ以外の内容だった場合（リンクを表示）===
  const qrContent = document.getElementById("qr-content");
  qrContent.innerHTML = `<a href="${decodedText}" target="_blank" style="font-size: 18px;">▶ リンクを開く</a>`;

  // カメラ停止
  html5QrcodeScanner.stop().then(() => {
    document.getElementById("qr-reader").style.display = "none";
    document.getElementById("start-camera").style.display = "inline-block";
  }).catch(err => {
    console.error("カメラ停止エラー:", err);
  });
}

// カメラ起動処理
window.addEventListener("load", () => {
  document.getElementById("start-camera").addEventListener("click", () => {
    document.getElementById("start-camera").style.display = "none";
    const qrReader = document.getElementById("qr-reader");
    qrReader.style.display = "block";

    window.html5QrcodeScanner = new Html5Qrcode("qr-reader");

    html5QrcodeScanner.start(
      { facingMode: "environment" },  // リアカメラ使用
      { fps: 10, qrbox: 250 },
      onScanSuccess,
      (errorMessage) => {
        console.warn("読み取り失敗:", errorMessage);
      }
    ).catch(err => {
      alert("カメラを起動できませんでした: " + err);
      document.getElementById("qr-reader").style.display = "none";
      document.getElementById("start-camera").style.display = "inline-block";
    });
  });
});



