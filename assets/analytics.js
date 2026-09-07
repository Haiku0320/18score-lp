/* 18 Score website analytics. This file is used only by public web pages. */
window.GA_MEASUREMENT_ID = "G-31S26FWTV6";

(function () {
  var params = new URLSearchParams(window.location.search);
  try {
    if (params.get("analytics") === "off") {
      window.localStorage.setItem("18score_analytics_opt_out", "1");
    } else if (params.get("analytics") === "on") {
      window.localStorage.removeItem("18score_analytics_opt_out");
    }
    if (window.localStorage.getItem("18score_analytics_opt_out") === "1") return;
  } catch (_) {
    if (params.get("analytics") === "off") return;
  }

  var id = window.GA_MEASUREMENT_ID;
  if (!id || id.indexOf("G-XXXX") === 0) return;

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    restricted_data_processing: true
  });
})();

/* Count movement to the TestFlight registration page, not accepted registrations. */
document.addEventListener("click", function (event) {
  var target = event.target;
  var link = target && target.closest ? target.closest('a[href*="signup"]') : null;
  if (link && typeof window.gtag === "function") {
    window.gtag("event", "signup_click", { location: link.className || "cta" });
  }
});
