module.exports = {
  tabWidth: 2, // tab 縮排 2 個字元
  semi: false, // 不加分號
  trailingComma: 'none', // 省略尾巴逗號
  singleQuote: true, // 使用單引號
  printWidth: 170, // 屬性想折行可以註解起來
  arrowParens: 'avoid', // 省略箭頭函式參數一個時的小括號
  bracketSpacing: true, // 在物件字面值、陣列使用的的括號與文字間加上空格
  useTabs: false, // 縮排不使用 tab
  quoteProps: 'as-needed', // 物件的key僅在必要時用引號
  vueIndentScriptAndStyle: true, // 縮排 <script>、<style>
  // 測試中屬性
  jsxSingleQuote: true, // jsx 使用單引號
  jsxBracketSameLine: true, // 在 jsx 中把'>' 是否單獨放在一行
  htmlWhitespaceSensitivity: 'ignore', //根據顯示樣式決定html要不要折行
  bracketSameLine: true, // 標籤 > 會在新的一行
  // 新測試中屬性
  rangeStart: 0, // 每個文件格式化的範圍是文件的全部內容
  rangeEnd: Infinity, // 结尾
  requirePragma: false, // 不需要寫文件開頭的 @prettier
  insertPragma: false, //不需要自動在文件開頭插入 @prettier
  proseWrap: 'preserve', //使用默認的折行標準 => 預設:preserve
  endOfLine: 'auto' // 文件换行格式 LF/CRLF => 建議: auto
}
