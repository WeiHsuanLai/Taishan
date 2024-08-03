<template>
  <!--
   vuetify 最外層的架構要 v-app，裡面的東西就交給 layout 去處理，可能不同的 layout 導覽列的位置也不一樣  
   v-app 裡面放導覽列的 v-nav 和 v-footer，導覽列的位置也不一樣，所以都放在 layout 裡面
  
   -->
  <v-app>
    <!--斜線(/)代表閉合標籤（self-closing tag，如果一個元素沒有內容或不需要封閉，可以使用自閉合標籤的形式來表示。 -->
    <router-view />
  </v-app>
</template>
