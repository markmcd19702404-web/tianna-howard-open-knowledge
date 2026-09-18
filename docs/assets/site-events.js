(function () {
  "use strict";

  function sendEvent(name, link, details) {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", name, Object.assign({
      link_url: link.href,
      link_text: (link.textContent || "").trim().slice(0, 100),
      page_path: window.location.pathname
    }, details || {}));
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href]");
    if (!link) return;

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }

    if (/^(www\.)?amazon\.com$/.test(url.hostname) && /\/dp\//.test(url.pathname)) {
      sendEvent("retailer_click", link, { retailer: "amazon_us" });
      return;
    }

    if (url.origin === window.location.origin && /\/tianna-howard-teacher-reader-activity-pack\.pdf$/.test(url.pathname)) {
      sendEvent("activity_pack_download", link, { resource_name: "teacher_reader_activity_pack" });
      return;
    }

    if (/^(www\.)?youtube\.com$/.test(url.hostname) && url.pathname === "/watch") {
      sendEvent("video_watch_click", link, { video_id: url.searchParams.get("v") || "unknown" });
      return;
    }

    if (url.origin === window.location.origin && /^\/books\/(beale-treasure|mask-of-a-faun)\/?$/.test(url.pathname)) {
      sendEvent("published_book_interest", link, { book_path: url.pathname });
      return;
    }

    if (url.origin === window.location.origin && /^\/(books|series)\/?$/.test(url.pathname)) {
      sendEvent("series_interest", link, { destination_path: url.pathname });
    }
  });
})();
