const ActivitySharing = {
  createControls(name) {
    const activityUrl = new URL(window.location.pathname, window.location.origin);
    activityUrl.searchParams.set("activity", name);
    const text = `Check out ${name} at Mergington High School!`;

    const controls = document.createElement("div");
    controls.className = "activity-sharing";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", `Share ${name}`);

    const label = document.createElement("span");
    label.textContent = "Share:";
    controls.appendChild(label);

    const services = [
      ["Facebook", "https://www.facebook.com/sharer/sharer.php", { u: activityUrl.href }],
      ["WhatsApp", "https://wa.me/", { text: `${text} ${activityUrl.href}` }],
      ["X", "https://twitter.com/intent/tweet", { text, url: activityUrl.href }],
    ];

    services.forEach(([service, endpoint, parameters]) => {
      const shareUrl = new URL(endpoint);
      shareUrl.search = new URLSearchParams(parameters).toString();
      const link = document.createElement("a");
      link.href = shareUrl.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = service;
      link.setAttribute("aria-label", `Share ${name} on ${service} (opens in a new tab)`);
      controls.appendChild(link);
    });

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.textContent = "Copy link";
    copyButton.setAttribute("aria-label", `Copy link to ${name}`);
    controls.appendChild(copyButton);

    const status = document.createElement("span");
    status.className = "share-status";
    status.setAttribute("role", "status");
    controls.appendChild(status);

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(activityUrl.href);
        status.textContent = "Link copied!";
      } catch (error) {
        status.textContent = "Copy this activity link:";
        const fallback = document.createElement("input");
        fallback.type = "text";
        fallback.readOnly = true;
        fallback.value = activityUrl.href;
        fallback.setAttribute("aria-label", `Link to ${name}`);
        status.appendChild(fallback);
        fallback.focus();
        fallback.select();
      }
    });

    return controls;
  },
};
