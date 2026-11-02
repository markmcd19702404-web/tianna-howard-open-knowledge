(function () {
  "use strict";

  function sendEvent(name, link, details) {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", name, Object.assign({
      link_url: link.href,
      link_text: (link.textContent || "").trim().slice(0, 100),
      page_path: window.location.pathname,
      transport_type: "beacon"
    }, details || {}));
  }

  function currentBook() {
    var match = window.location.pathname.match(/^\/books\/(beale-treasure|mask-of-a-faun)\/?$/);
    return match ? match[1] : "unknown";
  }

  function retailerFormat(link) {
    var edition = link.closest("article");
    var heading = edition && edition.querySelector("h3");
    var label = ((heading && heading.textContent) || link.textContent || "").toLowerCase();
    if (label.indexOf("paperback") !== -1) return "paperback";
    if (label.indexOf("hardcover") !== -1) return "hardcover";
    if (label.indexOf("kindle") !== -1 || label.indexOf("ebook") !== -1) return "ebook";
    // The separately listed independent retailers currently sell paperbacks.
    if (link.closest("#other-retailers")) return "paperback";
    return "unknown";
  }

  function retailerName(hostname) {
    switch (hostname.toLowerCase().replace(/^www\./, "")) {
      case "amazon.com": return "amazon_us";
      case "amazon.co.uk": return "amazon_uk";
      case "walmart.com": return "walmart";
      case "waterstones.com": return "waterstones";
      case "foyles.co.uk": return "foyles";
      case "hatchards.co.uk": return "hatchards";
      case "bookshop.org": return "bookshop_org";
      default: return null;
    }
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

    var retailer = retailerName(url.hostname);
    if (retailer) {
      var details = {
        retailer: retailer,
        book_id: currentBook(),
        book_format: retailerFormat(link)
      };
      var amazonMatch = url.pathname.match(/\/dp\/([A-Z0-9]{10})/i);
      if (retailer.indexOf("amazon_") === 0) {
        // Avoid counting a generic Amazon homepage link as a product click.
        if (!amazonMatch) return;
        details.product_id = amazonMatch[1].toUpperCase();
      }
      sendEvent("retailer_click", link, details);
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
