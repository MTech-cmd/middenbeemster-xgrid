<template>
  <section class="hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-badge">
        <span>UNESCO WERELDERFGOED · BEEMSTER POLDER</span>
      </div>

      <h1 class="hero-title">
        Ontdek <span class="hero-title-accent">Midden-Beemster</span>
      </h1>

      <p class="hero-subtitle">
        Loop door eeuwenoude straten, verken historische gebouwen en beleef de rijke geschiedenis van het Beemster polder via onze interactieve 3D scan ervaring.
      </p>

      <div class="hero-ctas">
        <a href="#ontdekken" class="hero-btn hero-btn-secondary">Meer Ontdekken ↓</a>
        <a href="#tour" class="hero-btn hero-btn-primary">Start 3D Tour →</a>
      </div>

      <div class="hero-stats">
        <div class="hero-stat">
          <span class="stat-value">1612</span>
          <span class="stat-label">JAAR DROOGGELEGD</span>
        </div>
        <div class="hero-stat">
          <span class="stat-value">35 km²</span>
          <span class="stat-label">OPPERVLAKTE</span>
        </div>
        <div class="hero-stat">
          <span class="stat-value">1999</span>
          <span class="stat-label">UNESCO STATUS</span>
        </div>
      </div>
    </div>

    <div class="hero-scroll-indicator">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  background-image: url('https://assets.plaece.nl/odp-lho/image/foto-beleef-de-beemster-op-32-meter-hoogte-2_190489473.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 20, 10, 0.55) 0%,
    rgba(10, 20, 10, 0.5) 60%,
    rgba(10, 20, 10, 0.7) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  padding-top: 60px;
}

.hero-badge {
  display: inline-block;
  background-color: rgba(201, 165, 90, 0.25);
  border: 1px solid rgba(201, 165, 90, 0.5);
  color: #e8c97a;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  margin-bottom: 1.4rem;
  font-family: 'Inter', sans-serif;
}

.hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 700;
  color: white;
  line-height: 1.1;
  max-width: 650px;
  margin-bottom: 1.4rem;
}

.hero-title-accent {
  color: #c9a55a;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.65;
  max-width: 520px;
  margin-bottom: 2rem;
  font-family: 'Inter', sans-serif;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.hero-btn {
  text-decoration: none;
  padding: 0.7rem 1.4rem;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s;
}

.hero-btn-secondary {
  background-color: rgba(201, 165, 90, 0.2);
  color: #e8c97a;
  border: 1px solid rgba(201, 165, 90, 0.5);
}

.hero-btn-secondary:hover {
  background-color: rgba(201, 165, 90, 0.35);
}

.hero-btn-primary {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-btn-primary:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.hero-stats {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.55);
  font-family: 'Inter', sans-serif;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;
  opacity: 0.7;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}
</style>
