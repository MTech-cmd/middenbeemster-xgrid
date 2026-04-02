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

        <div class="hero-play-center">
          <div class="hero-play-ring">
            <div class="hero-play-btn">
              <svg viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </div>
          <p class="hero-play-label">Klik om te starten</p>
        </div>

        <div class="hero-tags">
          <span class="hero-tag">360° Rondlopen</span>
          <span class="hero-tag">Tijdreizen</span>
          <span class="hero-tag">Object interacties</span>
          <span class="hero-tag">Gratis toegang</span>
        </div>

        <a href="#ontdekken" class="hero-meer-btn" @click.stop>Meer Ontdekken ↓</a>
      </div>

      <!-- Play knop rechts — alleen zichtbaar op desktop -->
      <div class="hero-right">
        <div class="hero-play-ring">
          <div class="hero-play-btn">
            <svg viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
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
  min-height: 580px;
  background-image: url('/unity.png');
  background-size: cover;
  background-position: center top;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  cursor: pointer;
}

/* Mobile: sterk gradient van onder (dark) naar boven (transparant) */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 60, 25, 0.97) 0%,
    rgba(0, 60, 25, 0.75) 40%,
    rgba(0, 60, 25, 0.2) 70%,
    rgba(0, 60, 25, 0.05) 100%
  );
}

/* Mobile-first: content onderin, gecentreerd */
.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-left {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background-color: rgba(201, 165, 90, 0.15);
  border: 1px solid rgba(201, 165, 90, 0.4);
  color: #c9a55a;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  font-family: 'Inter', sans-serif;
  margin-bottom: 1rem;
}

.hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.2rem, 9vw, 5rem);
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin-bottom: 0.75rem;
}

.hero-title-accent {
  color: #c9a55a;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  max-width: 360px;
}

/* Play knop — gecentreerd op mobile, in de flow */
.hero-play-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.hero-play-ring {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 2px solid rgba(201, 165, 90, 0.4);
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
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 165, 90, 0.3); }
  50% { box-shadow: 0 0 0 16px rgba(201, 165, 90, 0); }
}

.hero-play-btn {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background-color: #c9a55a;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, transform 0.2s;
  padding-left: 5px;
}

.hero-play-btn svg {
  width: 26px;
  height: 26px;
}

.hero:hover .hero-play-btn {
  background-color: #b8923f;
  transform: scale(1.06);
}

.hero-play-label {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.72rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.06em;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
  margin-bottom: 1.4rem;
}

.hero-tag {
  background-color: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
  padding: 0.28rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
}

.hero-meer-btn {
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  background-color: rgba(201, 165, 90, 0.18);
  color: #e8c97a;
  border: 1px solid rgba(201, 165, 90, 0.45);
  padding: 0.9rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s;
}

.hero-meer-btn:hover {
  background-color: rgba(201, 165, 90, 0.32);
}

/* Play knop rechts — verborgen op mobile, zichtbaar op desktop */
.hero-right {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;
  opacity: 0.5;
  pointer-events: none;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}

/* Desktop */
@media (min-width: 768px) {
  .hero {
    align-items: center;
  }

  .hero-overlay {
    background: linear-gradient(
      to right,
      rgba(0, 60, 25, 0.9) 0%,
      rgba(0, 60, 25, 0.72) 55%,
      rgba(0, 60, 25, 0.45) 100%
    );
  }

  .hero-content {
    padding: 0 4rem;
    padding-top: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
  }

  .hero-left {
    align-items: flex-start;
    text-align: left;
    max-width: 680px;
  }

  .hero-subtitle {
    font-size: 1.05rem;
    max-width: 520px;
    margin-bottom: 1.8rem;
  }

  /* Verberg de inline play-knop op desktop */
  .hero-play-center {
    display: none;
  }

  .hero-tags {
    justify-content: flex-start;
    margin-bottom: 2rem;
  }

  .hero-meer-btn {
    display: inline-block;
    width: auto;
    text-align: left;
  }

  /* Toon de play-knop rechts op desktop */
  .hero-right {
    display: flex;
  }

  .hero-right .hero-play-ring {
    width: 130px;
    height: 130px;
  }

  .hero-right .hero-play-btn {
    width: 100px;
    height: 100px;
    padding-left: 6px;
  }

  .hero-right .hero-play-btn svg {
    width: 42px;
    height: 42px;
  }

  .hero-scroll-indicator {
    bottom: 2rem;
  }
}
</style>
