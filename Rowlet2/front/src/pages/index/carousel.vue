<template>
  <v-carousel
  :continuous="false"
  :show-arrows="false"
  delimiter-icon="mdi-square"
  height="900"
  hide-delimiter-background
  cycle>
  <v-carousel-item
    src="@/assets/images/image1.jpg"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="@/assets/images/image2.jpg"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="@/assets/images/image3.jpg"
    cover
  ></v-carousel-item>
</v-carousel>
</template>
<script>
</script>
