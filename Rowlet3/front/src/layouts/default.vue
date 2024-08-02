<!-- default.vue -->
<template>
    <v-app-bar>
      <v-container class="d-flex align-center">
        <v-btn to="/">購物網</v-btn>
        <v-spacer />
        
        <template v-if="mobile">
        <!-- 如果 click 函數 drawer 的值會變成 true -->
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        </template>

        <template v-else>
        <v-btn @click="openDialog">
          <DialogForm ref="dialogForm" />
        </v-btn>
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
    <v-btn @click="openDialog">
          <DialogForm ref="dialogForm" />
    </v-btn>
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
import { ref } from 'vue';
import { useDisplay } from "vuetify";
import DialogForm from '../components/DialogForm.vue';

const dialogForm = ref(null);
const openDialog = () => {
  dialogForm.value.isActive = true;
};

const { mobile } = useDisplay();
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
