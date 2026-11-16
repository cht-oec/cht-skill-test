# IRMAS 的 Codex Skill 使用指南

## 虛擬人平台

`/virtual` 依 wireframe 實作租戶／帳號管理。使用 `chtit-uxui-guidance` `0.2.0-poc.2`、catalog `2026-11-10.1`，查詢 `layout,form,data-management,logo,quality`。企業識別手冊為 `CHT-CIS-20220622`，SHA-256 `9c99b2ba99e63f49b444654175f7208c35b488b70aa28019b894207fcd2fc064` 已由 resolver 核對。主色依 PDF p.21／01.12，字體依 p.22–23／01.13–01.14。頁首沿用專案既有的 EIP 彩色標誌圖片，保留原圖比例。Wireframe 的黑色雙語簽署未作重繪。

| 元件 | 對應方式 |
| --- | --- |
| 主按鈕與焦點 | `brand.primary`、`ui.action.primary.hover`、`ui.action.primary.pressed` 對應 `#215DA0`、`#1E5693`、`#1D528D`。鍵盤焦點使用 2px 外框和 2px 間距。 |
| 篩選與表單 | 單行控制項最小高度 44px，輸入框水平內距 12px，邊框 `#6B7280`。 |
| 表格 | 右對齊用量和數量。租用狀態與 AI 資源用文字和色彩一起標示。窄版保留全部欄位，表格可水平捲動。 |

新增、權限切換、搜尋、篩選、排序和分頁使用本次頁面內的假資料。公版資產管理和報表管理僅展示入口。重新整理會重設資料。

Chrome 已驗證 1920px 桌面版、320px 窄版與 200% 文字縮放，也實測搜尋與空資料、篩選、排序、權限開關、新增與重複代號驗證、分頁及鍵盤焦點。Nuxt 正式建置通過，GitHub Pages 建置已驗證路由與資源路徑。

## IRMAS 與 EIP

`chtit-uxui-guidance` 版本 `0.2.0-poc.2`，用於原版與優化版的實作對照，來源為 `UXUI-Test` 的 Git 提交 `179d098`。目前本機安裝為 `0.2.0-poc.4`（`17d7a10`），位置為 `.agents/skills/chtit-uxui-guidance/`，由 Codex 在這個專案讀取。下列使用方式適用於已安裝 Skill 的本機專案。公開 repo 收錄兩版的展示程式碼和設計紀錄。

## 在 Codex 呼叫 Skill

1. 在 Codex 開啟桌面的 `cht-skill-test` 資料夾，並在該專案開始新的對話。
2. 輸入 `$chtit-uxui-guidance` 選用技能。若技能選單沒有顯示，直接在提示詞指定 `.agents/skills/chtit-uxui-guidance/SKILL.md`。
3. 指定頁面、要改善的地方，以及本次要檢視或實作。Skill 會依目標選擇品牌、Web 版型、資料表格等適用規範。

先確認載入並檢視個人電腦列表

```text
請用 $chtit-uxui-guidance 檢視 /irmas/computers，先不要修改。
請回報實際載入的 SKILL.md 路徑、版本，以及最值得改善的三個地方。
```

要開始做對照版時，可以使用這段提示詞

```text
請用 $chtit-uxui-guidance 改善個人電腦列表的資訊層級、表格易讀性與窄版操作。
把優化版放在新的 /irmas/bySkill/computers 路由。
保留 /irmas/computers 作為原版對照，沿用目前的假資料、按鈕行為與匯出功能。
請驗證兩個路由，並說明套用的規範和改動。
```

## 本機查詢

在 `cht-skill-test` 的 PowerShell 使用 Node.js 22 或更新版本執行下列命令。第一行列出這個任務會用到的規則，第二行核對企業識別手冊檔案的 SHA-256，第三行執行套件的測試。

```powershell
node .agents/skills/chtit-uxui-guidance/scripts/resolve.mjs --task 'data-management,quality' --viewport mweb
node .agents/skills/chtit-uxui-guidance/scripts/resolve.mjs --task logo --verify-manual
node --test .agents/skills/chtit-uxui-guidance/scripts/resolve.test.mjs
```

