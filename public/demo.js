/* =========================================================
   Hero demo — animated inline suggestions
   Cycles through a set of "marks" on a jurídico paragraph,
   opening a popover with from → to + apply button.
   ========================================================= */

(function () {
  const body = document.getElementById('demo-body');
  if (!body) return;

  // Build the paragraph with marks
  // Each mark has: id, kind (arcaismo|tech|rodeo|numero|pasiva|nomin), text, from, to, label
  const paragraph = [
    { m: "m1", kind: "rodeo", text: "Vengo por el presente", from: "Vengo por el presente", to: "Vengo", label: "Rodeo innecesario" },
    { t: " a " },
    { m: "m2", kind: "nomin", text: "efectuar la interposición", from: "efectuar la interposición", to: "interponer", label: "Nominalización" },
    { t: " del recurso contra la resolución del " },
    { m: "m3", kind: "num", text: "veintidós", from: "veintidós", to: "22", label: "Números" },
    { t: " de marzo, " },
    { m: "m4", kind: "arc", text: "habida cuenta que", from: "habida cuenta que", to: "porque", label: "Arcaísmo innecesario" },
    { t: " " },
    { m: "m5", kind: "pasiva", text: "fue dictada", from: "fue dictada", to: "la dictó", label: "Voz pasiva" },
    { t: " sin considerar la prueba que acompañó " },
    { m: "m6", kind: "tech", text: "el actor", from: "el actor", to: "quien demanda", label: "Tecnicismo" },
    { t: ", estimando esta parte " },
    { m: "m7", kind: "queismo", text: "de que", from: "de que", to: "que", label: "Dequeísmo" },
    { t: " resulta " },
    { m: "m8", kind: "vaguedad", text: "manifiestamente", from: "manifiestamente", to: "(precisar el fundamento)", label: "Vaguedad" },
    { t: " improcedente." },
  ];

  const COLOR_BY_KIND = {
    arc:      "var(--accent)",
    tech:     "var(--blue)",
    rodeo:    "oklch(0.55 0.12 300)",
    pasiva:   "var(--ochre)",
    num:      "var(--green)",
    nomin:    "oklch(0.55 0.12 25)",
    queismo:  "oklch(0.55 0.12 180)",
    vaguedad: "oklch(0.6 0.14 90)",
  };

  // Render
  const p = document.createElement('p');
  paragraph.forEach(seg => {
    if (seg.t) {
      p.appendChild(document.createTextNode(seg.t));
    } else {
      const span = document.createElement('span');
      span.className = 'mark';
      span.dataset.id = seg.m;
      span.dataset.kind = seg.kind;
      span.dataset.from = seg.from;
      span.dataset.to = seg.to;
      span.dataset.label = seg.label;
      span.style.textDecorationColor = COLOR_BY_KIND[seg.kind] || 'var(--accent)';
      span.textContent = seg.text;
      p.appendChild(span);
    }
  });
  body.appendChild(p);

  // Count badge
  const count = document.createElement('div');
  count.className = 'demo-count';
  const n = paragraph.filter(s => s.m).length;
  count.innerHTML = `<span class="badge">${n}</span> sugerencias`;
  body.appendChild(count);

  // Popover management
  let currentPop = null;
  let currentMark = null;
  let cycleTimer = null;
  let userInteracted = false;

  function closePop() {
    if (currentPop) { currentPop.remove(); currentPop = null; }
    if (currentMark) { currentMark.classList.remove('active'); currentMark = null; }
  }

  function openPop(mark, opts = {}) {
    closePop();
    const rect = mark.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();

    const pop = document.createElement('div');
    pop.className = 'popover';
    const color = COLOR_BY_KIND[mark.dataset.kind] || 'var(--accent)';
    const isPlaceholder = mark.dataset.kind === 'vaguedad';
    pop.innerHTML = `
      <div class="pop-kind" style="color:${color}"><span class="dot"></span>${mark.dataset.label}</div>
      <div class="pop-from">${mark.dataset.from}</div>
      <div class="pop-arrow">↓ sugerencia</div>
      <div class="pop-to">${mark.dataset.to}</div>
      ${isPlaceholder ? '' : '<button class="pop-apply">Aplicar cambio</button>'}
    `;

    // position
    const top = rect.bottom - bodyRect.top + 8;
    let left = rect.left - bodyRect.left;
    const maxLeft = body.clientWidth - 270;
    if (left > maxLeft) left = maxLeft;
    if (left < 10) left = 10;
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';

    body.appendChild(pop);
    mark.classList.add('active');

    currentPop = pop;
    currentMark = mark;

    const applyButton = pop.querySelector('.pop-apply');
    if (applyButton) {
      applyButton.addEventListener('click', (e) => {
        e.stopPropagation();
        applyMark(mark);
      });
    }
  }

  function applyMark(mark) {
    // replace mark with plain text of the "to" value
    const tn = document.createTextNode(mark.dataset.to);
    mark.replaceWith(tn);
    closePop();
    updateCount();
  }

  function updateCount() {
    const remaining = body.querySelectorAll('.mark').length;
    if (remaining === 0) {
      count.innerHTML = `<span class="badge" style="background:var(--green)">✓</span> texto limpio`;
    } else {
      count.innerHTML = `<span class="badge">${remaining}</span> sugerencias`;
    }
  }

  // Manual click interactions
  body.addEventListener('click', (e) => {
    const mark = e.target.closest('.mark');
    if (mark) {
      userInteracted = true;
      if (cycleTimer) { clearInterval(cycleTimer); cycleTimer = null; }
      openPop(mark);
      e.stopPropagation();
    } else if (!e.target.closest('.popover')) {
      closePop();
    }
  });

  // Auto-cycle demo
  let cycleIdx = 0;
  function tick() {
    if (userInteracted) return;
    const marks = body.querySelectorAll('.mark');
    if (marks.length === 0) return;
    const mark = marks[cycleIdx % marks.length];
    cycleIdx++;
    if (mark) openPop(mark);
  }

  // Start cycle after a short entry delay
  setTimeout(() => {
    tick();
    cycleTimer = setInterval(tick, 2600);
  }, 900);

  // If visibility changes or user scrolls far away, re-position
  window.addEventListener('resize', () => {
    if (currentMark) openPop(currentMark);
  });
})();
