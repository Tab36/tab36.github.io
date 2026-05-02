// ─────────────────────────────────────────────────────────────
//  TAB36 — main.js
//  Rendering and interaction logic.
//  You should never need to edit this file.
//  To add/edit projects, edit projects.js instead.
// ─────────────────────────────────────────────────────────────

(function () {
    const grid       = document.getElementById("grid");
    const overlay    = document.getElementById("view-overlay");
    const popup      = document.getElementById("popup");
    const pThumb     = document.getElementById("p-thumb");
    const pTitle     = document.getElementById("p-title");
    const pTag       = document.getElementById("p-tag");
    const pDesc      = document.getElementById("p-desc");
    const pActionBtn = document.getElementById("p-action-btn");
    const closeBtn   = document.getElementById("close-btn");

    // ── Build cards from PROJECTS array ──────────────────────────
    function renderGrid() {
        PROJECTS.forEach(function (project, index) {
            const card = document.createElement("div");
            card.className = "card";
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");
            card.setAttribute("aria-label", "Open " + project.title);

            card.innerHTML =
                '<div class="card-thumb">' +
                    '<img src="' + project.thumb + '" alt="' + project.title + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';" />' +
                    '<div class="emoji-fallback" style="display:none;">' + project.emoji + '</div>' +
                '</div>' +
                '<div class="card-content">' +
                    '<div>' +
                        '<div class="card-title">' + project.title + '</div>' +
                        '<div class="card-tag">'   + project.tag   + '</div>' +
                    '</div>' +
                    '<div class="card-desc">' + project.shortDesc + '</div>' +
                '</div>';

            card.addEventListener("click", function () { openPopup(index); });
            card.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") openPopup(index);
            });

            grid.appendChild(card);
        });
    }

    // ── Open popup ────────────────────────────────────────────────
    function openPopup(index) {
        const p = PROJECTS[index];

        pThumb.innerHTML =
            '<img src="' + p.thumb + '" alt="' + p.title + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';" />' +
            '<div class="emoji-fallback" style="display:none;">' + p.emoji + '</div>';

        pTitle.textContent = p.title;
        pTag.textContent   = p.tag;

        pDesc.innerHTML = p.fullDesc
            .split("\n\n")
            .map(function (para) { return "<p>" + para + "</p>"; })
            .join("");

        if (p.hasLink) {
            pActionBtn.textContent = "View project \u2197";
        } else {
            pActionBtn.textContent = "Download \u2193";
        }
        pActionBtn.onclick = function () { window.open(p.url, "_blank"); };

        popup.querySelector(".popup-content").scrollTop = 0;

        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    // ── Close popup ───────────────────────────────────────────────
    function closePopup() {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closePopup);

    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closePopup();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closePopup();
    });

    // ── Init ──────────────────────────────────────────────────────
    renderGrid();
})();