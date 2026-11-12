export const demoUser = {
  division: '數位服務分公司',
  department: '平台應用處',
  team: '介面開發科',
  name: '林子安',
}

export const userPath = `/${demoUser.division}/${demoUser.department}/${demoUser.team}/${demoUser.name}`
export const departmentPath = `/${demoUser.team}/${demoUser.department}/${demoUser.division}`

export const demoComputer = {
  ip: '192.0.2.34',
  name: 'Demo的MacBook Pro',
  assetId: 'PCDEMO001342',
  operatingSystem: 'macOS 15.4.1',
  location: '一般辦公室終端',
  agentVersion: '3.0.0-10000',
  updatedAt: '2025-06-18 09:42:30',
}

export const servicePorts = [
  ['FTP', '21'],
  ['TFTP', '69'],
  ['SSH', '22'],
  ['TELNET', '23'],
  ['WEB', '80,443,8005,8009,8080,8088'],
  ['DB', '523,1433,1521,3306'],
]

export const reportColumns = [
  { label: '有啟用遠端桌面', lines: ['有啟用遠', '端桌面'], width: 76 },
  { label: '有開啟網路芳鄰', lines: ['有開啟網', '路芳鄰'], width: 77 },
  { label: '有啟用VNC軟體', lines: ['有啟用VNC', '軟體'], width: 84 },
  { label: '有開啟 FTP 服務埠號', lines: ['有開啟 FTP 服', '務埠號'], width: 104 },
  { label: '有開啟 TFTP 服務埠號', lines: ['有開啟 TFTP 服', '務埠號'], width: 114 },
  { label: '有開啟 SSH 服務埠號', lines: ['有開啟 SSH 服', '務埠號'], width: 107 },
  { label: '有開啟 TELNET 服務埠號', lines: ['有開啟 TELNET 服', '務埠號'], width: 134 },
  { label: '有開啟 WEB 服務埠號', lines: ['有開啟 WEB 服', '務埠號'], width: 113 },
  { label: '有開啟 DB 服務埠號', lines: ['有開啟 DB 服', '務埠號'], width: 98 },
]
