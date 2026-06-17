<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection2.vue'
import ExperienceSection from '../components/ExperienceSection2.vue'
import FooterSection from '../components/FooterSection2.vue'

const experienceSection = ref(null)
</script>

<template>
  <NavBar />
  <main>
    <HeroSection @start-experience="experienceSection?.startExperience()" />
    <ExperienceSection ref="experienceSection" />
  </main>
  <FooterSection />
</template>
