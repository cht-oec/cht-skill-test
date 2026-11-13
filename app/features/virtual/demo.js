export const tenants = [
  { code: 'V001', name: '晨光數位', manager: '林子安', email: 'zi-an@example.com', accounts: 2, roles: [1, 30], streams: [25, 300], rental: '租用中', expires: '2027/12/31', ai: '已開通', enabled: true },
  { code: 'V002', name: '遠景互動科技', manager: '陳予晴', email: 'yu-qing@example.com', accounts: 2, roles: [14, 15], streams: [200, 200], rental: '租用中', expires: '2026/11/30', expiryWarning: true, ai: '已開通', enabled: true },
  { code: 'V003', name: '青禾創意工作室', manager: '黃柏言', email: 'bo-yan@example.com', accounts: 10, roles: [0, 20], streams: [0, 100], rental: '待生效', expires: '', ai: '系統開通中', enabled: true },
  { code: 'V004', name: '海嶼文化', manager: '周品妍', email: 'pin-yan@example.com', accounts: 8, roles: [0, 20], streams: [0, 100], rental: '待生效', expires: '', ai: '待人工開通', enabled: true },
  { code: 'V005', name: '星橋影像', manager: '吳以辰', email: 'yi-chen@example.com', accounts: 2, roles: [1, 10], streams: [1, 100], rental: '已逾期', expires: '2025/12/31', ai: '已關閉', enabled: false },
  { code: 'V006', name: '木石設計', manager: '許書妍', email: 'shu-yan@example.com', accounts: 15, roles: [1, 20], streams: [1, 200], rental: '已停用', expires: '2027/12/31', ai: '已關閉', enabled: false },
]

export const accounts = tenants.map(tenant => ({
  code: tenant.code,
  name: tenant.manager,
  email: tenant.email,
  brand: tenant.name,
  enabled: tenant.enabled,
}))

const quotaOptions = ['使用正常', '即將用盡', '已達上限']

export const filters = [
  { key: 'roles', label: '角色使用', options: quotaOptions },
  { key: 'streams', label: '串流使用', options: quotaOptions },
  { key: 'rental', label: '租用狀態', options: ['租用中', '待生效', '已逾期', '已停用'] },
  { key: 'ai', label: 'AI 資源', options: ['已開通', '系統開通中', '待人工開通', '已關閉'] },
]

export const aiTone = { 已開通: 'success', 系統開通中: 'warning', 待人工開通: 'attention', 已關閉: 'muted' }
export const rentalTone = { 租用中: 'success', 待生效: 'pending', 已逾期: 'warning', 已停用: 'muted' }

export function quotaStatus([used, limit]) {
  if (used >= limit) return '已達上限'
  if (used / limit >= 0.9) return '即將用盡'
  return '使用正常'
}
