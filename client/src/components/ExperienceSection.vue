<template>
  <section id="ontdekken" class="experience-section">
    <div class="section-inner">

      <!-- Section header -->
      <div class="section-header">
        <span class="section-badge">ONTDEK &amp; BELEVEN</span>
        <h2 class="section-title">Twee manieren om geschiedenis te ervaren</h2>
        <p class="section-subtitle">
          Leer meer over de rijke historie van Midden-Beemster of stap direct de virtuele wereld in via onze interactieve 3D scan. Kies je eigen avontuur door de eeuwen heen.
        </p>
      </div>

      <div class="cards-stack" id="tour">

        <!-- Card 1: About Midden-Beemster -->
        <div class="card card-light">
          <div class="card-grid">
            <div class="card-img-wrap">
              <img
                src="https://www.groepen.be/wp-content/uploads/optimized-71.jpg"
                alt="Historisch Midden-Beemster"
                class="card-img"
              />
            </div>
            <div class="card-body">
              <div class="card-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Informatie
              </div>
              <h3 class="card-title">Midden-Beemster</h3>
              <div class="card-text">
                <p>
                  Midden-Beemster is een pittoresk dorp in de Beemsterpolder — één van de oudste droogmakerijen ter wereld. Drooggelegd in 1612 en in 1999 aangewezen als UNESCO Werelderfgoed, staat de Beemster bekend om zijn unieke rechthoekige landschapspatroon en rijke landbouwgeschiedenis.
                </p>
                <p>
                  Het dorp weerspiegelt de gouden eeuw van de Nederlandse waterbouwkunde en stedenbouw, met historische gebouwen en wegen die nog steeds het oorspronkelijke 17e-eeuwse patroon volgen.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: 3D Scan Experience -->
        <div class="card card-light">
          <div class="card-grid">
            <div class="card-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80"
                alt="3D Scan Ervaring"
                class="card-img"
              />
            </div>
            <div class="card-body">
              <div class="card-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                3D Interactief
              </div>
              <h3 class="card-title">3D Scan Ervaring</h3>
              <div class="card-text">
                <p>
                  Dankzij geavanceerde 3D-scanningtechnologie is Midden-Beemster volledig digitaal vastgelegd. Loop door historische gebouwen, bekijk details van eeuwenoude architectuur en ontdek verhalen die verborgen zijn in de muren.
                </p>
                <p>
                  Stap in een levensechte digitale reconstructie van Midden-Beemster. Verken gebouwen van binnenuit, klik op historische objecten voor verborgen verhalen en maak een reis door de tijd.
                </p>
              </div>
              <div class="features-grid">
                <div class="feature-item">
                  <span class="feature-dot"></span>
                  <div>
                    <p class="feature-title">360° Rondlopen</p>
                    <p class="feature-sub">Navigeer door elk gebouw</p>
                  </div>
                </div>
                <div class="feature-item">
                  <span class="feature-dot"></span>
                  <div>
                    <p class="feature-title">Object Interacties</p>
                    <p class="feature-sub">Klik voor informatie</p>
                  </div>
                </div>
                <div class="feature-item">
                  <span class="feature-dot"></span>
                  <div>
                    <p class="feature-title">Meerdere Locaties</p>
                    <p class="feature-sub">Verschillende gebouwen</p>
                  </div>
                </div>
                <div class="feature-item">
                  <span class="feature-dot"></span>
                  <div>
                    <p class="feature-title">Tijdreizen</p>
                    <p class="feature-sub">Reis door de eeuwen</p>
                  </div>
                </div>
              </div>
              <div class="stars-row">
                <span class="star" v-for="i in 5" :key="i">★</span>
                <span class="stars-label">Unieke digitale erfgoed ervaring</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 3: Play Card -->
        <div class="card card-play" id="spelen">
          <div class="play-grid">
            <div class="play-img-wrap">
              <img :src="beemsterImg" alt="Beemster 3D Scan" class="play-img" />
            </div>
          <div class="play-inner">
            <div class="play-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Speel Nu
            </div>
            <h3 class="play-title">Begin je 3D wandeling</h3>
            <p class="play-desc">
              Volledig interactieve 3D scan omgeving waar je vrijelijk kunt rondlopen, historische objecten kunt ontdekken en de transformatie van Midden-Beemster door de tijd kunt beleven. Geen download vereist — speel direct in je browser.
            </p>
            <div class="stats-grid">
              <div class="stat-box">
                <div class="stat-value">360°</div>
                <div class="stat-label">Rondlopen</div>
              </div>
              <div class="stat-box">
                <div class="stat-value">4K</div>
                <div class="stat-label">Kwaliteit</div>
              </div>
              <div class="stat-box">
                <div class="stat-value">1612</div>
                <div class="stat-label">Tijdperk</div>
              </div>
            </div>
            <button class="play-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              Start 3D Wandeling
            </button>
          </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import beemsterImg from '../assets/beemster.png'
