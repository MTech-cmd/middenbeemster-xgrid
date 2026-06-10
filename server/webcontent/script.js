document.getElementById("loadIframeBtn").addEventListener("click", () => {

    const container = document.getElementById("iframeContainer");

    if (container.querySelector("iframe")) {
        return;
    }

    container.innerHTML = "";

    const iframe = document.createElement("iframe");

    iframe.setAttribute("allow", "cross-origin-isolated");
    iframe.src = "webcontent/index.html";
    iframe.title = "description";
    iframe.width = "1200";
    iframe.height = "720";

    container.appendChild(iframe);
});