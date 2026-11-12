<script setup>
import { departmentPath, reportColumns, servicePorts } from '~/data/demo'
import { downloadCsv } from '~/utils/downloadCsv'

definePageMeta({ layout: 'legacy' })
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
  <section class="legacy-table-area">
    <table class="legacy-table legacy-report" aria-labelledby="report-heading">
      <colgroup>
        <col style="width: 190px">
        <col v-for="column in reportColumns" :key="column.label" :style="{ width: `${column.width}px` }">
        <col style="width: 48px">
      </colgroup>
      <thead>
        <tr>
          <th id="report-heading" colspan="11" class="legacy-table-title">特定服務連接埠號</th>
        </tr>
        <tr>
          <td colspan="11" class="legacy-legend">
            <ul class="list-inside list-disc">
              <li v-for="[service, ports] in servicePorts" :key="service">{{ service }} 服務埠號({{ ports }})</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td colspan="11" class="legacy-export">
            <button type="button" class="legacy-button" @click="exportReport">匯出Excel</button>
          </td>
        </tr>
        <tr class="legacy-column-head legacy-report-head">
          <th scope="col">部門名稱</th>
          <th v-for="column in reportColumns" :key="column.label" scope="col" :aria-label="column.label">
            {{ column.lines[0] }}<br>{{ column.lines[1] }}
          </th>
          <th scope="col" class="legacy-endpoint-count">終端<br>數量</th>
        </tr>
      </thead>
      <tbody>
        <tr class="legacy-report-row">
          <td>{{ departmentPath }}</td>
          <td v-for="(count, index) in counts" :key="index" :class="{ 'legacy-endpoint-count': index === counts.length - 1 }">{{ count }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="legacy-column-head legacy-report-total">
          <th scope="row">總計</th>
          <td v-for="(count, index) in counts" :key="index" :class="{ 'legacy-endpoint-count': index === counts.length - 1 }">{{ count }}</td>
        </tr>
      </tfoot>
    </table>
  </section>
</template>
