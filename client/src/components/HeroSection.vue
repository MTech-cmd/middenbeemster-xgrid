<template>
  <section class="hero" @click="startExperience">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-left">
        <span class="hero-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
          BEGIN DE ERVARING
        </span>

        <h1 class="hero-title">Begin de <span class="hero-title-accent">3D Ervaring</span></h1>

        <p class="hero-subtitle">
          Stap direct in de interactieve 3D scan van Midden-Beemster. Geen download vereist — speel direct in je browser.
        </p>

        <div class="hero-tags">
          <span class="hero-tag">360° Rondlopen</span>
          <span class="hero-tag">Tijdreizen</span>
          <span class="hero-tag">Object interacties</span>
          <span class="hero-tag">Gratis toegang</span>
        </div>

        <a href="#ontdekken" class="hero-meer-btn" @click.stop>Meer Ontdekken ↓</a>
      </div>

      <div class="hero-right">
        <div class="hero-play-ring">
          <div class="hero-play-btn">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
        <p class="hero-play-label">Klik om te starten</p>
      </div>
    </div>

    <div class="hero-scroll-indicator">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
function startExperience() {
  alert('De 3D ervaring wordt geladen...')
}
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  background-image: url('/unity.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(10, 20, 10, 0.88) 0%,
    rgba(10, 20, 10, 0.72) 55%,
    rgba(10, 20, 10, 0.52) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 4rem;
  width: 100%;
  padding-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.hero-left {
  flex: 1;
  max-width: 680px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background-color: rgba(201, 165, 90, 0.15);
  border: 1px solid rgba(201, 165, 90, 0.35);
  color: #c9a55a;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  font-family: 'Inter', sans-serif;
  margin-bottom: 1.6rem;
}

.hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin-bottom: 1.4rem;
}

.hero-title-accent {
  color: #c9a55a;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.05rem;
  line-height: 1.65;
  max-width: 560px;
  margin-bottom: 1.8rem;
  font-family: 'Inter', sans-serif;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-bottom: 2.2rem;
}

.hero-tag {
  background-color: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.65);
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-family: 'Inter', sans-serif;
}

.hero-meer-btn {
  display: inline-block;
  text-decoration: none;
  background-color: rgba(201, 165, 90, 0.18);
  color: #e8c97a;
  border: 1px solid rgba(201, 165, 90, 0.45);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s;
}

.hero-meer-btn:hover {
  background-color: rgba(201, 165, 90, 0.32);
}

.hero-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.hero-play-ring {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 2px solid rgba(201, 165, 90, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ring-pulse 3s ease-in-out infinite;
  transition: transform 0.2s;
}

.hero:hover .hero-play-ring {
  transform: scale(1.04);
}

@keyframes ring-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 165, 90, 0.25); }
  50% { box-shadow: 0 0 0 18px rgba(201, 165, 90, 0); }
}

.hero-play-btn {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #c9a55a;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, transform 0.2s;
  padding-left: 6px;
}

.hero:hover .hero-play-btn {
  background-color: #b8923f;
  transform: scale(1.06);
}

.hero-play-label {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.06em;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;
  opacity: 0.6;
  pointer-events: none;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 2rem;
    padding-top: 80px;
    gap: 2.5rem;
  }
  .hero-right {
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;
  }
  .hero-play-ring {
    width: 90px;
    height: 90px;
  }
  .hero-play-btn {
    width: 70px;
    height: 70px;
  }
}
</style>
