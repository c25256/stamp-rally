document.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i <= 6; i++) {
    const stampKey = `stamp${i}`;
    const hasStamp = localStorage.getItem(stampKey);
    const img = document.getElementById(`stamp-${i}`);
    if (hasStamp === "true") {
      img.src = `assets/stamps/stamp${i}.png`;
    }
  }
});

function onScanSuccess(decodedText, decodedResult) {
  console.log(`読み取った内容: ${decodedText}`);
  document.getElementById("qr-content").textContent = decodedText;
  localStorage.setItem("qrData", decodedText);

  // スタンプ反映の例（必要に応じて）
  if(decodedText.startsWith("stamp")){
    const num = decodedText.replace("stamp","");
    const img = document.getElementById(`stamp-${num}`);
    if(img){
      img.src = `assets/stamps/stamp${num}.png`;
      localStorage.setItem(`stamp${num}`, "true");
    }
  }

  // スキャン停止してカメラ非表示
  html5QrcodeScanner.stop().then(() => {
    document.getElementById("qr-reader").style.display = "none";
    document.getElementById("start-camera").style.display = "inline-block";
  }).catch(err => {
    console.error("カメラ停止エラー:", err);
  });
}

window.addEventListener("load", () => {
  // 保存されたQRコード内容を表示
  const saved = localStorage.getItem("qrData");
  if (saved) {
    document.getElementById("qr-content").textContent = saved;
  }

  // 最初はカメラ非表示、カメラ起動ボタンだけ表示
  document.getElementById("qr-reader").style.display = "none";
  document.getElementById("start-camera").style.display = "inline-block";

  // ボタンをクリックしたらカメラ起動
  document.getElementById("start-camera").addEventListener("click", () => {
    document.getElementById("start-camera").style.display = "none";
    const qrReader = document.getElementById("qr-reader");
    qrReader.style.display = "block";

    window.html5QrcodeScanner = new Html5Qrcode("qr-reader");

    html5QrcodeScanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onScanSuccess,
      (errorMessage) => {
        // 読み取り失敗時のログなど（任意）
        // console.log(`読み取り失敗: ${errorMessage}`);
      }
    ).catch(err => {
      alert("カメラを起動できませんでした: " + err);
      document.getElementById("qr-reader").style.display = "none";
      document.getElementById("start-camera").style.display = "inline-block";
    });
  });
});


