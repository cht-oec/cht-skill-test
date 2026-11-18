<script setup>
import { apps, demoDate, features, news, systemCategories } from '~/features/eip/version/v3/demo'

import PortalFeed from './PortalFeed.vue'
import PortalIcon from './PortalIcon.vue'
import { usePortal, usePortalDialog } from '~/features/eip/version/v3/state'

const portal = usePortal()
const { baseURL } = useRuntimeConfig().app
const { show } = usePortalDialog()
const showFavorites = ref(true)
const showTasks = ref(true)
const period = ref('本周')
const featureTab = ref('企業價值觀')
const newsTab = ref('公司新聞')
const widgetNames = {
  features: '企業價值觀', services: '常用系統入口', news: '公司新聞', tasks: '我的待批事項',
  updates: '最新消息', company: '企業動態', calendar: '我的行事曆', systems: 'e化系統',
}
const columns = ref(portal.value.layout.map(column => [...column]))
const dragging = ref('')
const dropColumn = ref(null)
const dropWidget = ref('')
const layoutDirty = computed(() => JSON.stringify(columns.value) !== JSON.stringify(portal.value.layout))
watch(() => portal.value.layout, resetLayout)

function resetLayout() {
  columns.value = portal.value.layout.map(column => [...column])
}

function saveLayout() {
  portal.value.layout = columns.value.map(column => [...column])
}

function startDrag(event, widget) {
  dragging.value = widget
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', widget)
}

function clearDrag() {
  dragging.value = ''
  dropColumn.value = null
  dropWidget.value = ''
}

function dragOver(event, columnIndex, widget = '') {
  if (!dragging.value) return
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
  dropColumn.value = columnIndex
  dropWidget.value = widget
}

function moveWidget(widget, columnIndex, position) {
  const next = columns.value.map(column => column.filter(item => item !== widget))
  next[columnIndex].splice(position, 0, widget)
  columns.value = next
}

function drop(event, columnIndex, target = '') {
  const widget = dragging.value
  if (!widget) return
  event.preventDefault()
  if (widget !== target) {
    const siblings = columns.value[columnIndex].filter(item => item !== widget)
    const bounds = event.currentTarget.getBoundingClientRect()
    const after = event.clientY >= bounds.top + bounds.height / 2
    const position = target ? siblings.indexOf(target) + Number(after) : siblings.length
    moveWidget(widget, columnIndex, position)
  }
  clearDrag()
}

async function moveWithKeyboard(event, widget, columnIndex, index) {
  if (event.target !== event.currentTarget || !event.altKey) return
  const directions = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }
  const direction = directions[event.key]
  if (!direction) return
  event.preventDefault()
  const nextColumn = columnIndex + direction[0]
  const nextIndex = index + direction[1]
  if (!columns.value[nextColumn] || nextIndex < 0 || (nextColumn === columnIndex && nextIndex >= columns.value[nextColumn].length)) return
  moveWidget(widget, nextColumn, nextIndex)
  await nextTick()
  document.getElementById(`widget-${widget}`)?.focus()
}
const favoriteItems = computed(() => portal.value.groups.find(group => group.name === portal.value.group)?.items ?? [])
const pending = computed(() => portal.value.tasks.filter(task => !task.done))
const periods = { 本周: ['2026-11-09', '2026-11-15'], 下星期: ['2026-11-16', '2026-11-22'], 下個月: ['2026-12-01', '2026-12-31'] }
const periodEvents = computed(() => {
  const [start, end] = periods[period.value]
  return portal.value.events.filter(event => event.date <= end && event.endDate >= start).sort((a, b) => a.date.localeCompare(b.date))
})

function openApp(label) {
  if (label === 'LDAP查詢' || label === '員工目錄查詢') return show('員工目錄查詢', '', 'directory')
  if (label === '電子公文' || label === 'ODAS公文') {
    showTasks.value = true
    return document.getElementById('needCheck')?.scrollIntoView({ block: 'center' })
  }
  show(label, '這是 EIP 首頁的示範系統入口。')
}

function openCategory(category) {
  const available = apps.filter(app => app[3] === category).map(app => app[1])
  show(category, '', 'results', available.length ? available : [`${category}服務入口`])
}
</script>