更多情境可參考套件的 [安裝與使用手冊](.agents/skills/chtit-uxui-guidance/references/usage.md) 與 [任務參數](.agents/skills/chtit-uxui-guidance/references/selection.md)。


## IRMAS 新版實作紀錄

| 畫面 | 原版 | 新版 |
| --- | --- | --- |
| MyIRMAS | `/irmas` | `/irmas/bySkill` |
| 個人電腦列表 | `/irmas/computers` | `/irmas/bySkill/computers` |
| 特定服務連接埠號 | `/irmas/reports/service-ports` | `/irmas/bySkill/reports/service-ports` |

新版頁首的「原版介面」連到同一畫面的原版。新版使用 `app/layouts/optimized.vue`，樣式集中在 `app/assets/css/optimized.css`。假資料、原有展示對話框與 CSV 寫檔工具由兩版共用。

本次使用 `chtit-uxui-guidance` `0.2.0-poc.2`、catalog `2026-11-10.1`，任務為 `layout,data-management,quality`。採用品質準則、品牌核心、Web 實作基線、資料管理與品質檢查。企業識別來源是 `CHT-CIS-20220622` 的 2022-06-22 修訂版。PDF 第 21 頁（01.12）為標準藍，第 22、23 頁（01.13、01.14）為中英文字體。手冊 SHA-256 為 `9c99b2ba99e63f49b444654175f7208c35b488b70aa28019b894207fcd2fc064`，已由 resolver 核對。

| 元件或狀態 | 規範與套用方式 | 驗證結果 |
| --- | --- | --- |
| 一般文字與表格 | `ui.font.family` 使用 Helvetica、Arial 與本機中文字型，`ui.font.size` 為 1rem，`ui.lineHeight` 為 1.5。`ui.text`、`ui.surface` 與 `ui.border` 對應文字、底色與分隔線。 | Chrome 已核對桌面、320 CSS px 及 200% 文字縮放。表格保留所有欄位，橫向捲動限在表格區。 |
| 主按鈕 | `brand.primary`、`ui.action.primary.hover`、`ui.action.primary.pressed` 對應 `#215DA0`、`#1E5693`、`#1D528D`。最小高度 44px、內距 8px × 16px、1px 邊框、4px 圓角。 | Chrome computed style 三種狀態皆相符。白字對比依序為 6.69:1、7.48:1、7.94:1。 |
| 焦點 | `ui.focus.width` 與 `ui.focus.offset` 均為 2px，採標準藍外框。 | 鍵盤切換焦點、表格方向鍵捲動，以及 hover／pressed 搭配 focus-visible 均通過。標準藍在白底及淺色表頭的對比分別為 6.69:1 與 6.17:1。 |
| 文字與列操作 | IP 採文字按鈕，水平內距為 0，保留欄位對齊與 44px 最小高度。長操作文字可換行。 | 個人電腦列保留 8 個操作，驗證 IP 詳細資料、展示對話框關閉及資安檢核表下載。 |

驗證通過 `npm.cmd run build`、六個新舊路由、回原版連結、鍵盤焦點及兩份 CSV。資料為既有的靜態示範資料，載入、空資料、錯誤、停用與深色主題未在此示範提供。新版頁首以純文字顯示系統名稱；本次範圍是 Web 版型與資料表格。


## EIP 首頁優化紀錄

原版在 `/eip`，優化版在 `/eip/bySkill`。新版的「原版介面」可返回原版。兩版共用首頁元件、示範資料及瀏覽器儲存，版面順序與新增的事件可在兩版查看。

本次使用 `chtit-uxui-guidance` `0.2.0-poc.2` 與 catalog `2026-11-10.1`，採用版型、表單、資料管理及品質檢查。品牌基礎為 `CHT-CIS-20220622` 的 2022-06-22 修訂版。企業標準藍見 PDF 第 21 頁，字體見第 22、23 頁。原檔 SHA-256 為 `9c99b2ba99e63f49b444654175f7208c35b488b70aa28019b894207fcd2fc064`，已由 resolver 核對。