</script>

<style scoped>
.experience-section {
  background-color: #f4efe6;
  padding: 3rem 1.25rem 4rem;
}

.section-inner {
  max-width: 1280px;
  margin: 0 auto;
}

/* ── Section Header ── */
.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-badge {
  display: inline-block;
  background-color: #e8ddc8;
  color: #7a6940;
  border-radius: 20px;
  padding: 0.3rem 1rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-bottom: 1rem;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.8rem;
  line-height: 1.2;
}

.section-subtitle {
  color: #555;
  font-size: 1rem;
  line-height: 1.65;
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
}

/* ── Cards stack ── */
.cards-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── Shared card ── */
.card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.25s, border-color 0.25s;
}

.card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.14);
}

/* ── Light cards (1 & 2) ── */
.card-light {
  background-color: #ffffff;
  border: 1px solid #e8ddc8;
}

.card-light:hover {
  border-color: rgba(201, 165, 90, 0.5);
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr;
}

.card-img-wrap {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background-color: #e8ddc8;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}

.card-light:hover .card-img {
  transform: scale(1.06);
}

.card-body {
  padding: 1.6rem 1.8rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #c9a55a;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-bottom: 0.65rem;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.card-text {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-text p {
  color: #555;
  font-size: 0.92rem;
  line-height: 1.7;
  font-family: 'Inter', sans-serif;
  margin: 0;
}

/* ── Feature grid (card 2) ── */
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 1.4rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

.feature-dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background-color: #c9a55a;
  margin-top: 5px;
  flex-shrink: 0;
}

.feature-title {
  color: #1a1a1a;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin: 0 0 0.1rem;
}

.feature-sub {
  color: #777;
  font-size: 0.76rem;
  font-family: 'Inter', sans-serif;
  margin: 0;
}

/* ── Stars ── */
.stars-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 1.4rem;
}

.star {
  color: #c9a55a;
  font-size: 1rem;
}

.stars-label {
  color: #777;
  font-size: 0.76rem;
  font-family: 'Inter', sans-serif;
  margin-left: 0.2rem;
}

/* ── Play Card ── */
.card-play {
  background: linear-gradient(135deg, #2d4d2d 0%, #1c2b1c 100%);
  border: 1px solid rgba(201, 165, 90, 0.3);
}

.card-play:hover {
  border-color: #c9a55a;
}

.play-grid {
  display: grid;
  grid-template-columns: 1fr;
}

.play-img-wrap {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background-color: #1c2b1c;
}

.play-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.card-play:hover .play-img {
  transform: scale(1.04);
}

.play-inner {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.play-label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #c9a55a;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-bottom: 0.85rem;
}

.play-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.play-desc {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.95rem;
  line-height: 1.7;
  font-family: 'Inter', sans-serif;
  margin-bottom: 1.8rem;
  max-width: 560px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 480px;
  margin-bottom: 2rem;
}

.stat-box {
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem 0.5rem;
}

.stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #c9a55a;
  margin-bottom: 0.2rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.04em;
}

.play-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.9rem 2.2rem;
  background-color: #c9a55a;
  color: #1c2b1c;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.play-btn:hover {
  background-color: #b8923f;
  transform: scale(1.04);
}

/* ── Desktop ── */
@media (min-width: 768px) {
  .experience-section {
    padding: 5rem 2rem 6rem;
  }

  .section-header {
    margin-bottom: 3.5rem;
  }

  .card-grid {
    grid-template-columns: 1fr 1fr;
  }

  .card-img-wrap {
    aspect-ratio: auto;
  }

  .play-grid {
    grid-template-columns: 1fr 1fr;
  }

  .play-img-wrap {
    aspect-ratio: auto;
  }

  .play-inner {
    padding: 3rem 2.5rem;
    justify-content: center;
  }
}
</style>
