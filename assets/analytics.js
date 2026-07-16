/* =====================================================================
   18 Score  Web アクセス解析（Google Analytics 4）
   ---------------------------------------------------------------------
   ▼ 有効化のしかた（このファイルの1か所だけ変えればOK）
     下の "G-XXXXXXXXXX" を、GA4 で発行した測定ID（例: G-ABCD1234EF）に
     置き換えて保存 → commit/push するだけで計測が始まります。
     置き換えるまでは Google へ一切データを送信しません（下のガード参照）。
   ===================================================================== */
window.GA_MEASUREMENT_ID = "G-31S26FWTV6";

(function () {
  var id = window.GA_MEASUREMENT_ID;
  // プレースホルダのまま（未設定）なら、スクリプトを読み込まず送信もしない
  if (!id || id.indexOf("G-XXXX") === 0) return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", id);
})();

/* LP内の「事前登録」ボタン（/signup/ への導線）クリックを計測。
   ボタンから実際の登録フォームへ進んだ数が分かる。 */
document.addEventListener("click", function (e) {
  var t = e.target;
  var a = t && t.closest ? t.closest('a[href*="signup"]') : null;
  if (a && typeof window.gtag === "function") {
    gtag("event", "signup_click", { location: a.className || "cta" });
  }
});
