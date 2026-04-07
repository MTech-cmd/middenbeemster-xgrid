<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="landing">
    <!-- Background -->
    <div class="bg-layer"></div>

    <div class="landing-inner">
      <!-- Header -->
      <header class="landing-header">
        <div class="header-badge">DIGITAAL ERFGOED PROJECT</div>
        <h1 class="landing-title">
          Midden-<span class="gold">Beemster</span>
        </h1>
        <p class="landing-sub">Kies een design om te bekijken</p>
      </header>

      <!-- Cards -->
      <div class="cards-grid">
        <!-- Design 1 -->
        <RouterLink to="/design1" class="design-card">
          <div class="card-number">01</div>
          <div class="card-thumb design1-thumb">
            <div class="thumb-overlay">
              <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <div class="thumb-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div class="card-body">
            <span class="card-label">Design</span>
            <h2 class="card-title">Versie 1</h2>
            <p class="card-desc">
              Donker, erfgoed-gedreven design met gouden accenten en een meeslepende 3D-beleving van Midden-Beemster.
            </p>
            <div class="card-cta">
              Bekijken
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </div>
        </RouterLink>

        <!-- Design 2 — externe link, pas URL aan -->
        <a
          href="https://mtech-cmd.github.io/middenbeemster-xgrid/design2/"
          target="_blank"
          rel="noopener"
          class="design-card design-card--alt"
        >
          <div class="card-number">02</div>
          <div class="card-thumb design2-thumb">
            <div class="thumb-overlay">
              <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <div class="thumb-shapes">
              <span></span><span></span>
            </div>
          </div>
          <div class="card-body">
            <span class="card-label">Design</span>
            <h2 class="card-title">Versie 2</h2>
            <p class="card-desc">
              Een alternatieve visuele interpretatie van het Midden-Beemster erfgoed project met een eigen stijl.
            </p>
            <div class="card-cta">
              Bekijken
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </div>
        </a>
      </div>

      <!-- Footer -->
      <footer class="landing-footer">
        <p>Midden-Beemster &mdash; Digitaal Erfgoed &copy; 2026</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111a11;
  overflow: hidden;
}

/* Subtle radial glow background */
.bg-layer {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 50% at 20% 30%, rgba(201, 165, 90, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 60% at 80% 70%, rgba(36, 53, 36, 0.6) 0%, transparent 70%),
    #111a11;
  pointer-events: none;
}

.landing-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
}

/* Header */
.landing-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: #c9a55a;
  border: 1px solid rgba(201, 165, 90, 0.35);
  border-radius: 999px;
  padding: 0.3rem 1rem;
  background: rgba(201, 165, 90, 0.07);
}

.landing-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.6rem, 6vw, 4.5rem);
  font-weight: 700;
  color: #f4efe6;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.gold {
  color: #c9a55a;
}

.landing-sub {
  font-size: 1rem;
  color: rgba(244, 239, 230, 0.5);
  font-weight: 400;
  letter-spacing: 0.03em;
}

/* Cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
}

@media (max-width: 680px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

/* Card */
.design-card {
  display: flex;
  flex-direction: column;
  background: rgba(36, 53, 36, 0.4);
  border: 1px solid rgba(201, 165, 90, 0.18);
  border-radius: 1.25rem;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
}

.design-card:hover {
  transform: translateY(-6px);
  border-color: rgba(201, 165, 90, 0.5);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(201, 165, 90, 0.1);
}

.design-card--alt {
  background: rgba(20, 30, 45, 0.4);
  border-color: rgba(130, 170, 220, 0.18);
}

.design-card--alt:hover {
  border-color: rgba(130, 170, 220, 0.5);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(130, 170, 220, 0.1);
}

/* Card number */
.card-number {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 3rem;
  font-weight: 700;
  color: rgba(201, 165, 90, 0.12);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.design-card--alt .card-number {
  color: rgba(130, 170, 220, 0.12);
}

/* Thumbnail */
.card-thumb {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.design1-thumb {
  background: linear-gradient(135deg, #1c2b1c 0%, #243524 50%, #2d4d2d 100%);
}

.design2-thumb {
  background: linear-gradient(135deg, #14202d 0%, #1e3050 50%, #243a5e 100%);
}

.thumb-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  transition: background 0.3s;
}

.design-card:hover .thumb-overlay {
  background: rgba(0, 0, 0, 0.05);
}

.play-icon {
  width: 48px;
  height: 48px;
  color: #c9a55a;
  opacity: 0.7;
  filter: drop-shadow(0 0 12px rgba(201, 165, 90, 0.5));
  transition: opacity 0.3s, transform 0.3s;
}

.design-card--alt .play-icon {
  color: #82aadc;
  filter: drop-shadow(0 0 12px rgba(130, 170, 220, 0.5));
}

.design-card:hover .play-icon {
  opacity: 1;
  transform: scale(1.12);
}

/* Decorative shapes in thumbnail */
.thumb-dots {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.4rem;
}

.thumb-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(201, 165, 90, 0.5);
}

.thumb-dots span:nth-child(2) {
  background: rgba(201, 165, 90, 0.3);
}

.thumb-dots span:nth-child(3) {
  background: rgba(201, 165, 90, 0.15);
}

.thumb-shapes {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
}

.thumb-shapes span {
  width: 20px;
  border-radius: 2px 2px 0 0;
  background: rgba(130, 170, 220, 0.4);
}

.thumb-shapes span:first-child {
  height: 24px;
}

.thumb-shapes span:last-child {
  height: 16px;
  background: rgba(130, 170, 220, 0.25);
}

/* Card body */
.card-body {
  padding: 1.5rem 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.card-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #c9a55a;
  text-transform: uppercase;
}

.design-card--alt .card-label {
  color: #82aadc;
}

.card-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #f4efe6;
  line-height: 1.2;
}

.card-desc {
  font-size: 0.875rem;
  color: rgba(244, 239, 230, 0.55);
  line-height: 1.65;
  margin-top: 0.25rem;
  flex: 1;
}

.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #c9a55a;
  letter-spacing: 0.04em;
  transition: gap 0.25s ease;
}

.design-card--alt .card-cta {
  color: #82aadc;
}

.card-cta svg {
  width: 16px;
  height: 16px;
  transition: transform 0.25s ease;
}

.design-card:hover .card-cta {
  gap: 0.75rem;
}

.design-card:hover .card-cta svg {
  transform: translateX(4px);
}

/* Footer */
.landing-footer {
  text-align: center;
  color: rgba(244, 239, 230, 0.25);
  font-size: 0.8rem;
  letter-spacing: 0.05em;
}
</style>
