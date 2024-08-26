<template>
  <v-container>
    <v-col cols="12">
      <h1 class="text-center">關於我們</h1>
    </v-col>
    <v-divider></v-divider>
    <v-container class="w-75">
      <v-row>
        <v-col cols="12">
          歡迎來到【未來酒店】— 您的奢華度假天堂。坐落於台灣美麗的山區，我們的飯店專為尋求放鬆與舒適的旅客而設。無論您是想逃離城市的喧囂，還是希望與家人朋友共享愉快時光，我們的飯店都將為您提供難忘的住宿體驗。
          <v-img src="https://images.unsplash.com/photo-1549638441-b787d2e11f14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
          </v-img>
        </v-col>
        <v-col cols="12">
          <h2>我們的理念</h2>
            在【未來酒店】，我們致力於提供超越期待的服務。我們的理念是以客為尊，將每一位來賓視為家人。每一個細節都經過精心設計，從寬敞舒適的客房，到美味的餐飲服務，我們的目標是確保您擁有一個愉而放鬆的住宿體驗。
          <v-img src="https://images.unsplash.com/photo-1486591038957-19e7c73bdc41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
          </v-img>
        </v-col>
        <v-col cols="12">
          <h2>住宿設施</h2>
            我們的飯店擁有多種房型，滿足不同需求的客人。每間客房均配備現代化設施，讓您在享受自然風光的同時，仍能感受到家一般的舒適。您可以在我們的溫泉區放鬆身心，或是在游泳池中暢遊，還可以在健身房中保持活力。
          <v-img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
          </v-img>
        </v-col>
        <v-col cols="12">
          <h2>美食體驗</h2>
            我們的餐廳提供各式各樣的美食，從本地特色的台灣小吃，到國際美食應有盡有。我們的廚師團隊精心準備每一道菜品，以新鮮的食材和創新的烹飪技術，為您帶來絕妙的味蕾享受。
          <v-img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
          </v-img>
        </v-col>
        <v-col cols="12">
          <h2>活動與服務</h2>
            無論您是想探索周邊的自然景點，還是參加我們安排的各類活動，我們的專業團隊都會為您提供最好的建議與協助。我們定期舉辦各種文化活動和主題晚會，讓您在度假期間獲得豐富的體驗。
          <v-img src="https://images.unsplash.com/photo-1462539405390-d0bdb635c7d1?q=80&w=2120&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
          </v-img>
        </v-col>
        <v-col cols="12">
          <h2>聯絡我們</h2>
            我們熱忱地期待您的光臨。如果您有任何問題或需要預訂，請隨時聯繫我們的客服團隊。我們將竭誠為您服務，讓您的每一次入住都成為美好的回憶。感謝您選擇【未來酒店】，我們期待在不久的將來迎接您的到來。
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'

definePage({
  meta: {
    title: '關於我們',
    login: false,
    admin: false
  }
})
</script>

<style scoped>
h2 {
  margin-top: 20px;
  text-align: center;
}
p {
  margin-bottom: 20px;
}
</style>
