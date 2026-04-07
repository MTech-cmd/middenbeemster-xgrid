<template>
  <section id="ontdekken" class="experience-section">
    <div class="section-inner">
      <div class="section-header">
        <span class="section-badge">{{ get('1') }}</span>
        <h2 class="section-title">{{ get('2') }}</h2>
        <p class="section-subtitle">
          {{ get('3') }}
        </p>
      </div>

      <!-- Twee kolommen: elke kolom heeft een preview + detail kaart -->
      <div class="cards-columns" id="tour">

        <!-- Kolom 1: Informatie -->
        <div class="card-column">
          <div class="card-preview" @click="activeCard = 'info'" :class="{ active: activeCard === 'info' }">
            <div class="card-preview-image info-image">
              <span class="card-badge info-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                Informatie
              </span>
              <div class="card-preview-overlay">
                <h3 class="card-preview-title">{{ get('5') }}</h3>
              </div>
            </div>
          </div>

          <div class="detail-card info-card">
            <div class="info-card-body">
              <p class="info-intro">
                {{ get('13') }}
              </p>
              <a href="#" class="meer-lezen">Meer lezen <span>›</span></a>

              <div class="ervaring-block">
                <div class="ervaring-header">
                  <span class="ervaring-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                    {{ get('14') }}
                  </span>
                  <span class="ervaring-pct">{{ get('15') }}</span>
                </div>

                <p class="ervaring-text">
                  {{ get('16') }}
                </p>

                <div class="features-grid">
                  <div class="feature-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9" stroke-dasharray="2 2"/></svg>
                    {{ get('17') }}
                  </div>
                  <div class="feature-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                    {{ get('18') }}
                  </div>
                  <div class="feature-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
                    {{ get('19') }}
                  </div>
                  <div class="feature-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {{ get('20') }}
                  </div>
                </div>

                <div class="stars">
                  <span class="star" v-for="i in 5" :key="i">★</span>
                  <span class="stars-label">{{ get('21') }}</span>
                </div>

                <button class="start-btn">{{ get('22') }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom 2: 3D Game -->
        <div class="card-column">
          <div class="card-preview" @click="activeCard = 'game'" :class="{ active: activeCard === 'game' }">
            <div class="card-preview-image game-image">
              <span class="card-badge game-badge">{{ get('7') }}</span>
              <div class="card-preview-overlay game-info-overlay">
                <h3 class="card-preview-title">{{ get('8') }}</h3>
                <p class="game-preview-desc">{{ get('9') }}</p>
                <div class="game-preview-tags">
                  <span class="game-preview-tag">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
                    {{ get('10') }}
                  </span>
                  <span class="game-preview-tag">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {{ get('11') }}
                  </span>
                  <span class="game-preview-tag">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    {{ get('12') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div id="spelen" class="detail-card game-card">
            <div class="game-card-photo-header">
              <div class="game-card-photo-overlay">
                <div class="game-card-info-top">
                  <span class="game-card-info-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                    {{ get('23') }}
                  </span>
                  <span class="game-card-info-live">
                    <span class="live-dot"></span>
                    {{ get('24') }}
                  </span>
                </div>
                <h3 class="game-card-info-title">{{ get('25') }}</h3>
                <p class="game-card-info-sub">{{ get('26') }}</p>
                <div class="game-card-info-stats">
                  <div class="info-stat">
                    <span class="info-stat-value">{{ get('27') }}</span>
                    <span class="info-stat-label">{{ get('28') }}</span>
                  </div>
                  <div class="info-stat-divider"></div>
                  <div class="info-stat">
                    <span class="info-stat-value">{{ get('29') }}</span>
                    <span class="info-stat-label">{{ get('30') }}</span>
                  </div>
                  <div class="info-stat-divider"></div>
                  <div class="info-stat">
                    <span class="info-stat-value">{{ get('31') }}</span>
                    <span class="info-stat-label">{{ get('32') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="game-card-body">
              <p class="game-intro">
                {{ get('33') }}
              </p>

              <div class="game-features">
                <div class="game-feature">
                  <span class="game-feature-dot"></span>
                  <div>
                    <p class="game-feature-title">{{ get('34') }}</p>
                    <p class="game-feature-sub">{{ get('35') }}</p>
                  </div>
                </div>
                <div class="game-feature">
                  <span class="game-feature-dot"></span>
                  <div>
                    <p class="game-feature-title">{{ get('36') }}</p>
                    <p class="game-feature-sub">{{ get('37') }}</p>
                  </div>
                </div>
                <div class="game-feature">
                  <span class="game-feature-dot"></span>
                  <div>
                    <p class="game-feature-title">{{ get('38') }}</p>
                    <p class="game-feature-sub">{{ get('39') }}</p>
                  </div>
                </div>
              </div>

              <button class="start-wandeling-btn">{{ get('40') }}</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const activeCard = ref('info')
const data = ref([])

// helper functie
const get = (id) => {
  return data.value.find(item => item.ApiName === id)?.Content || ''
}

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/content/ExperienceSection')
  data.value = await res.json()
})
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

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-badge {
  display: inline-block;
  background-color: #e8ddc8;
  color: #7a6940;
  border-radius: 20px;
  padding: 0.3rem 1rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  margin-bottom: 1rem;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.8rem;
  line-height: 1.2;
}

.section-subtitle {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 560px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
}

/* Mobile-first: kolommen onder elkaar */
.cards-columns {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Elke kolom: preview + detail kaart gestapeld */
.card-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Preview Cards */
.card-preview {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-preview:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.card-preview-image {
  position: relative;
  height: 200px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.info-image {
  background-image: url('https://www.groepen.be/wp-content/uploads/optimized-71.jpg');
}

.game-image {
  background-image: url('https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80');
}

.card-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 20px;
  padding: 0.3rem 0.75rem;
  font-size: 0.72rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.info-badge {
  background-color: rgba(0, 0, 0, 0.45);
  color: white;
}

.game-badge {
  background-color: rgba(28, 60, 28, 0.85);
  color: #8fce8f;
  letter-spacing: 0.05em;
  font-size: 0.68rem;
}

.card-preview-overlay {
  padding: 1.2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
}

.card-preview-title {
  color: white;
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.game-info-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 20, 10, 0.92) 0%, rgba(10, 20, 10, 0.5) 55%, rgba(10, 20, 10, 0.2) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.2rem;
}

.game-preview-desc {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.78rem;
  line-height: 1.5;
  font-family: 'Inter', sans-serif;
  margin-bottom: 0.75rem;
  max-width: 320px;
}

.game-preview-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.game-preview-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background-color: rgba(143, 206, 143, 0.15);
  border: 1px solid rgba(143, 206, 143, 0.3);
  color: #8fce8f;
  padding: 0.22rem 0.6rem;
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
}

/* Detail Cards */
.detail-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Info Card */
.info-card {
  background: white;
}

.info-card-body {
  padding: 1.8rem;
}

.info-intro {
  color: #444;
  font-size: 0.88rem;
  line-height: 1.7;
  margin-bottom: 0.8rem;
  font-family: 'Inter', sans-serif;
}

.meer-lezen {
  color: #c9a55a;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
}

.meer-lezen:hover {
  color: #b8923f;
}

.ervaring-block {
  border-top: 1px solid #f0ece4;
  padding-top: 1.2rem;
}

.ervaring-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.ervaring-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #666;
  font-family: 'Inter', sans-serif;
}

.ervaring-pct {
  background-color: #e8f5e8;
  color: #2d6a2d;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
}

.ervaring-text {
  color: #555;
  font-size: 0.85rem;
  line-height: 1.65;
  margin-bottom: 1.2rem;
  font-family: 'Inter', sans-serif;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #555;
  font-family: 'Inter', sans-serif;
}

.stars {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 1.2rem;
}

.star {
  color: #c9a55a;
  font-size: 1rem;
}

.stars-label {
  font-size: 0.75rem;
  color: #777;
  font-family: 'Inter', sans-serif;
  margin-left: 0.2rem;
}

.start-btn {
  width: 100%;
  background-color: #243524;
  color: white;
  border: none;
  padding: 0.85rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s;
}

.start-btn:hover {
  background-color: #1c2b1c;
}

/* Game Card */
.game-card {
  background-color: #1e2e1e;
  display: flex;
  flex-direction: column;
}

.game-card-photo-header {
  position: relative;
  height: 200px;
  background-image: url('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.game-card-photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 22, 10, 0.45) 0%,
    rgba(10, 22, 10, 0.88) 100%
  );
  padding: 1.2rem 1.8rem 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.game-card-info-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.game-card-info-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: rgba(143, 206, 143, 0.12);
  border: 1px solid rgba(143, 206, 143, 0.25);
  color: #8fce8f;
  padding: 0.28rem 0.75rem;
  border-radius: 20px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  font-family: 'Inter', sans-serif;
}

.game-card-info-live {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  font-family: 'Inter', sans-serif;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #5cb85c;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.game-card-info-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
}

.game-card-info-sub {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.78rem;
  font-family: 'Inter', sans-serif;
  margin-bottom: 1rem;
}

.game-card-info-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-stat {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.info-stat-value {
  color: #c9a55a;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Playfair Display', serif;
}

.info-stat-label {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  font-family: 'Inter', sans-serif;
}

.info-stat-divider {
  width: 1px;
  height: 28px;
  background-color: rgba(255, 255, 255, 0.1);
}

.game-card-body {
  padding: 1.5rem 1.8rem 1.8rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.game-intro {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
  line-height: 1.65;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
}

.game-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex: 1;
}

.game-feature {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

.game-feature-dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background-color: #5cb85c;
  margin-top: 4px;
}

.game-feature-title {
  color: white;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-bottom: 0.15rem;
}

.game-feature-sub {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.76rem;
  font-family: 'Inter', sans-serif;
}

.start-wandeling-btn {
  width: 100%;
  background-color: #2d4d2d;
  color: white;
  border: none;
  padding: 0.85rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s;
}

.start-wandeling-btn:hover {
  background-color: #3a6a3a;
}

/* Desktop: twee kolommen naast elkaar */
@media (min-width: 768px) {
  .experience-section {
    padding: 5rem 2rem 6rem;
  }

  .section-header {
    margin-bottom: 3.5rem;
  }

  .cards-columns {
    flex-direction: row;
    align-items: flex-start;
    gap: 1.2rem;
  }

  .card-column {
    flex: 1;
    gap: 1.2rem;
  }

  .card-preview-image {
    height: 280px;
  }
}
</style>