import { dashboardColumns, demoName, initialEvents, initialTasks } from './demo.js'

export function usePortal() {
  return useState('eip-demo', () => ({
    appearanceRevision: 2,
    settings: { name: demoName, font: '標準', theme: false, favorites: true },
    groups: [{ name: '預設', items: ['人力資源HRM', 'ODAS公文', '電子表單eForm', 'LDAP查詢', '電子採購ePIS'] }],
    group: '預設',
    shortcuts: ['文件協作園地'],
    tasks: initialTasks.map(task => ({ ...task })),
    events: initialEvents.map(event => ({ ...event })),
    layout: dashboardColumns.map(column => [...column]),
  }))
}

export function usePortalDialog() {
  const request = useState('eip-dialog', () => null)
  const show = (title, body, kind = 'message', data = null) => { request.value = { title, body, kind, data } }
  return { request, show }
}
