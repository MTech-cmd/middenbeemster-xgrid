<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <span class="logo-mark">⚙</span>
      <span class="logo-text">Admin</span>
    </div>

```
<nav class="sidebar-nav">
  <button
    class="nav-item"
    :class="{ active: active === 'pages' }"
    @click="$emit('change','pages')"
  >
    <i class="ti ti-layout-grid"></i>
    <span>Pagina's</span>
  </button>

  <button
    class="nav-item"
    :class="{ active: active === 'navbar' }"
    @click="$emit('change','navbar')"
  >
    <i class="ti ti-menu-2"></i>
    <span>Navigatie</span>
  </button>
</nav>

<slot />
```

  </aside>
</template>

<script setup>
defineProps({
  active: {
    type: String,
    required: true
  }
})

defineEmits(['change'])
</script>
