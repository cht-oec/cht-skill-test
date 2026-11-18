<script setup>
import PortalIcon from './PortalIcon.vue'
import { usePortal, usePortalDialog } from '~/features/eip/version/v3/state'
import { apps, demoDate, directoryPeople, navItems } from '~/features/eip/version/v3/demo'

const portal = usePortal()
const { request, show } = usePortalDialog()
const dialog = ref(null)
const draft = ref({})
const error = ref('')
const directoryQuery = ref('')
const month = ref(new Date(2026, 10, 1))

const monthLabel = computed(() => new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: 'long' }).format(month.value))
const days = computed(() => {
  const year = month.value.getFullYear()
  const monthIndex = month.value.getMonth()
  const length = new Date(year, monthIndex + 1, 0).getDate()
  return [...Array(month.value.getDay()).fill(null), ...Array.from({ length: length }, (_, index) => {
    const day = index + 1
    const date = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return { day, date, events: portal.value.events.filter(event => event.date <= date && event.endDate >= date) }
  })]
})

const visiblePeople = computed(() => {
  const value = directoryQuery.value.trim().toLocaleLowerCase()
  return directoryPeople.filter(person => !value || person.join(' ').toLocaleLowerCase().includes(value))
})

watch(request, (value) => {
  if (!value) return
  error.value = ''
  directoryQuery.value = ''
  if (value.kind === 'event') {
    const date = value.data || demoDate
    draft.value = { title: '', date, endDate: date, start: '08:30', end: '09:30', allDay: false, place: '', note: '' }
  } else if (value.kind === 'profile') {
    draft.value = { ...portal.value.settings }
  } else if (value.kind === 'favorites') {
    const group = portal.value.groups.find(group => group.name === portal.value.group)
    draft.value = { name: group?.name || '預設', items: [...(group?.items || [])], newName: '' }
  } else {
    draft.value = { name: '' }
  }
  if (!dialog.value.open) dialog.value.showModal()
}, { flush: 'post' })

function close() {
  request.value = null
  dialog.value.close()
}

function stepMonth(amount) {
  month.value = new Date(month.value.getFullYear(), month.value.getMonth() + amount, 1)
}

function submitEvent() {
  const { title, date, endDate, start, end, allDay, place, note } = draft.value
  if (!title.trim()) { error.value = '請輸入事件名稱。'; return }
  if (endDate < date || (!allDay && endDate === date && end < start)) { error.value = '結束時間須晚於或等於開始時間。'; return }
  portal.value.events.push({ id: crypto.randomUUID(), title: title.trim(), date, endDate, start: allDay ? '' : start, end: allDay ? '' : end, place, note })
  close()
}

function saveShortcut() {
  const name = draft.value.name.trim()
  if (!name) { error.value = '請輸入捷徑名稱。'; return }
  if (portal.value.shortcuts.includes(name)) { error.value = '此捷徑已存在。'; return }
  portal.value.shortcuts.push(name)
  close()
}

function saveFavorites() {
  const newName = draft.value.newName.trim()
  const name = newName || draft.value.name
  const group = portal.value.groups.find(group => group.name === name)
  if (newName && group) { error.value = '群組名稱已存在。'; return }
  if (group) group.items = draft.value.items
  else portal.value.groups.push({ name, items: draft.value.items })
  portal.value.group = name
  close()
}

function saveProfile() {
  const name = draft.value.name.trim()
  if (!name) { error.value = '請輸入暱稱。'; return }
  portal.value.settings = { ...draft.value, name }
  close()
}

function completeTask() {
  const task = portal.value.tasks.find(task => task.id === request.value.data)
  if (task) task.done = true
  close()
}
</script>

