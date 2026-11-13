<script setup>
import PortalIcon from '~/components/eip/PortalIcon.vue'
import VirtualQuota from './VirtualQuota.vue'
import { accounts, aiTone, filters, quotaStatus, rentalTone, tenants } from '~/features/virtual/demo'
import '~/assets/css/virtual.css'

const { baseURL } = useRuntimeConfig().app
const tabs = [{ id: 'tenants', label: '品牌租戶' }, { id: 'accounts', label: '使用者帳號' }]
const navigation = [
  { label: '租戶／帳號管理', icon: 'users' },
  { label: '公版資產管理', icon: 'grid' },
  { label: '報表管理', icon: 'tasks' },
]
const tenantColumns = [
  { key: 'code', label: '品牌代號', sortable: true },
  { key: 'name', label: '品牌名稱', sortable: true },
  { key: 'manager', label: '品牌管理者' },
  { key: 'email', label: '電子信箱' },
  { key: 'accounts', label: '品牌帳號', numeric: true },
  { key: 'roles', label: '角色使用', numeric: true },
  { key: 'streams', label: '串流使用', numeric: true },
  { key: 'rental', label: '租用狀態' },
  { key: 'expires', label: '授權到期日', sortable: true },
  { key: 'ai', label: 'AI 資源' },
]
const accountColumns = [
  { key: 'name', label: '使用者姓名', sortable: true },
  { key: 'email', label: '電子信箱' },
  { key: 'brand', label: '品牌名稱' },
  { key: 'code', label: '品牌代號', sortable: true },
]

const activeTab = ref('tenants')
const isTenant = computed(() => activeTab.value === 'tenants')
const tenantRows = ref(tenants.map(row => ({ ...row })))
const accountRows = ref(accounts.map(row => ({ ...row })))
const columns = computed(() => isTenant.value ? tenantColumns : accountColumns)
const draftQuery = ref('')
const query = ref('')
const selected = reactive(Object.fromEntries(filters.map(({ key }) => [key, ''])))
const sortKey = ref('')
const ascending = ref(true)
const page = ref(1)
const pageSize = 6
const notice = ref('')
const dialog = ref(null)
const dialogState = ref(null)
const form = reactive({ code: '', brand: '', name: '', email: '' })
const formError = ref('')

const matchingRows = computed(() => {
  const source = isTenant.value ? tenantRows.value : accountRows.value
  const rows = source.filter(row => {
    const searchFields = isTenant.value ? [row.code, row.name] : [row.name, row.email]
    if (!searchFields.some(value => value.toLowerCase().includes(query.value))) return false
    return !isTenant.value || filters.every(({ key }) => {
      if (!selected[key]) return true
      const value = row[key]
      return selected[key] === (Array.isArray(value) ? quotaStatus(value) : value)
    })
  })
  if (!sortKey.value) return rows
  return rows.sort((left, right) => {
    const order = left[sortKey.value].localeCompare(right[sortKey.value], 'zh-Hant')
    return ascending.value ? order : -order
  })
})
const pageCount = computed(() => Math.max(1, Math.ceil(matchingRows.value.length / pageSize)))
const visibleRows = computed(() => matchingRows.value.slice((page.value - 1) * pageSize, page.value * pageSize))

watch(selected, () => { page.value = 1 })
watch(pageCount, count => { page.value = Math.min(page.value, count) })

function switchTab(id) {
  activeTab.value = id
  draftQuery.value = ''
  query.value = ''
  sortKey.value = ''
  page.value = 1
}

function navigateTabs(event, index) {
  const next = { ArrowLeft: 1 - index, ArrowRight: 1 - index, Home: 0, End: tabs.length - 1 }[event.key]
  if (next === undefined) return
  event.preventDefault()
  switchTab(tabs[next].id)
  document.getElementById(`virtual-tab-${tabs[next].id}`)?.focus()
}

function search() {
  query.value = draftQuery.value.trim().toLowerCase()
  page.value = 1
}

function clearFilters() {
  filters.forEach(({ key }) => { selected[key] = '' })
  draftQuery.value = ''
  search()
}

function sortBy(key) {
  ascending.value = sortKey.value !== key || !ascending.value
  sortKey.value = key
  page.value = 1
}

async function showDialog(state) {
  dialogState.value = state
  await nextTick()
  dialog.value.showModal()
  dialog.value.querySelector('[autofocus]')?.focus()
}

function openCreate() {
  Object.assign(form, { code: '', brand: '', name: '', email: '' })
  formError.value = ''
  showDialog({ kind: 'create', title: '新增管理者／租戶' })
}

