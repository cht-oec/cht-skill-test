<script setup>
import PortalIcon from './PortalIcon.vue'
import { usePortalDialog } from '~/features/eip/version/v1/state'
defineProps({ feeds: { type: Object, required: true }, dates: { type: Array, required: true }, height: { type: Number, required: true } })
const selected = defineModel({ type: String, required: true })
const { show } = usePortalDialog()
</script>

<template>
  <section class="portal-panel">
    <div class="panel-tabs">
      <button v-for="(_, tab) in feeds" :key="tab" type="button" :aria-pressed="selected === tab" :class="{ active: selected === tab }" @click="selected = tab">{{ tab }}</button>
    </div>
    <ul class="feed-list" :style="{ '--feed-height': `${height}px` }">
      <li v-for="(item, index) in feeds[selected]" :key="item">
        <span class="feed-date"><PortalIcon name="clock" /> {{ dates[index % dates.length] }}</span>
        <button type="button" @click="show(item, `${selected}的本機示範內容。`)" :class="{ featured: index < 2 }">{{ item }}</button>
      </li>
    </ul>
  </section>
</template>
