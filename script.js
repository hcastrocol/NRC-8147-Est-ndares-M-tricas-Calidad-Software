// Interacción del mapa mental: colapsar / expandir ramas y dibujar conectores
(function () {
  const branches = document.querySelectorAll('[data-branch]');
  branches.forEach((branch) => {
    const head = branch.querySelector('.branch__head');
    head.addEventListener('click', () => {
      branch.classList.toggle('is-collapsed');
      const expanded = !branch.classList.contains('is-collapsed');
      head.setAttribute('aria-expanded', String(expanded));
      requestAnimationFrame(drawConnectors);
    });
  });

  // Dibujo de líneas curvas entre el nodo raíz y cada rama
  const svg = document.querySelector('.connectors');
  const root = document.querySelector('.node--root');
  const mapa = document.querySelector('.mapa');

  const colors = ['var(--b1)', 'var(--b2)', 'var(--b3)', 'var(--b4)', 'var(--b5)'];

  function drawConnectors() {
    if (!svg || !root || !mapa) return;
    const mapaRect = mapa.getBoundingClientRect();
    svg.setAttribute('width', mapaRect.width);
    svg.setAttribute('height', mapaRect.height);
    svg.innerHTML = '';

    const rootRect = root.getBoundingClientRect();
    const rx = rootRect.left + rootRect.width / 2 - mapaRect.left;
    const ry = rootRect.bottom - mapaRect.top;

    branches.forEach((branch, i) => {
      const r = branch.getBoundingClientRect();
      const bx = r.left + r.width / 2 - mapaRect.left;
      const by = r.top - mapaRect.top;

      const midY = (ry + by) / 2;
      const d = `M ${rx} ${ry} C ${rx} ${midY}, ${bx} ${midY}, ${bx} ${by}`;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', colors[i % colors.length]);
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('opacity', '0.55');
      svg.appendChild(path);
    });
  }

  window.addEventListener('load', drawConnectors);
  window.addEventListener('resize', drawConnectors);
  // Redibujar tras transiciones
  setTimeout(drawConnectors, 400);
})();