<template>
  <dialog ref="dialog" class="portal-dialog" :class="{ 'dialog-wide': ['calendar', 'directory'].includes(request?.kind) }" aria-labelledby="dialog-title" @cancel.prevent="close">
    <template v-if="request">
      <header class="panel-head"><h2 id="dialog-title">{{ request.title }}</h2><button type="button" aria-label="關閉" @click="close">×</button></header>
      <div class="dialog-body">
        <form v-if="request.kind === 'event'" class="portal-form" @submit.prevent="submitEvent">
          <label>事件名稱<input v-model="draft.title" placeholder="請輸入事件名稱" required></label>
          <div class="form-row"><label>開始日期<input v-model="draft.date" type="date" required></label><label>結束日期<input v-model="draft.endDate" type="date" required></label></div>
          <div v-if="!draft.allDay" class="form-row"><label>開始時間<input v-model="draft.start" type="time" required></label><label>結束時間<input v-model="draft.end" type="time" required></label></div>
          <label class="check"><input v-model="draft.allDay" type="checkbox"> 整日事件</label>
          <label>事件地點<input v-model="draft.place" placeholder="請輸入事件地點"></label>
          <label>事件說明<textarea v-model="draft.note" rows="3"></textarea></label>
          <p v-if="error" class="form-error" role="alert">{{ error }}</p>
          <div class="dialog-actions"><button type="button" @click="close">取消</button><button class="blue-button" type="submit">儲存</button></div>
        </form>

        <template v-else-if="request.kind === 'calendar'">
          <div class="month-toolbar"><div><button type="button" aria-label="上個月" @click="stepMonth(-1)">‹</button><button type="button" aria-label="下個月" @click="stepMonth(1)">›</button></div><strong>{{ monthLabel }}</strong><button type="button" class="blue-button" @click="show('新增行事曆事件', '', 'event', demoDate)">新增事件</button></div>
          <div class="month-grid">
            <strong v-for="weekday in ['日', '一', '二', '三', '四', '五', '六']" :key="weekday">{{ weekday }}</strong>
            <div v-for="(day, index) in days" :key="index" class="month-day" :class="{ today: day?.date === demoDate }">
              <template v-if="day">
                <button type="button" :aria-label="`新增 ${day.date} 的事件`" @click="show('新增行事曆事件', '', 'event', day.date)">{{ day.day }}</button>
                <button v-for="event in day.events" :key="event.id" type="button" class="month-event" @click="show(event.title, event.note, 'event-details', event)">{{ event.title }}</button>
              </template>
            </div>
          </div>
        </template>

        <template v-else-if="request.kind === 'directory'">
          <label class="portal-form">查詢員工<input v-model="directoryQuery" placeholder="可輸入姓名、員工代號、部門或分機"></label>
          <ul class="result-list">
            <li v-for="[name, company, unit, id, extension] in visiblePeople" :key="id"><strong>{{ name }}</strong> · {{ company }}／{{ unit }} · {{ id }} · 分機 {{ extension }}</li>
            <li v-if="!visiblePeople.length">查無符合的示範員工。</li>
          </ul>
        </template>

        <form v-else-if="request.kind === 'profile'" class="portal-form" @submit.prevent="saveProfile">
          <label>系統預設暱稱<input v-model="draft.name" maxlength="20" placeholder="請輸入暱稱" required></label>
          <label>系統字級設定<select v-model="draft.font"><option>標準</option><option>大</option></select></label>
          <label class="check"><input v-model="draft.theme" type="checkbox"> 顯示節慶佈景</label>
          <label class="check"><input v-model="draft.favorites" type="checkbox"> 顯示常用功能</label>
          <p v-if="error" class="form-error" role="alert">{{ error }}</p>
          <div class="dialog-actions"><button class="blue-button" type="submit">儲存與更新</button></div>
        </form>

        <form v-else-if="request.kind === 'favorites'" class="portal-form" @submit.prevent="saveFavorites">
          <label>群組<input v-model="draft.newName" placeholder="輸入名稱以新增群組" maxlength="20"></label>
          <label v-for="app in apps" :key="app[1]" class="check"><input v-model="draft.items" type="checkbox" :value="app[1]"> {{ app[1] }}</label>
          <p v-if="error" class="form-error" role="alert">{{ error }}</p>
          <div class="dialog-actions"><button class="blue-button" type="submit">儲存常用功能</button></div>
        </form>

        <form v-else-if="request.kind === 'shortcut'" class="portal-form" @submit.prevent="saveShortcut">
          <label>捷徑名稱<input v-model="draft.name" maxlength="40" required></label>
          <p v-if="error" class="form-error" role="alert">{{ error }}</p>
          <div class="dialog-actions"><button class="blue-button" type="submit">新增</button></div>
        </form>

        <template v-else-if="request.kind === 'results'">
          <p v-if="request.body">查詢「{{ request.body }}」</p>
          <ul class="result-list">
            <li v-for="label in request.data" :key="label"><button type="button" @click="show(label, '這是本機示範項目。')">{{ label }}</button></li>
            <li v-if="!request.data.length">查無符合的項目。</li>
          </ul>
        </template>

        <ul v-else-if="request.kind === 'sitemap'" class="result-list">
          <li v-for="[icon, label] in navItems" :key="label"><PortalIcon :name="icon" /> {{ label }}</li>
        </ul>

        <template v-else-if="request.kind === 'event-details'">
          <p>{{ request.data.date }} {{ request.data.start }} ～ {{ request.data.endDate }} {{ request.data.end }}</p>
          <p v-if="request.data.place">地點 {{ request.data.place }}</p><p v-if="request.body">{{ request.body }}</p>
        </template>

        <template v-else>
          <p>{{ request.body }}</p>
          <div v-if="request.kind === 'task'" class="dialog-actions"><button type="button" class="blue-button" @click="completeTask">標為已處理</button></div>
          <div v-else-if="request.kind === 'logout'" class="dialog-actions"><button type="button" @click="close">取消</button><button type="button" class="blue-button" @click="show('展示已結束', '按右上角關閉即可返回首頁。')">結束展示</button></div>
        </template>
      </div>
    </template>
  </dialog>
</template>
