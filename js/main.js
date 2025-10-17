function onScanSuccess(decodedText, decodedResult) {
  console.log(`読み取った内容: ${decodedText}`);
  document.getElementById("qr-content").textContent = decodedText;
  localStorage.setItem("qrData", decodedText);

  // スタンプ反映（"stamp1"〜"stamp6"などの場合）
  if(decodedText.startsWith("stamp")){
    const num = decodedText.replace("stamp","");
    const img = document.getElementById(`stamp-${num}`);
    if(img){
      img.src = `assets/stamps/stamp${num}.png`;
      localStorage.setItem(`stamp${num}`, "true");
    }
  }

  // ✅ 読み取った内容がURL形式ならページ遷移
　　if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
  　const qrContent = document.getElementById("qr-content");
  　qrContent.innerHTML = `<a href="${decodedText}" target="_blank" style="font-size: 20px;">▶ リンクを開く</a>`;
　}

  }

  // カメラ停止して非表示に戻す（URLの場合はすでに return 済み）
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
document.addEventListener("DOMContentLoaded", () => {
  // ...（スタンプの復元処理）
});

function onScanSuccess(decodedText, decodedResult) {
  // ...（読み取り成功処理）
}

window.addEventListener("load", () => {
  // ...（ボタン押したらカメラ起動処理）
});





