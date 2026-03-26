<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="#" class="navbar-brand">
        <div class="navbar-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
          </svg>
        </div>
        <span class="navbar-title">Midden-Beemster</span>
      </a>

      <div class="navbar-links">
        <a href="#ontdekken" class="nav-link">Ontdekken</a>
        <a href="#tour" class="nav-link">3D Tour</a>
        <a href="#spelen" class="nav-btn">Speel Nu →</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #1c2b1c;
  padding: 0 2rem;
  height: 60px;
}

.navbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.navbar-logo {
  width: 34px;
  height: 34px;
  background-color: #c9a55a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1c2b1c;
  flex-shrink: 0;
}

.navbar-title {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s;
}

.nav-link:hover {
  color: white;
}

.nav-btn {
  background-color: #c9a55a;
  color: #1c2b1c;
  padding: 0.45rem 1.1rem;
  border-radius: 20px;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s;
}

.nav-btn:hover {
  background-color: #b8923f;
}
</style>
