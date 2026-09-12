(function () {
    const snippets = [
        `function render(state) {
  const { nodes, edges } = state;
  return nodes.map(n => (
    draw(n, edges[n.id])
  ));
}`,
        `class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  add(v) {
    return new Vector3(
      this.x + v.x,
      this.y + v.y,
      this.z + v.z
    );
  }
}`,
        `const cache = new Map();

async function fetchData(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  const res = await fetch(url);
  const data = await res.json();
  cache.set(url, data);
  return data;
}`,
        `def normalize(vec):
    length = sum(v ** 2 for v in vec) ** 0.5
    if length == 0:
        return vec
    return [v / length for v in vec]

for p in particles:
    p.dir = normalize(p.dir)`,
        `export const useTimer = (ms) => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setTick(t => t + 1),
      ms
    );
    return () => clearInterval(id);
  }, [ms]);
  return tick;
};`,
        `SELECT u.id, u.name,
       COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o
  ON o.user_id = u.id
GROUP BY u.id
ORDER BY orders DESC
LIMIT 20;`,
        `public class Vector3 {
  double x, y, z;
  Vector3(double x, double y, double z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}`,
        `@keyframes float {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-12px); }
  100% { transform: translateY(0); }
}
.card {
  animation: float 4s ease-in-out infinite;
}`,
    ];

    function highlight(code) {
        return code
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/(#.*|\/\/.*)/g, '<span class="cb-cm">$1</span>')
            .replace(/(&#39;.*?&#39;|"[^"]*"|`[^`]*`)/g, '<span class="cb-st">$1</span>')
            .replace(/\b(function|const|let|var|return|if|else|for|while|class|constructor|new|async|await|export|import|from|def|public|double|throw|useEffect|useState|SELECT|FROM|WHERE|GROUP BY|ORDER BY|LIMIT|LEFT JOIN|ON|AS)\b/g,
                '<span class="cb-kw">$1</span>')
            .replace(/\b(\d+\.?\d*)\b/g, '<span class="cb-nu">$1</span>')
            .replace(/([a-zA-Z_]\w*)(?=\()/g, '<span class="cb-fn">$1</span>');
    }

    function buildCodeBackground(containerId, options) {
        const opts = Object.assign({ columns: 9 }, options || {});
        const host = document.getElementById(containerId);
        if (!host) return;

        const stage = document.createElement('div');
        stage.className = 'cb-stage';

        const tunnel = document.createElement('div');
        tunnel.className = 'cb-tunnel';
        stage.appendChild(tunnel);

        const scan = document.createElement('div');
        scan.className = 'cb-scan';
        stage.appendChild(scan);

        const vig = document.createElement('div');
        vig.className = 'cb-vignette';
        stage.appendChild(vig);

        const COLS = opts.columns;
        for (let i = 0; i < COLS; i++) {
            const col = document.createElement('div');
            col.className = 'cb-col';

            const center = (COLS - 1) / 2;
            const dist = Math.abs(i - center);
            const dir = i < center ? -1 : (i > center ? 1 : 0);

            const rotY = dir * (10 + dist * 6);
            const z = -dist * 90;
            const scale = 1 - dist * 0.06;
            const opacity = Math.max(0.28, 1 - dist * 0.22);
            const blur = dist * 0.6;

            col.style.transform = `rotateY(${rotY}deg) translateZ(${z}px) scale(${scale})`;
            col.style.setProperty('--cb-op', opacity);
            col.style.setProperty('--cb-bl', blur + 'px');

            const track = document.createElement('div');
            track.className = 'cb-track';

            const dur = 22 + Math.random() * 14;
            const del = -Math.random() * dur;
            track.style.setProperty('--cb-dur', dur.toFixed(1) + 's');
            track.style.setProperty('--cb-del', del.toFixed(1) + 's');

            let block = '';
            const shuffled = [...snippets].sort(() => Math.random() - 0.5);
            for (let r = 0; r < 2; r++) {
                shuffled.forEach(s => { block += s + '\n\n'; });
            }

            const pre = document.createElement('code');
            pre.innerHTML = highlight(block);
            track.appendChild(pre);
            track.appendChild(pre.cloneNode(true));

            col.appendChild(track);
            tunnel.appendChild(col);
        }

        host.appendChild(stage);
    }

    window.buildCodeBackground = buildCodeBackground;
})();