<script setup>
import { quotaStatus } from '~/features/virtual/demo'

const props = defineProps({ value: { type: Array, required: true } })
const status = computed(() => quotaStatus(props.value))
</script>

<template>
  <div class="virtual-quota">
    <span><strong>{{ value[0] }}</strong><span class="virtual-limit"> / {{ value[1] }}</span></span>
    <span v-if="status !== '使用正常'" class="virtual-warning">{{ status }}</span>
  </div>
</template>
