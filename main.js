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