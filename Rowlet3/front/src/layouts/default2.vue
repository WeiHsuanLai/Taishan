<template>
  <!-- 電腦版導覽列 -->
  <v-app-bar>
    <v-container class="d-flex align-center">
      <!-- v-btn 是按鈕，to="/" 是回首頁  -->
      <v-btn to="/">購物網</v-btn>
      <!-- v-spacer 是換行， '/'是 閉合標籤 -->
      <v-spacer />

      <!-- 如果 if 是 mobile 手機格式，就會變成以下 -->
      <template v-if="mobile">
        <!-- 如果 click 函數 drawer 的值會變成 true -->
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </template>

      <!-- 
      v-for="item in navItems"裡面 v-for 是 Vue.js 中的指令，用于遍歷陣列或對象。在這裡，它遍歷 navItems 陣列中的每一個項目，並將每個項目賦值給 item 變數。 
      :key="item.to" 裡面 :key 是 Vue.js 中用於追蹤每個節點的唯一標識符。在這裡，每個按鈕的鍵值設置為 item.to，即導航項目的路徑。
      :prepend-icon="item.icon"：這是一個綁定表達式，用於設定按鈕的圖標。:prepend-icon 屬性接受一個值，這裡將其設置為當前遍歷項目的 icon 屬性，
      即每個導航項目對應的圖標名稱。
      {{item.text}} 裡面這是 Vue.js 的插值語法，用於在模板中顯示 JavaScript 表達式的結果。在這裡，它將顯示當前遍歷項目的 text 屬性，即每個導航項目的文本。
      -->
      <!-- v-else 如果不是手機板就會顯示電腦版 -->
      <template v-else>
        <v-btn
          v-btn
          v-for="item in navItems"
          :key="item.to"
          :prepend-icon="item.icon"
          :to="item.to"
          >{{ item.text }}</v-btn
        >
      </template>
    </v-container>
  </v-app-bar>

  <!-- 手機側邊攔 -->
  <!-- 如果 if 是 mobile 手機格式， -->
  <v-navigation-drawer v-if="mobile" v-model="drawer">
    <v-list nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :prepend-icon="item.icon"
        :to="item.to"
      >
        {{ item.text }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <router-view></router-view>
  </v-main>
</template>
<script setup>
// 從 Vue 核心庫中導入名為 ref 的功能
// 大括號{}內包含的是你想要從指定模塊導入的具體功能或變量的名稱。在這個例子中，你正在導入名為ref的功能。
// ref是Vue 3中的一個API，用于創建一個響應式的參考值。當你使用ref創建一個變量時，這個變量會成為一個響應式對象，
// 其內部值可以通過.value屬性訪問和修改。這意味著當.value的值發生變化時，Vue會自動追蹤這個變化並更新DOM。
import { ref } from "vue";
// 在 Vuetify 中，useDisplay() 是一個組合式 API，允許你在 Vue 3 應用程序中訪問和響應不同屏幕尺寸的信息。
import { useDisplay } from "vuetify";

// const { mobile } = useDisplay()：這行代碼調用 useDisplay() 函數並從返回的對象中解構出 mobile 屬性。mobile 是一個布爾值，如果當前屏
// 幕尺寸對應於手機尺寸（通常是寬度小於600px），則mobile為true；否則為false。
const { mobile } = useDisplay();
// 設定 drawer 原本的值為 true 也就是關閉
const drawer = ref(false);


// 導覽列陣列內容
const navItems = [
  { to: "/register", text: "註冊", icon: "mdi-account-plus" },
  { to: "/login", text: "登入", icon: "mdi-account-arrow-left" },
  { to: "/cart", text: "購物車", icon: "mdi-cart" },
  { to: "/orders", text: "訂單", icon: "mdi-list-box" },
  { to: "/admin", text: "管理", icon: "mdi-cog" },
];
</script>
