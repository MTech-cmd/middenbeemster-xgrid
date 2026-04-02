<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
          </svg>
        </div>
        <div>
          <p class="footer-brand-name">Midden-Beemster</p>
          <p class="footer-brand-sub">Digitaal Erfgoed Project</p>
        </div>
      </div>

      <div class="footer-center">
        <p class="footer-meta">UNESCO Werelderfgoed · Beemster Polder, Noord-Holland</p>
        <p class="footer-copy">© 2024 Midden-Beemster 3D Scan Project. Alle rechten voorbehouden.</p>
      </div>

      <div class="footer-links">
        <a href="#" class="footer-link">Over ons</a>
        <a href="#" class="footer-link">Contact</a>
        <a href="#" class="footer-link">Privacy</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #009A47;
  padding: 2rem 1.25rem;
}

/* Mobile-first: gestapeld gecentreerd */
.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-logo {
  width: 36px;
  height: 36px;
  background-color: #c9a55a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.footer-brand-name {
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.footer-brand-sub {
  color: rgba(255,255,255,0.45);
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
}

.footer-center {
  text-align: center;
}

.footer-meta {
  color: rgba(255,255,255,0.5);
  font-size: 0.78rem;
  font-family: 'Inter', sans-serif;
  margin-bottom: 0.2rem;
}

.footer-copy {
  color: rgba(255,255,255,0.35);
  font-size: 0.74rem;
  font-family: 'Inter', sans-serif;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  font-size: 0.82rem;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s;
}

.footer-link:hover {
  color: white;
}

/* Desktop */
@media (min-width: 700px) {
  .footer {
    padding: 2rem;
  }

  .footer-inner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    gap: 2rem;
  }
}
</style>
