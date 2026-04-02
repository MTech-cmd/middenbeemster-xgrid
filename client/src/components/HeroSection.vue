<template>
  <section class="hero">
    <div class="hero-overlay"></div>

    <div class="hero-content">
      <div class="hero-badge">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M12 2l2.09 6.26H20l-5.19 3.77 1.98 6.16L12 14.5l-4.79 3.69 1.98-6.16L4 8.26h5.91z"/>
        </svg>
        UNESCO Werelderfgoed
      </div>

      <h1 class="hero-title">Begin de <span class="hero-accent">3D Ervaring</span></h1>

      <p class="hero-subtitle">
        Ontdek de rijke geschiedenis van Midden-Beemster door een interactieve 3D wereld. Geen download vereist — speel direct in je browser.
      </p>

      <div class="hero-buttons">
        <a href="#ontdekken" class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Ontdekken
        </a>
        <button class="btn-outline" @click="startExperience">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
          3D Tour Starten
        </button>
      </div>

      <div class="hero-tags">
        <span class="hero-tag">360° Rondlopen</span>
        <span class="hero-tag">Tijdreizen</span>
        <span class="hero-tag">Object interacties</span>
        <span class="hero-tag">Gratis toegang</span>
      </div>
    </div>

    <div class="hero-scroll">
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
  background-position: center top;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(5, 15, 5, 0.55) 0%,
    rgba(5, 15, 5, 0.78) 60%,
    rgba(5, 15, 5, 0.95) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background-color: rgba(201, 165, 90, 0.18);
  border: 1px solid rgba(201, 165, 90, 0.45);
  color: #c9a55a;
  padding: 0.45rem 1.1rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  font-family: 'Inter', sans-serif;
  margin-bottom: 1.4rem;
}

.hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.4rem, 8vw, 5rem);
  font-weight: 700;
  color: white;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.hero-accent {
  color: #c9a55a;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  line-height: 1.65;
  margin-bottom: 2rem;
  font-family: 'Inter', sans-serif;
  max-width: 560px;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 360px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.9rem 2rem;
  background-color: #c9a55a;
  color: #1c2b1c;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.btn-primary:hover {
  background-color: #b8923f;
  transform: scale(1.03);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.9rem 2rem;
  background-color: transparent;
  color: #c9a55a;
  border: 2px solid #c9a55a;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, transform 0.2s;
}

.btn-outline:hover {
  background-color: #c9a55a;
  color: #1c2b1c;
  transform: scale(1.03);
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.hero-tag {
  background-color: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
  font-size: 0.76rem;
  font-family: 'Inter', sans-serif;
}

.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;
  opacity: 0.5;
  pointer-events: none;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(8px); }
}

@media (min-width: 640px) {
  .hero-buttons {
    flex-direction: row;
    max-width: none;
    width: auto;
  }

  .btn-primary,
  .btn-outline {
    width: auto;
  }
}
</style>
