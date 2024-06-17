# Hahow Frontend Engineer 徵才小專案 Tanya
## 如何執行

### 步驟1
`npm run dev` 啟動專案

### 步驟2
在瀏覽器進入 [http://localhost:3000](http://localhost:3000) 查看專案

## 專案架構
```
/public
/src
|_ /app
   |_ /components
   |  |_ HeroList
   |  |_ Modal
   |_ /heroes
   |  |_ HeroContext
   |  |_ page
   |  |_ /[id]
   |     |_ page 
   |_ /api
   |_ /type
   |_ /page

    
```
專案使用的是Next.js 官方推薦的 app router 架構，在 `app router 架構` 裡面建立專案後，會自動生成 src/app 的資料夾，而首頁會在這個資料夾的 page.tsx 底下。

在 app 資料夾下面的 heroes 資料夾是我們主要頁面邏輯存放的資料夾。heroes 資料夾下面的 page 這一個檔案會出現 `domain/heroes` 這個頁面。而 [id] 資料夾下面的 page 則會出現 `domain/heroes/[id]` 的頁面，此 id 是可以動態生成的，也是放置 Hero Profile 的地方。

其次會重複使用到的元件在 `components` 資料夾、api 串接的檔案位在 `api.tsx`、重複使用的型別定義則在 `type.tsx`

## 使用的第三方 Library/語言
### Typescript
Typescript 是一種基於 Javascript 上面提供型別系統的語言，可以幫助我們用 Javascript 開發的時候，讓程式碼更好維護，補強 Javascript 弱型別不足的地方，對於跟後端溝通 api 規格上面也很方便。
### styled-components
是一種 CSS-in-JS 的 Library，使用 tagged template literals 將 CSS 直接嵌入 JavaScript 代碼中，讓每個 React 元件可以擁有自己的樣式。特性是樣式與組件封裝在一起，增強了組件的可移植性和可重用性，也可以根據元件的 props 動態改變樣式。

## 什麼狀況會寫註解
* 邏輯比較複雜、程式碼比較抽象或複雜之處
* 仍然可能會更動的地方
* 英文命名不足以妥善表達邏輯
* 團隊有共識要一起寫註解之處

## 此專案中遇到的困難、問題、解決的方法
此專案中遇到較花時間的部分是自己用 Next.js 新的 app router 的方式架構一個專案，專案需求看似單純，但還需要考量到路由的配置。因此在路由配置方式，與規格列表上面的需要上 `Hero List Page (網址: /heroes)、Hero Profile Page (網址: /heroes/:heroId)、"Hero List" 依然在相同位置，並且不因切換連結重新 render`
一開始沒有思考清楚路由的配置與元件的擺放方式，加上對於 app router 還不是那麼熟悉，並僅僅以為更換連結名稱沒有改變 routing 只是把當下的 path 替換掉，此舉將導致重新整理找不到頁面，導致最初版架構資料傳遞的邏輯與完成版差異比較大。往後會建議自己在專案開始前先建立一個完整的路由系統、資料傳遞的方式再調整詳細的規格，在重構上比較不會那麼痛苦...

## 補充說明
以下是我認為此專案後續可以再優化，但因為時間考量而沒有完成的部分
* 建立錯誤處理的系統，如：和後端一起訂定 error code 、不同層級的錯誤應該有的畫面行為(eg:錯誤畫面或是跳 modal)
* i18N 語系管理
* 測試：Unit Test, E2E Test

謝謝你們的閱讀與協助，對此專案有什麼問題或是建議都可以跟我說 💻🤍
