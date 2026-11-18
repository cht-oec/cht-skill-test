# EIP V1 設計與驗證紀錄

僅適用 `/eip/version/v1`。V2、V3 各自以 `/eip` 為原型，不沿用本版的設計決策或額外參考來源。

## 原型與來源

- 原型為 `app/pages/eip/index.vue` 與 `app/components/eip/`，未參考 `bySkill` 的任何版本或外部網站。
- 使用 `.agents/skills/chtit-uxui-guidance/SKILL.md`，版本 `0.2.0-poc.5`、catalog `2026-11-17.1`；任務為 `layout,form,data-management,logo,quality`。
- 企業識別來源為 `CHT-CIS-20220622`（2022-06-22）。企業藍 `#215DA0` 對應 PDF p.21／01.12；本機黑體及 Arial fallback 對應 p.22–23／01.13–01.14。保留 `public/eip/logo.png`、`logo_s.png` 的既有圖文、色彩與比例，未重製簽署；相關規則為 p.26／02.1、p.32／02.7。原始手冊雜湊已通過 resolver 核對。

## 本版設定

| 範圍 | 實作與設定 |
| --- | --- |
| 頁面 | `app/pages/eip/version/v1.vue`，停用其他 Nuxt layout |
| 元件 | `app/components/eip/version/v1/`；自原版複製並保留 DOM、文字、事件及操作順序 |
| 資料／狀態 | `app/features/eip/version/v1/`；初始資料與原版一致，Nuxt state keys 為 `eip-version-v1`、`eip-version-v1-dialog` |
| 本機儲存 | `eip-version-v1-demo`，不讀寫舊版的 `eip-replica-demo-v1` |
| 樣式 | `app/assets/css/eip-version-v1.css`，所有選擇器以 `.eip-version-v1` 為範圍 |
| 頁首／側欄 | 保留 fixed 定位。一般字級時頁首 72px、側欄 224px，使用 rem 隨文字縮放；收合側欄為 72px。內容水平內距 32px |
| 響應式 | 沿用 1199px、760px breakpoint；桌面三欄、中寬兩欄與次層兩欄、手機單欄，保留原手機選單操作 |
| 文字與間距 | 一般內文 16px、行高 1.5，主標題 1.75em。區塊間距 24px、卡片主要內距 16px |
| 控制項 | 一般文字按鈕及單行輸入最小高度 44px、圓角 4px。主按鈕 hover `#1E5693`、pressed `#1D528D`；輸入框線 `#6B7280`；focus-visible 為 2px outline、2px offset |

以上間距、控制項與狀態值為 Web implementation defaults，不是企業識別手冊的印刷尺寸。小型圖示操作、日期格及頁籤依各自用途保留密度，不將文字按鈕規格強套全部元素。

## 元件處理

- **已調整**：頁首／側欄、標題及工具列、常用功能、頁籤、新聞與待批列表、系統入口、行事曆、分類按鈕、浮動選單及 dialog／表單的外觀與響應式。
- **沿用**：正式圖片及圖示、全部原文與示範資料、頁籤／群組切換、收合、查詢、鍵盤及拖曳排列、儲存流程、原生 dialog、表單驗證、節慶佈景與大字設定。
- **受限制而保留**：日期、時間、select 的平台彈出控制項由瀏覽器提供；已調整可控制的輸入框、標籤、間距及焦點，未替換原生控制項。
- **另列建議**：原有表單錯誤訊息尚無逐欄 `aria-describedby` 關聯。本次保留驗證及 DOM，不擴大變更流程。原生 modal 的焦點起點與行為也維持原狀。

## 實際檢查

- 初始畫面所有文字與舊版逐一比對一致，六個元件除版本隔離外的模板及事件程式一致；示範資料比對一致。
- 程式層驗證 V1 的設定、待批資料、版面與 dialog 不會修改舊版狀態；同版元件可共用 V1 狀態。
- Chrome 桌面與 320px 窄版檢查；窄版無水平溢出，手機選單、查詢 popover 及可捲動表單正常。
- 200% **文字**縮放：暫時將 V1 所在頁的根字級設為 32px，確認文字與側欄放大、內容重排，無水平溢出且頁首不遮住內容；測試規則已移除。此項不是只縮小 viewport 代替文字放大。
- 已實測資訊頁籤、常用功能收合及編輯、查詢命中及空結果、待批 dialog、事件結束時間錯誤、鍵盤 Alt＋方向鍵排列及取消、側欄收合、大字／節慶佈景切換；設定已還原。
- 已確認鍵盤焦點為 2px 品牌藍外框、2px offset。主要文字／背景實際對比：主按鈕及行事曆 6.69:1、常用功能 6.40:1、日期輔助文字 5.92:1、待批分類 5.99:1、紅色數量標記 6.57:1；這些抽樣不代表完整 WCAG 認證。
- `npm.cmd run build`、`npm.cmd run build -- --preset github_pages` 與 `git diff --check` 均通過；確認三個版本的靜態 HTML 已產生，V2、V3 的 main 保持空白。Chrome 檢查未發現 console error／warning。
- 未新增 loading、權限、API 或正式系統介接；既有示範保留示範性質。未逐項實測全部系統入口，未做跨瀏覽器或輔助科技完整驗收。

V2、V3 保持空白獨立頁面。三個版本路由均加入 prerender，供既有 GitHub Pages 建置使用。
