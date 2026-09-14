(function(){
  const root = document.getElementById('root');
  const c = document.createElement('div');
  c.className = 'container';
  c.innerHTML = '<h1>Kinetix Labs</h1><p>This is a minimal static build of the site. The full app requires a frontend build.</p><p style="margin-top:12px;color:#94a3b8;font-size:13px">To restore the full app, build in artifacts/kinetix-labs and copy dist/ to the repo root.</p>';
  root.appendChild(c);
})();
