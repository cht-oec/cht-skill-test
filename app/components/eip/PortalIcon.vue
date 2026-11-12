<script setup>
defineProps({ name: { type: String, required: true } })

const shapes = {
  home: 'M2 11 12 2l10 9M5 9v12h5v-7h4v7h5V9',
  calendar: 'M6 2v5m12-5v5M3 9h18M4 5h16l1 2v14H3V7zM7 13h2m3 0h2m3 0h2m-12 4h2m3 0h2',
  tasks: 'M5 2h14v14l-5 5H5zM8 7h8m-8 4h8m-8 4h4m2 6v-5h5',
  users: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9v-2a7 7 0 0 1 14 0v2M3 8a3 3 0 0 0 0 6m18-6a3 3 0 0 1 0 6',
  search: 'M15 15l6 6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0z',
  edit: 'M12 4H3v17h17v-9M8 16l1-4L19 2l3 3-10 10z',
  tray: 'M3 3h18v14H3zM1 17h8l1 2h4l1-2h8v4H1z',
  grid: 'M3 6h4m3 0h4m3 0h4M3 12h4m3 0h4m3 0h4M3 18h4m3 0h4m3 0h4',
  chat: 'M3 3h18v13H9l-5 4v-4H3z',
  mail: 'M2 5h20v14H2zM2 5l10 8 10-8',
  bell: 'M5 16h14l-2-3V8a5 5 0 0 0-10 0v5zm5 4h4',
  sitemap: 'M10 3h4v4h-4zM3 16h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4zM12 7v9m-7 0v-5h14v5',
  star: 'm12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z',
  add: 'M12 7v10m-5-5h10m5 0a10 10 0 1 1-20 0 10 10 0 0 1 20 0z',
  book: 'M5 3h14v18H5zM8 3v18',
  menu: 'M8 6h13M8 12h13M8 18h13m-6-2 3-4-3-4',
  clock: 'M12 7v5l3 2m5-2a8 8 0 1 1-16 0 8 8 0 0 1 16 0z',
}
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="portal-icon">
    <path :d="shapes[name]" />
  </svg>
</template>
