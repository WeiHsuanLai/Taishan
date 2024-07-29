<template lang="pug">
table
 template(v-for="(link, i) in links" :key="i")
  tr
   td
    img(:src="link.img")
  tr
   td &nbsp;
</template>

<script setup>
const links = [
	{ to: '/yangminshan', img: new URL('@/assets/park0302.jpg', import.meta.url).href },
	{ to: '/sheipa', img: new URL('@/assets/park0303.jpg', import.meta.url).href },
	{ to: '/yangminshan', img: new URL('@/assets/park0304.jpg', import.meta.url).href },
	{ to: '/yangminshan', img: new URL('@/assets/park0305.jpg', import.meta.url).href }
]
</script>
<style scoped lang="sass">
table
  width: 200px
  margin: auto
  text-align: center
  img
   width: 120px
   height: 40px
   &:hover
    filter: hue-rotate(180deg)
</style>