function addTenant() {
  const code = form.code.trim().toUpperCase()
  const brand = form.brand.trim()
  const name = form.name.trim()
  const email = form.email.trim()
  if (![code, brand, name, email].every(Boolean)) {
    formError.value = '請填寫所有欄位。'
    return
  }
  if (tenantRows.value.some(row => row.code === code)) {
    formError.value = '此品牌代號已存在，請使用其他代號。'
    return
  }
  tenantRows.value.unshift({ code, name: brand, manager: name, email, accounts: 1, roles: [0, 20], streams: [0, 100], rental: '待生效', expires: '', ai: '待人工開通', enabled: true })
  accountRows.value.unshift({ code, name, email, brand, enabled: true })
  switchTab('tenants')
  clearFilters()
  notice.value = `已新增 ${brand}`
  dialog.value.close()
}

function toggleAccess(row) {
  row.enabled = !row.enabled
  notice.value = `${row.name}的使用權限已${row.enabled ? '啟用' : '停用'}`
}
</script>

<template>
  <div class="virtual-app">
    <header class="virtual-header flex items-center justify-between gap-3">
      <div class="virtual-brand flex min-w-0 items-center gap-4">
        <img :src="`${baseURL}eip/logo.png`" alt="中華電信" width="176" height="50">
        <span>虛擬人平台</span>
      </div>
      <div class="virtual-profile flex items-center gap-2">
        <span class="virtual-avatar"><PortalIcon name="users" /></span>
        <span>林子安</span>
      </div>
    </header>

    <div class="virtual-shell">
      <nav class="virtual-sidebar" aria-label="主選單">
        <button v-for="(item, index) in navigation" :key="item.label" type="button" class="virtual-nav-item flex items-center gap-3"
          :aria-current="index === 0 ? 'page' : undefined"
          @click="index && showDialog({ kind: 'info', title: item.label, message: '此區域目前僅展示導覽入口。' })">
          <PortalIcon :name="item.icon" />
          {{ item.label }}
        </button>
      </nav>

      <main class="virtual-main">
        <div class="virtual-heading flex flex-wrap items-center justify-between gap-4">
          <h1>租戶／帳號管理</h1>
          <button type="button" class="virtual-primary" @click="openCreate"><span aria-hidden="true">＋</span>新增管理者／租戶</button>
        </div>

        <div class="virtual-tabs flex" role="tablist" aria-label="管理類型">
          <button v-for="(tab, index) in tabs" :id="`virtual-tab-${tab.id}`" :key="tab.id" type="button"
            role="tab" :aria-selected="activeTab === tab.id" :tabindex="activeTab === tab.id ? 0 : -1"
            aria-controls="virtual-panel" @click="switchTab(tab.id)" @keydown="navigateTabs($event, index)">
            {{ tab.label }}
          </button>
        </div>

        <section id="virtual-panel" class="virtual-panel" role="tabpanel" :aria-labelledby="`virtual-tab-${activeTab}`">
          <div class="virtual-tools">
            <div class="virtual-toolbar flex flex-wrap items-center justify-between gap-4">
              <h2 class="flex items-center gap-2.5"><span class="virtual-filter-icon" aria-hidden="true"><i></i><i></i><i></i></span>{{ isTenant ? '篩選' : '查詢' }}</h2>
              <form class="virtual-search flex" role="search" @submit.prevent="search">
                <label for="virtual-search" class="sr-only">{{ isTenant ? '搜尋品牌代號、品牌名稱' : '搜尋姓名、電子信箱' }}</label>
                <input id="virtual-search" v-model="draftQuery" type="search"
                  :placeholder="isTenant ? '搜尋品牌代號、品牌名稱' : '搜尋姓名、電子信箱'"
                  @search="search">
                <button type="submit" class="virtual-primary" aria-label="搜尋"><PortalIcon name="search" /></button>
              </form>
            </div>
            <div v-if="isTenant" class="virtual-filters">
              <label v-for="filter in filters" :key="filter.key">
                <span>{{ filter.label }}</span>
                <select v-model="selected[filter.key]">
                  <option value="">全部</option>
                  <option v-for="option in filter.options" :key="option">{{ option }}</option>
                </select>
              </label>
            </div>
          </div>

          <div class="virtual-table-scroll" tabindex="0" role="region" :aria-label="isTenant ? '品牌租戶表格' : '使用者帳號表格'">
            <table :class="{ 'virtual-tenant-table': isTenant }">
              <thead>
                <tr>
                  <th v-for="column in columns" :key="column.key" scope="col" :class="{ 'virtual-number': column.numeric }"
                    :aria-sort="column.sortable ? (sortKey === column.key ? (ascending ? 'ascending' : 'descending') : 'none') : undefined">
                    <button v-if="column.sortable" type="button" class="virtual-sort" @click="sortBy(column.key)">
                      {{ column.label }} <span aria-hidden="true">{{ sortKey === column.key ? (ascending ? '↑' : '↓') : '↕' }}</span>
                    </button>
                    <template v-else>{{ column.label }}</template>
                  </th>
                  <th scope="col">
                    <div class="flex items-center gap-1.5">使用權限
                      <button class="virtual-info" type="button" aria-label="使用權限說明"
                        @click="showDialog({ kind: 'info', title: '使用權限', message: '使用開關可啟用或停用這筆示範資料的使用權限。' })">i</button>
                    </div>
                  </th>
                  <th scope="col"><span class="sr-only">操作</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in visibleRows" :key="row.code">
                  <template v-if="isTenant">
                    <td class="virtual-code">{{ row.code }}</td>
                    <th scope="row">{{ row.name }}</th>
                    <td>{{ row.manager }}</td>
                    <td class="virtual-email">{{ row.email }}</td>
                    <td class="virtual-number">{{ row.accounts }}</td>
                    <td class="virtual-number"><VirtualQuota :value="row.roles" /></td>
                    <td class="virtual-number"><VirtualQuota :value="row.streams" /></td>
                    <td><span class="virtual-badge" :data-tone="rentalTone[row.rental]">{{ row.rental }}</span></td>
                    <td><span>{{ row.expires || '—' }}</span><span v-if="row.expiryWarning" class="virtual-warning">即將逾期</span></td>
                    <td><span class="virtual-ai" :data-tone="aiTone[row.ai]">{{ row.ai }}</span></td>
                  </template>
                  <template v-else>
                    <th scope="row">{{ row.name }}</th>
                    <td class="virtual-email">{{ row.email }}</td>
                    <td>{{ row.brand }}</td>
                    <td class="virtual-code">{{ row.code }}</td>
                  </template>
                  <td>
                    <button type="button" class="virtual-switch" role="switch" :aria-checked="row.enabled"
                      :aria-label="`${row.name}的使用權限`" @click="toggleAccess(row)"><span aria-hidden="true"></span></button>
                  </td>
                  <td>
                    <button type="button" class="virtual-more" :aria-label="`查看${row.name}詳細資料`"
                      @click="showDialog({ kind: 'detail', title: row.name, row, tenant: isTenant })">⋮</button>
                  </td>
                </tr>
                <tr v-if="!visibleRows.length">
                  <td :colspan="columns.length + 2" class="virtual-empty">
                    <p>找不到符合條件的資料</p>
                    <button type="button" class="virtual-secondary" @click="clearFilters">清除查詢條件</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <footer class="virtual-pagination flex flex-wrap items-center justify-between gap-3">
            <nav class="flex items-center gap-1" aria-label="表格分頁">
              <button type="button" :disabled="page === 1" aria-label="上一頁" @click="page--">‹</button>
              <span aria-current="page" :aria-label="`第 ${page} 頁`">{{ page }}</span>
              <button type="button" :disabled="page >= pageCount" aria-label="下一頁" @click="page++">›</button>
            </nav>
            <span role="status">共 {{ matchingRows.length }} 筆</span>
          </footer>
        </section>
      </main>
    </div>

    <p role="status" class="sr-only">{{ notice }}</p>
    <dialog ref="dialog" class="virtual-dialog" aria-labelledby="virtual-dialog-title">
      <div v-if="dialogState">
        <h2 id="virtual-dialog-title">{{ dialogState.title }}</h2>
        <form v-if="dialogState.kind === 'create'" class="virtual-dialog-form" @submit.prevent="addTenant">
          <label>品牌代號<input v-model="form.code" required maxlength="16" autofocus></label>
          <label>品牌名稱<input v-model="form.brand" required maxlength="60"></label>
          <label>管理者姓名<input v-model="form.name" required maxlength="60"></label>
          <label>電子信箱<input v-model="form.email" type="email" required maxlength="100"></label>
          <p v-if="formError" role="alert" class="virtual-warning">{{ formError }}</p>
          <div class="virtual-dialog-actions">
            <button type="button" class="virtual-secondary" @click="dialog.close()">取消</button>
            <button type="submit" class="virtual-primary">新增</button>
          </div>
        </form>
        <template v-else>
          <dl v-if="dialogState.kind === 'detail'" class="virtual-details">
            <div><dt>品牌代號</dt><dd>{{ dialogState.row.code }}</dd></div>
            <div v-if="dialogState.tenant"><dt>品牌管理者</dt><dd>{{ dialogState.row.manager }}</dd></div>
            <div v-else><dt>品牌名稱</dt><dd>{{ dialogState.row.brand }}</dd></div>
            <div><dt>電子信箱</dt><dd>{{ dialogState.row.email }}</dd></div>
            <div><dt>使用權限</dt><dd>{{ dialogState.row.enabled ? '啟用' : '停用' }}</dd></div>
          </dl>
          <p v-else>{{ dialogState.message }}</p>
          <div class="virtual-dialog-actions">
            <button type="button" class="virtual-primary" autofocus @click="dialog.close()">關閉</button>
          </div>
        </template>
      </div>
    </dialog>
  </div>
</template>
