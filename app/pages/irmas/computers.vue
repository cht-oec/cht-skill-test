<script setup>
import { demoComputer, userPath } from '~/data/demo'
import { downloadCsv } from '~/utils/downloadCsv'

definePageMeta({ layout: 'legacy' })
useHead({ title: '個人電腦列表 | IRMAS' })

const actions = [
  '變更場域',
  '申請安全查核項目豁免',
  '刪除安全查核項目豁免',
  '申請Java授權豁免',
  '刪除Java授權豁免',
  '申請軟體EOS豁免',
  '匯出資安檢核表',
  '遠端移除Agent',
]

const dialog = ref(null)
const dialogTitle = ref('')
const dialogMessage = ref('')

function showDetails(title, message) {
  dialogTitle.value = title
  dialogMessage.value = message
  dialog.value.open()
}

function handleAction(action) {
  if (action === '匯出資安檢核表') {
    downloadCsv('資安檢核表.csv', [
      ['資產ID', '電腦名稱', 'IP位址', '作業系統', 'Agent版本'],
      [demoComputer.assetId, demoComputer.name, demoComputer.ip, demoComputer.operatingSystem, demoComputer.agentVersion],
    ])
    return
  }

  showDetails(action, `模擬操作對象為 ${demoComputer.name}（${demoComputer.assetId}）。目前為介面展示。`)
}
</script>

<template>
  <section class="legacy-table-area">
    <table class="legacy-table legacy-computers" aria-labelledby="computers-heading">
      <colgroup>
        <col v-for="(width, index) in [126, 212, 149, 162, 126, 196, 199]" :key="index" :style="{ width: `${width}px` }">
      </colgroup>
      <thead>
        <tr>
          <th id="computers-heading" colspan="7" class="legacy-table-title">個人電腦列表（{{ userPath }}）</th>
        </tr>
        <tr class="legacy-column-head legacy-computer-head">
          <th scope="col">IP位址</th>
          <th scope="col">電腦名稱</th>
          <th scope="col">資產ID</th>
          <th scope="col">
            <span class="block">作業系統</span>
            <span class="mt-4 block">(場域名稱)</span>
          </th>
          <th scope="col">Agent版本</th>
          <th scope="col">更新時間</th>
          <th scope="col" aria-label="操作"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="legacy-computer-row">
          <td>
            <button type="button" class="cursor-pointer text-[#0000ff]" @click="showDetails('電腦資料', `${demoComputer.ip}　${demoComputer.name}　${demoComputer.assetId}`)">{{ demoComputer.ip }}</button>
          </td>
          <td>{{ demoComputer.name }}</td>
          <td>{{ demoComputer.assetId }}</td>
          <td>
            <span class="block">{{ demoComputer.operatingSystem }}</span>
            <span class="mt-4 ml-2 block">{{ demoComputer.location }}</span>
          </td>
          <td>{{ demoComputer.agentVersion }}</td>
          <td>{{ demoComputer.updatedAt }}</td>
          <td class="legacy-actions">
            <div class="flex flex-col items-start gap-4">
              <button v-for="action in actions" :key="action" type="button" class="legacy-button" @click="handleAction(action)">{{ action }}</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <LegacyDialog ref="dialog">
      <template #title>{{ dialogTitle }}</template>
      <p>{{ dialogMessage }}</p>
    </LegacyDialog>
  </section>
</template>