<template>
  <section v-if="portal.settings.favorites" class="portal-panel favorites" aria-label="常用功能">
    <header class="panel-head">
      <div class="favorite-tools">
        <h2>常用功能<sup title="可於我的個人設定調整顯示">●</sup></h2>
        <button class="blue-button" type="button" @click="show('編輯常用功能', '', 'favorites')">編輯</button>
        <select v-model="portal.group" aria-label="選擇常用功能群組"><option v-for="group in portal.groups" :key="group.name">{{ group.name }}</option></select>
      </div>
      <button type="button" class="panel-collapse" :aria-expanded="showFavorites" aria-label="收合或展開常用功能" @click="showFavorites = !showFavorites">{{ showFavorites ? '−' : '+' }}</button>
    </header>
    <div v-if="showFavorites" class="favorite-items">
      <button v-for="item in favoriteItems" :key="item" type="button" @click="openApp(item)">{{ item }}</button>
      <p v-if="!favoriteItems.length">這個群組還沒有常用功能。</p>
    </div>
  </section>

  <div v-if="layoutDirty" class="layout-actions">
    <button type="button" class="blue-button" @click="saveLayout">儲存版面位置</button>
    <button type="button" @click="resetLayout">取消</button>
  </div>
  <div class="dashboard-columns">
    <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="dashboard-column" :class="{ 'drop-column': dropColumn === columnIndex && !dropWidget }" @dragover="dragOver($event, columnIndex)" @drop="drop($event, columnIndex)">
      <div v-for="(widget, index) in column" :id="`widget-${widget}`" :key="widget" class="dashboard-widget" :class="{ dragging: dragging === widget, 'drop-widget': dropWidget === widget }" draggable="true" tabindex="0" :aria-label="`${widgetNames[widget]}，按 Alt 加方向鍵可移動`" @dragstart="startDrag($event, widget)" @dragend="clearDrag" @dragover.stop="dragOver($event, columnIndex, widget)" @drop.stop="drop($event, columnIndex, widget)" @keydown="moveWithKeyboard($event, widget, columnIndex, index)">
      <PortalFeed v-if="widget === 'features'" v-model="featureTab" :feeds="features" :dates="['2026-10-29', '2026-10-15', '2026-09-24', '2026-09-10', '2026-08-27']" :height="160" />
      <section v-else-if="widget === 'services'" class="system-tiles" aria-label="常用系統入口">
        <button v-for="[label, , image] in apps.slice(0, 8)" :key="label" type="button" @click="openApp(label)">
          <img :src="`${baseURL}eip/${image}`" alt="">
          <span v-if="label === '電子公文' && pending.length" class="number-badge">{{ pending.length }}</span>
          {{ label }}
        </button>
      </section>
      <PortalFeed v-else-if="widget === 'news'" v-model="newsTab" :feeds="news" :dates="['2026/11/02', '2026/11/02', '2026/11/02', '2026/10/30']" :height="274" />
      <section v-else-if="widget === 'tasks'" id="needCheck" class="portal-panel" aria-labelledby="task-heading">
        <header class="panel-head"><h2 id="task-heading">我的待批事項</h2></header>
        <button class="task-toggle" type="button" :aria-expanded="showTasks" @click="showTasks = !showTasks">
          <span>{{ showTasks ? '−' : '+' }} 電子公文</span><span class="number-badge">{{ pending.length }}</span>
        </button>
        <ul v-if="showTasks" class="task-list">
          <li v-for="task in pending" :key="task.id">
            <button type="button" @click="show('電子公文', task.title, 'task', task.id)">{{ task.title }}</button>
            <span class="feed-date"><PortalIcon name="clock" /> {{ task.date }}</span>
          </li>
          <li v-if="!pending.length">目前沒有待批事項。</li>
        </ul>
      </section>
      <section v-else-if="widget === 'updates'" class="portal-panel">
        <header class="panel-head"><h2>最新消息</h2><button type="button" @click="show('更多最新消息', '', 'results', ['辦公設備維護公告', '本月教育訓練資訊'])">▤ 更多最新消息</button></header>
        <div class="empty-panel"></div>
      </section>
      <section v-else-if="widget === 'company'" class="portal-panel">
        <header class="panel-head"><h2>企業動態</h2><button type="button" @click="show('更多企業動態', '', 'results', ['服務交流活動', '永續城市論壇'])">▤ 更多企業動態</button></header>
        <div class="empty-panel"></div>
      </section>

      <section v-else-if="widget === 'calendar'" class="calendar-board" aria-labelledby="calendar-heading">
        <div class="calendar-cover">
          <h2 id="calendar-heading">我的行事曆</h2>
          <div class="calendar-date"><span>November</span><strong>11</strong></div>
          <div class="analog-clock" aria-hidden="true"><span></span><span></span></div>
          <div class="calendar-actions">
            <button type="button" @click="show('新增行事曆事件', '', 'event', demoDate)">✚ 新事件</button>
            <button type="button" @click="show('我的行事曆', '', 'calendar')"><PortalIcon name="calendar" /> 展開月曆</button>
          </div>
        </div>
        <div class="panel-tabs">
          <button v-for="(_, tab) in periods" :key="tab" type="button" :class="{ active: period === tab }" :aria-pressed="period === tab" @click="period = tab">{{ tab }}</button>
        </div>
        <ul class="calendar-list">
          <li v-for="event in periodEvents" :key="event.id">
            <span class="feed-date"><PortalIcon name="clock" /> {{ event.start || '整日' }}</span>
            <button type="button" @click="show(event.title, event.note, 'event-details', event)">{{ event.title }}</button>
            <span>{{ event.date.slice(5).replace('-', '/') }}-{{ event.endDate.slice(5).replace('-', '/') }}</span>
          </li>
          <li v-if="!periodEvents.length" class="calendar-empty">目前沒有行事曆事件。</li>
        </ul>
      </section>

      <section v-else-if="widget === 'systems'" id="esystemBoard" class="portal-panel">
        <header class="panel-head"><h2>e化系統</h2></header>
        <div class="system-categories">
          <button v-for="category in systemCategories" :key="category" type="button" @click="openCategory(category)">{{ category }}</button>
        </div>
      </section>
      </div>
    </div>
  </div>
</template>
