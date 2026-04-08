<template>
  <div class="page">
    <!-- Top bar -->
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="/">
          <span class="brand-logo" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
            </svg>
          </span>
          <span class="brand-title">Midden-Beemster</span>
        </a>
      </div>
    </header>

    <!-- Main content -->
    <main class="content">
      <div class="hero-bg" aria-hidden="true"></div>

      <section class="panel" aria-label="Inloggen">
        <div class="badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="5,3 19,12 5,21"></polygon>
          </svg>
          LOGIN
        </div>

        <h1>Welkom terug</h1>
        <p class="subtitle">Log in om verder te gaan met de 3D ervaring.</p>

        <!-- Error box -->
        <div
          v-if="errorMessage"
          class="error"
          role="alert"
          aria-live="polite"
        >
          {{ errorMessage }}
        </div>

        <form class="form" @submit.prevent="handleSubmit" novalidate>
          <div class="field">
            <label for="username">Naam</label>
            <input
              id="username"
              v-model="username"
              type="text"
              name="username"
              placeholder="Jouw naam"
              autocomplete="username"
            />
          </div>

          <div class="field">
            <label for="password">Wachtwoord</label>
            <input
              id="password"
              v-model="password"
              type="password"
              name="password"
              placeholder="Jouw wachtwoord"
              autocomplete="current-password"
            />
          </div>

          <div class="actions">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="loading"
              :style="{ opacity: loading ? 0.85 : 1 }"
            >
              {{ loading ? 'Bezig met inloggen…' : 'Log in' }}
            </button>
            <router-link class="btn btn-secondary" to="/register">
              Account aanmaken
            </router-link>
          </div>

          <div class="meta">
            <span>UNESCO Werelderfgoed · Beemster</span>
            <a href="/">Terug naar home</a>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  errorMessage.value = ''

  if (!username.value.trim() || !password.value) {
    errorMessage.value = 'Vul je naam en wachtwoord in.'
    return
  }

  loading.value = true

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value.trim(),
        password: password.value,
      }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      errorMessage.value = data.error || 'Inloggen mislukt. Controleer je gegevens.'
    } else {
      alert('Login gelukt!')
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Server error. Probeer het zo opnieuw.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --color-dark: #1c2b1c;
  --color-dark-green: #243524;
  --color-gold: #c9a55a;
  --color-cream: #f4efe6;
  --color-cream-light: #faf7f2;
  --color-text-dark: #1a1a1a;
  --shadow: 0 24px 65px rgba(0, 0, 0, 0.35);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr;
  background: #faf7f2;
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  color: #1a1a1a;
}

/* ── Top bar ── */
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #1c2b1c;
  height: 60px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
}

.topbar-inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: white;
  text-decoration: none;
}

.brand-logo {
  width: 34px;
  height: 34px;
  border-radius: 6px;
  background-color: #c9a55a;
  display: grid;
  place-items: center;
  color: #1c2b1c;
  flex-shrink: 0;
}

.brand-title {
  font-weight: 600;
  font-size: 1rem;
}

/* ── Content area ── */
.content {
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: 3.5rem 1.25rem;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(900px 500px at 15% 20%, rgba(201, 165, 90, 0.14) 0%, rgba(201, 165, 90, 0) 60%),
    radial-gradient(800px 450px at 85% 75%, rgba(201, 165, 90, 0.10) 0%, rgba(201, 165, 90, 0) 65%),
    linear-gradient(
      to right,
      rgba(10, 20, 10, 0.92) 0%,
      rgba(10, 20, 10, 0.78) 55%,
      rgba(10, 20, 10, 0.64) 100%
    );
}

/* ── Panel ── */
.panel {
  position: relative;
  width: 100%;
  max-width: 520px;
  border-radius: 18px;
  background: rgba(250, 247, 242, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 24px 65px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
  padding: 2rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background-color: rgba(201, 165, 90, 0.15);
  border: 1px solid rgba(201, 165, 90, 0.35);
  color: #c9a55a;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin-bottom: 1.25rem;
  user-select: none;
}

h1 {
  margin: 0 0 0.55rem 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.1rem;
  line-height: 1.15;
  color: white;
}

.subtitle {
  margin: 0 0 1.6rem 0;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.6;
  font-size: 0.98rem;
}

/* ── Form ── */
.form {
  display: grid;
  gap: 0.95rem;
}

.field {
  display: grid;
  gap: 0.45rem;
}

label {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.85rem;
  font-weight: 500;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background-color: rgba(255, 255, 255, 0.06);
  color: white;
  padding: 0.85rem 0.95rem;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
  font-family: inherit;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.38);
}

input:focus {
  border-color: rgba(201, 165, 90, 0.55);
  box-shadow: 0 0 0 4px rgba(201, 165, 90, 0.16);
  background-color: rgba(255, 255, 255, 0.08);
}

/* ── Error ── */
.error {
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.45;
  margin-bottom: 0.5rem;
}

/* ── Buttons ── */
.actions {
  display: grid;
  gap: 0.65rem;
  margin-top: 0.35rem;
}

.btn {
  width: 100%;
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 0.75rem 1.1rem;
  font-weight: 600;
  font-size: 0.95rem;
  font-family: 'Inter', system-ui, sans-serif;
  transition: transform 0.15s, background-color 0.2s, opacity 0.2s;
  text-align: center;
  text-decoration: none;
  display: block;
}

.btn:active {
  transform: translateY(1px);
}

.btn:disabled {
  cursor: not-allowed;
}

.btn-primary {
  background-color: #c9a55a;
  color: #1c2b1c;
}

.btn-primary:hover:not(:disabled) {
  background-color: #b8923f;
}

.btn-secondary {
  background-color: rgba(201, 165, 90, 0.18);
  color: #e8c97a;
  border: 1px solid rgba(201, 165, 90, 0.45);
}

.btn-secondary:hover {
  background-color: rgba(201, 165, 90, 0.32);
}

/* ── Meta ── */
.meta {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.78rem;
}

.meta a {
  color: rgba(255, 255, 255, 0.62);
  text-decoration: none;
}

.meta a:hover {
  color: white;
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .topbar {
    padding: 0 1rem;
  }

  .panel {
    padding: 1.4rem;
    border-radius: 16px;
  }

  h1 {
    font-size: 1.85rem;
  }
}
</style>