| 區域 | 套用方式 | 驗證 |
| --- | --- | --- |
| 導覽、卡片和行事曆 | `app/assets/css/eip-optimized.css` 以 `brand.primary`、`ui.surface`、`ui.text`、`ui.border` 整理配色。沿用 3 欄桌面版和窄版斷點。 | Chrome 核對原版和新版配色、320 CSS px 及 200% 文字縮放。 |
| 主操作與焦點 | `brand.primary`、`ui.action.primary.hover`、`ui.action.primary.pressed` 分別對應 `#215DA0`、`#1E5693`、`#1D528D`。一般主按鈕最小高度 44px、內距 8px × 16px、圓角 4px，焦點外框及偏移 2px。 | Chrome 核對三種顏色與 hover、pressed 搭配鍵盤焦點。白字對比依序為 6.69:1、7.48:1、7.94:1。行事曆白字按鈕使用白色焦點外框。 |
| 搜尋和表單 | `ui.input.paddingInline` 為 12px，垂直內距 8px，邊界使用 `#6B7280`。保留欄位、提交、驗證與錯誤訊息。 | 實測查詢、新增行事曆事件和輸入欄位的 computed style。 |
| 版面與資料 | 新舊路由使用同一組元件和瀏覽器儲存。 | 實測 Alt 加方向鍵移動、儲存版面與切回原版後讀取版面及事件。 |

`npm.cmd run build` 通過。這是靜態示範，正式系統登入、資料載入及停用狀態不適用。

## EIP 首頁 V2 實作紀錄

本機預覽路由為 `/eip/bySkill/v2`。使用 `chtit-uxui-guidance` `0.2.0-poc.4`、catalog `2026-11-16.1`，查詢 `layout,form,data-management,logo,quality`。已核對企業識別手冊 `CHT-CIS-20220622` 的 SHA-256 `9c99b2ba99e63f49b444654175f7208c35b488b70aa28019b894207fcd2fc064`。

以 1440px 瀏覽器檢視[中華電信官網「關於我們」](https://www.cht.com.tw/zh-tw/home/cht)的頁首、首屏、新聞與影片區。採用白色表面、淺灰內容背景、深灰標題、藍色行動連結、圓角及較寬的區塊留白。新聞標題依官網觀察採日期與標題分列，繼續沿用 EIP 文字及資料。頁首沿用本專案 `public/eip/logo.png` 的圖文組合與原色，識別依 PDF p.26／02.1；既有字型方向依 p.22–23／01.13–01.14。

| 採用面向 | 對應 |
| --- | --- |
| 色彩 | `--eip-background` 用官網新聞區的 `#F5F5F5`，`--eip-text` 用 `#333`，沿用 `--eip-surface` 白色。官網深藍連結方向轉成適合 EIP 操作的 `--eip-blue` `#164C78`，hover／pressed 用同色系 `#103E65`、`#0B3254`。 |
| 層級、圓角、留白 | 沿用本機字型，首頁標題為 26–36px、卡片標題為內文字級的 1.1875 倍。參考影片區的 8px 圓角與首屏膠囊形狀，朝入口網站的密度調整，卡片內距與欄距為 16–24px。 |
| 表單與焦點 | 沿用 `--eip-control-height` 44px、一般控制項 4px 圓角、輸入邊界 `#6B7280` 和水平內距 12px。焦點 2px 外框、2px 間距，行事曆深色區用白色焦點。保留表單錯誤文字和紅色語意。 |

Chrome 驗證 1440px、320 CSS px 及 320px 下 200% 文字縮放。測試搜尋有／無結果、收合、頁籤、待批數量更新、月曆切換、必填與時間驗證、建立整日事件、卡片拖曳及鍵盤重排。版面與事件在 V1 同樣可讀取。節慶背景、原有大字模式和標誌載入通過。新增事件的必填錯誤顯示紅色邊框與 2px 焦點。主按鈕在 hover、pressed 時保持焦點提示，三種啟用背景與白字的對比分別為 8.98、11.06、13.14，表單框線對白底為 4.83，行事曆最亮漸層端點對白字為 6.66。現有 EIP 示範頁沒有載入、停用、唯讀或深色模式情境。三個 EIP 路由的 GitHub Pages 靜態輸出與資源路徑已核對。
