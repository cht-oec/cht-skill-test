# IRMAS、EIP 與虛擬人平台介面展示

Nuxt 4、Vue 3、Tailwind CSS 4。頁面依 IRMAS 與 EIP 分組，Skill 優化版位於各自的 `bySkill` 目錄。

這是使用假資料的介面展示。頁面中的操作使用瀏覽器的本機資料。

## 啟動

```powershell
Set-Location -LiteralPath (Join-Path ([Environment]::GetFolderPath('DesktopDirectory')) 'cht-skill-test')
npm.cmd ci
npm.cmd run dev
```

開啟終端機顯示的 `Local` 網址。若 3000 埠已被使用，Nuxt 會選擇其他可用埠。

| 畫面 | 原版 | Skill 優化版 |
| --- | --- | --- |
| MyIRMAS 首頁 | `/irmas` | `/irmas/bySkill` |
| 個人電腦列表 | `/irmas/computers` | `/irmas/bySkill/computers` |
| 特定服務連接埠號 | `/irmas/reports/service-ports` | `/irmas/bySkill/reports/service-ports` |
| EIP 首頁 | `/eip` | `/eip/bySkill` |

EIP 首頁的官網風格對照版位於 `/eip/bySkill/v2`，暖橘色主題位於 `/eip/bySkill/v3`。

虛擬人平台的租戶／帳號管理展示在 `/virtual`，依提供的 wireframe 套用 Skill。篩選、搜尋、排序、新增與權限開關都使用示範資料，重新整理會重設。

開啟 `/` 會前往 IRMAS 首頁，先前的頁面網址也會導向搬移後的位置。

人員、部門與設備資料集中在 `app/data/demo.js`。表格和導覽使用 Vue 元件，頁首與背景採用截圖中無敏感資料的裝飾素材。版面以 1726 × 962 CSS px 的桌面視窗比對，窄視窗可水平捲動。未提供畫面參照的按鈕開啟展示說明，兩個匯出按鈕下載 Excel 可開啟的 UTF-8 CSV。

## GitHub Pages

在 GitHub 的 Settings → Pages，將 Source 設為 GitHub Actions。`main` 分支每次推送後會自動建置並發布。部署設定會讀取 Pages 網站的路徑，讓頁面和圖片都能從 repo 子目錄載入。

Skill 的操作方式與兩版的設計差異記錄在 [Skill 使用指南](SKILL-GUIDE.md)。
