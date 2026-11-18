<script setup>
import PortalIcon from './PortalIcon.vue'
import PortalDialog from './PortalDialog.vue'
import { usePortal, usePortalDialog } from '~/features/eip/version/v2/state'
import { apps, directoryPeople, features, navItems, news, systemCategories } from '~/features/eip/version/v2/demo'

defineProps({ optimized: Boolean })

const portal = usePortal()
const { baseURL } = useRuntimeConfig().app
const { show } = usePortalDialog()
const menu = ref('')
const sidebar = ref(false)
const query = ref('')
const mode = ref('關鍵字搜尋')

function toggle(name) {
  menu.value = menu.value === name ? '' : name
}

function launch(title, body = '', kind = 'message', data = null) {
  menu.value = ''
  show(title, body, kind, data)
}

function navigate(label) {
  sidebar.value = false
  if (label === '首頁') {
    window.scrollTo({ top: 0 })
    return
  }
  if (label === '行事曆') return launch('我的行事曆', '', 'calendar')
  if (label === '待辦事項') return document.getElementById('needCheck')?.scrollIntoView({ block: 'center' })
  if (label === 'e化系統') return document.getElementById('esystemBoard')?.scrollIntoView({ block: 'center' })
  if (label === '員工目錄查詢') return launch(label, '', 'directory')
  launch(label, '此入口在正式 EIP 會開啟相關系統。')
}

function search() {
  const keyword = query.value.trim().toLocaleLowerCase()
  if (!keyword) return
  const labels = [...new Set([
    ...Object.values(features).flat(), ...Object.values(news).flat(),
    ...apps.map(app => app[1]), ...systemCategories, ...directoryPeople.map(person => person[0]),
  ])]
  const matches = labels.filter(label => {
    const text = label.toLocaleLowerCase()
    return mode.value === '語意搜尋' ? keyword.split(/\s+/).every(term => text.includes(term)) : text.includes(keyword)
  })
  launch('查詢結果', query.value.trim(), 'results', matches)
}
</script>

<template>
  <div class="eip-version-v2" :class="{ 'eip-version-v2-optimized': optimized, 'eip-version-v2-plain': !portal.settings.theme, 'eip-version-v2-collapsed': sidebar, 'eip-version-v2-large': portal.settings.font === '大' }" @click="menu = ''" @keydown.esc="menu = ''">
    <header class="topbar">
      <a href="#top" class="top-brand" aria-label="中華電信首頁"><img :src="`${baseURL}eip/${portal.settings.theme && !optimized ? 'logo_s.png' : 'logo.png'}`" alt="中華電信"></a>
      <button class="mobile-nav" type="button" aria-label="切換主選單" @click.stop="sidebar = !sidebar"><PortalIcon name="menu" /></button>
      <div class="top-controls">
        <div class="pop-wrap">
          <button type="button" class="avatar-trigger" aria-label="我的設定" :aria-expanded="menu === 'profile'" @click.stop="toggle('profile')">
            <img :src="`${baseURL}eip/avatar_men.jpg`" alt=""><span aria-hidden="true">▾</span>
          </button>
          <div v-if="menu === 'profile'" class="dropdown" @click.stop>
            <button type="button" @click="launch('我的個人設定', '', 'profile')">我的個人設定</button>
            <button type="button" @click="launch('我的行事曆', '', 'calendar')">我的行事曆</button>
            <button type="button" @click="launch('我的訊息', '目前沒有新的示範訊息。')">我的訊息</button>
          </div>
        </div>
        <button type="button" aria-label="我的Email" @click.stop="launch('我的Email', '目前沒有新的示範郵件。')"><PortalIcon name="mail" /></button>
        <button type="button" aria-label="訊息通知" @click.stop="launch('訊息通知', '目前沒有新的示範通知。')"><PortalIcon name="bell" /></button>
        <button type="button" aria-label="網站導覽" @click.stop="launch('網站導覽', '', 'sitemap')"><PortalIcon name="sitemap" /></button>
        <button type="button" @click.stop="launch('登出', '結束這次本機展示？', 'logout')">登出</button>
      </div>
    </header>

    <aside class="portal-sidebar" aria-label="主選單">
      <div class="portal-profile">
        <button type="button" class="profile-button" @click.stop="launch('我的個人設定', '', 'profile')">
          <img :src="`${baseURL}eip/avatar_men.jpg`" alt=""><span><small>早安</small>{{ portal.settings.name }}</span>
        </button>
        <button type="button" class="collapse-sidebar" aria-label="收合或展開主選單" @click.stop="sidebar = !sidebar"><PortalIcon name="menu" /></button>
      </div>
      <nav>
        <button v-for="[icon, label] in navItems" :key="label" type="button" :title="label" :class="{ active: label === '首頁' }" @click="navigate(label)">
          <PortalIcon :name="icon" /><span>{{ label }}</span><span class="nav-arrow" aria-hidden="true">{{ label === '首頁' ? '⌄' : '›' }}</span>
        </button>
      </nav>
    </aside>

    <main id="top" class="portal-main">
      <div class="page-toolbar">
        <h1>首頁</h1>
        <div class="page-tools">
          <NuxtLink v-if="optimized" to="/eip" class="eip-original-link">原版介面</NuxtLink>
          <div class="pop-wrap">
            <button type="button" :class="{ selected: menu === 'shortcuts' }" :aria-expanded="menu === 'shortcuts'" @click.stop="toggle('shortcuts')"><PortalIcon name="star" /> 我的捷徑</button>
            <div v-if="menu === 'shortcuts'" class="dropdown" @click.stop>
              <button v-for="shortcut in portal.shortcuts" :key="shortcut" type="button" @click="launch(shortcut, '這是本機示範捷徑。')">{{ shortcut }} ›</button>
              <button type="button" @click="launch('新增捷徑', '', 'shortcut')">⊕ 新增</button>
            </div>
          </div>
          <div class="pop-wrap">
            <button type="button" :class="{ selected: menu === 'add' }" :aria-expanded="menu === 'add'" @click.stop="toggle('add')"><PortalIcon name="add" /> 新增事項</button>
            <div v-if="menu === 'add'" class="dropdown" @click.stop>
              <button type="button" @click="launch('我的行事曆', '', 'calendar')"><PortalIcon name="calendar" /> 展開行事曆</button>
            </div>
          </div>
          <div class="pop-wrap">
            <button type="button" :class="{ selected: menu === 'search' }" :aria-expanded="menu === 'search'" @click.stop="toggle('search')"><PortalIcon name="search" /> 查詢</button>
            <form v-if="menu === 'search'" class="dropdown search-popover" @click.stop @submit.prevent="search">
              <div class="search-field"><input v-model="query" placeholder="Search" aria-label="查詢關鍵字" required><button type="submit" aria-label="送出查詢"><PortalIcon name="search" /></button></div>
              <div class="search-modes"><label><input v-model="mode" type="radio" value="關鍵字搜尋"> 關鍵字搜尋</label><label><input v-model="mode" type="radio" value="語意搜尋"> 語意搜尋</label></div>
            </form>
          </div>
          <button class="guide-button" type="button" @click.stop="launch('系統說明', '此首頁可切換資訊頁籤、查看示範待批事項、查詢及新增行事曆事件。變更只會儲存在目前瀏覽器。')"><PortalIcon name="book" /> 系統說明</button>
        </div>
      </div>
      <slot />
    </main>
    <PortalDialog />
  </div>
</template>
