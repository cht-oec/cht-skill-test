<script setup>
import { departmentPath, reportColumns, servicePorts } from '~/data/demo'
import { downloadCsv } from '~/utils/downloadCsv'

definePageMeta({ layout: 'optimized', legacyPath: '/irmas/reports/service-ports' })
useHead({ title: '特定服務連接埠號 | IRMAS' })

const counts = Array(reportColumns.length + 1).fill(0)

function exportReport() {
  downloadCsv('特定服務連接埠號.csv', [
    ['部門名稱', ...reportColumns.map(column => column.label), '終端數量'],
    [departmentPath, ...counts],
    ['總計', ...counts],
  ])
}
</script>

<template>
  <section aria-labelledby="optimized-report-title">
    <header class="optimized-page-heading">
      <h1 id="optimized-report-title">特定服務連接埠號</h1>
    </header>

    <div class="optimized-panel">
      <div class="optimized-report-summary">
        <h2 class="optimized-section-label">服務埠號</h2>
        <dl class="optimized-port-grid grid gap-x-4 gap-y-3">
          <div v-for="[service, ports] in servicePorts" :key="service">
            <dt class="font-bold">{{ service }}</dt>
            <dd class="optimized-muted tabular-nums">{{ ports.replaceAll(',', '、') }}</dd>
          </div>
        </dl>
      </div>

      <div class="optimized-report-toolbar flex flex-wrap items-center justify-between gap-3">
        <h2 id="optimized-report-table-title" class="optimized-section-label">部門統計</h2>
        <button type="button" class="optimized-button optimized-primary-button" @click="exportReport">匯出Excel</button>
      </div>
      <p id="optimized-report-scroll" class="optimized-scroll-hint">左右捲動可查看完整欄位。</p>

      <div class="optimized-table-scroll" role="region" aria-labelledby="optimized-report-table-title" aria-describedby="optimized-report-scroll" tabindex="0">
        <table class="optimized-table optimized-report" aria-labelledby="optimized-report-table-title">
          <thead>
            <tr>
              <th scope="col">部門名稱</th>
              <th v-for="column in reportColumns" :key="column.label" scope="col">{{ column.label }}</th>
              <th scope="col">終端數量</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{{ departmentPath }}</th>
              <td v-for="(count, index) in counts" :key="index">{{ count }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">總計</th>
              <td v-for="(count, index) in counts" :key="index">{{ count }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </section>
</template>
