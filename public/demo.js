/* =========================================================
   Demo — animated inline suggestions
   Exposes window.LenguajeClaroDemo.init({ body, segments, autoCycle, openOnHover })
   and keeps the home hero demo auto-initialized.
   ========================================================= */

(function () {
  const COLOR_BY_KIND = {
    arc: "var(--accent)",
    tech: "var(--blue)",
    rodeo: "oklch(0.55 0.12 300)",
    pasiva: "var(--ochre)",
    num: "var(--green)",
    nomin: "oklch(0.55 0.12 25)",
    queismo: "oklch(0.55 0.12 180)",
    vaguedad: "oklch(0.6 0.14 90)",
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getSuggestions(mark) {
    try {
      const suggestions = JSON.parse(mark.dataset.suggestions || "[]");
      return Array.isArray(suggestions) ? suggestions : [];
    } catch (error) {
      return [];
    }
  }

  function isApplicable(segment) {
    if (segment.applicable === false) return false;
    return segment.kind !== "vaguedad";
  }

  function getColor(segment) {
    return segment.color || COLOR_BY_KIND[segment.kind] || "var(--accent)";
  }

  function normalizeSegment(segment, index) {
    if (segment.t) return segment;

    const suggestions =
      Array.isArray(segment.suggestions) && segment.suggestions.length > 0
        ? segment.suggestions
        : [segment.to].filter(Boolean);

    return {
      ...segment,
      m: segment.m || `m${index + 1}`,
      from: segment.from || segment.text,
      to: segment.to || suggestions[0] || "",
      label: segment.label || "Sugerencia",
      suggestions,
      applicable: isApplicable(segment),
      color: getColor(segment),
    };
  }

  function renderSegments(body, segments) {
    const p = document.createElement("p");

    segments.forEach((segment) => {
      if (segment.t) {
        p.appendChild(document.createTextNode(segment.t));
        return;
      }

      const span = document.createElement("span");
      span.className = "mark";
      span.dataset.id = segment.m;
      span.dataset.kind = segment.kind || "";
      span.dataset.from = segment.from;
      span.dataset.to = segment.to;
      span.dataset.label = segment.label;
      span.dataset.applicable = String(segment.applicable);
      span.dataset.suggestions = JSON.stringify(segment.suggestions);
      span.dataset.description = segment.description || "";
      span.dataset.color = segment.color;
      span.style.textDecorationColor = segment.color;
      span.textContent = segment.text;
      p.appendChild(span);
    });

    body.appendChild(p);
  }

  function init({ body, segments, autoCycle = true, openOnHover = false }) {
    if (!body || !Array.isArray(segments) || body.dataset.demoReady === "true") {
      return null;
    }

    const normalizedSegments = segments.map(normalizeSegment);
    body.dataset.demoReady = "true";
    body.textContent = "";
    renderSegments(body, normalizedSegments);

    const count = document.createElement("div");
    count.className = "demo-count";
    body.appendChild(count);

    let currentPop = null;
    let currentMark = null;
    let cycleTimer = null;
    let closeTimer = null;
    let userInteracted = false;

    function stopCycle() {
      userInteracted = true;

      if (cycleTimer) {
        clearInterval(cycleTimer);
        cycleTimer = null;
      }
    }

    function updateCount() {
      const remaining = body.querySelectorAll(".mark").length;

      if (remaining === 0) {
        count.innerHTML =
          '<span class="badge" style="background:var(--green)">✓</span> texto limpio';
        return;
      }

      count.innerHTML = `<span class="badge">${remaining}</span> sugerencias`;
    }

    function clearCloseTimer() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    }

    function closePop() {
      clearCloseTimer();

      if (currentPop) {
        currentPop.remove();
        currentPop = null;
      }

      if (currentMark) {
        currentMark.classList.remove("active");
        currentMark = null;
      }
    }

    function scheduleClosePop() {
      clearCloseTimer();
      closeTimer = setTimeout(() => {
        closeTimer = null;
        closePop();
      }, 300);
    }

    function positionPop(pop, mark) {
      const rect = mark.getBoundingClientRect();
      const bodyRect = body.getBoundingClientRect();
      const top = rect.bottom - bodyRect.top + 8;
      const popWidth = pop.offsetWidth || 270;
      let left = rect.left - bodyRect.left;
      const maxLeft = body.clientWidth - popWidth - 10;

      if (left > maxLeft) left = maxLeft;
      if (left < 10) left = 10;

      pop.style.top = `${top}px`;
      pop.style.left = `${left}px`;
    }

    function openPop(mark) {
      clearCloseTimer();

      closePop();

      const suggestions = getSuggestions(mark);
      const color = mark.dataset.color || "var(--accent)";
      const applicable = mark.dataset.applicable === "true";
      const alternatives = suggestions.slice(1);

      const pop = document.createElement("div");
      pop.className = "popover";
      pop.innerHTML = `
        <div class="pop-kind" style="color:${escapeHtml(color)}"><span class="dot"></span>${escapeHtml(mark.dataset.label)}</div>
        <div class="pop-from">${escapeHtml(mark.dataset.from)}</div>
        <div class="pop-arrow">↓ sugerencia</div>
        <div class="pop-to">${escapeHtml(mark.dataset.to)}</div>
        ${
          alternatives.length > 0
            ? `<div class="pop-alternatives"><span>También:</span>${alternatives
                .map((suggestion) => `<button type="button">${escapeHtml(suggestion)}</button>`)
                .join("")}</div>`
            : ""
        }
        ${
          mark.dataset.description
            ? `<div class="pop-description">${escapeHtml(mark.dataset.description)}</div>`
            : ""
        }
        ${applicable ? '<button class="pop-apply">Aplicar cambio</button>' : ""}
      `;

      body.appendChild(pop);
      positionPop(pop, mark);
      mark.classList.add("active");

      currentPop = pop;
      currentMark = mark;

      if (openOnHover) {
        pop.addEventListener("pointerenter", clearCloseTimer);
        pop.addEventListener("pointerleave", scheduleClosePop);
      }

      const applyButton = pop.querySelector(".pop-apply");
      if (applyButton) {
        applyButton.addEventListener("click", (event) => {
          event.stopPropagation();
          applyMark(mark, mark.dataset.to);
        });
      }

      pop.querySelectorAll(".pop-alternatives button").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          if (applicable) {
            applyMark(mark, button.textContent);
          }
        });
      });
    }

    function applyMark(mark, value) {
      mark.replaceWith(document.createTextNode(value || mark.dataset.to));
      closePop();
      updateCount();
    }

    body.addEventListener("click", (event) => {
      const mark = event.target.closest(".mark");

      if (mark && body.contains(mark)) {
        stopCycle();
        openPop(mark);
        event.stopPropagation();
        return;
      }

      if (!event.target.closest(".popover")) {
        closePop();
      }
    });

    if (openOnHover) {
      body.addEventListener("pointerover", (event) => {
        const mark = event.target.closest(".mark");

        if (mark && body.contains(mark)) {
          stopCycle();
          openPop(mark);
          return;
        }

        if (event.target.closest(".popover")) {
          clearCloseTimer();
          return;
        }

        scheduleClosePop();
      });
    }

    let cycleIdx = 0;
    function tick() {
      if (userInteracted) return;

      const marks = body.querySelectorAll(".mark");
      if (marks.length === 0) return;

      const mark = marks[cycleIdx % marks.length];
      cycleIdx += 1;
      if (mark) openPop(mark);
    }

    if (autoCycle) {
      setTimeout(() => {
        tick();
        cycleTimer = setInterval(tick, 2600);
      }, 900);
    }

    window.addEventListener("resize", () => {
      if (currentMark) positionPop(currentPop, currentMark);
    });

    updateCount();

    return {
      close: closePop,
      destroy() {
        if (cycleTimer) clearInterval(cycleTimer);
        clearCloseTimer();
        closePop();
        body.dataset.demoReady = "false";
      },
    };
  }

  window.LenguajeClaroDemo = { init };

  const homeBody = document.getElementById("demo-body");
  if (!homeBody) return;

  const homeSegments = [
    {
      m: "m1",
      kind: "rodeo",
      text: "Vengo por el presente",
      from: "Vengo por el presente",
      to: "Vengo",
      label: "Rodeo innecesario",
    },
    { t: " a " },
    {
      m: "m2",
      kind: "nomin",
      text: "efectuar la interposición",
      from: "efectuar la interposición",
      to: "interponer",
      label: "Nominalización",
    },
    { t: " del recurso contra la resolución del " },
    {
      m: "m3",
      kind: "num",
      text: "veintidós",
      from: "veintidós",
      to: "22",
      label: "Números",
    },
    { t: " de marzo, " },
    {
      m: "m4",
      kind: "arc",
      text: "habida cuenta que",
      from: "habida cuenta que",
      to: "porque",
      label: "Arcaísmo innecesario",
    },
    { t: " " },
    {
      m: "m5",
      kind: "pasiva",
      text: "fue dictada",
      from: "fue dictada",
      to: "la dictó",
      label: "Voz pasiva",
    },
    { t: " sin considerar la prueba que acompañó " },
    {
      m: "m6",
      kind: "tech",
      text: "el actor",
      from: "el actor",
      to: "quien demanda",
      label: "Tecnicismo",
    },
    { t: ", estimando esta parte " },
    {
      m: "m7",
      kind: "queismo",
      text: "de que",
      from: "de que",
      to: "que",
      label: "Dequeísmo",
    },
    { t: " resulta " },
    {
      m: "m8",
      kind: "vaguedad",
      text: "manifiestamente",
      from: "manifiestamente",
      to: "(precisar el fundamento)",
      label: "Vaguedad",
      applicable: false,
    },
    { t: " improcedente." },
  ];

  init({ body: homeBody, segments: homeSegments, autoCycle: true });
})();
