<template>
  <v-footer
    class="bg-indigo-lighten-1 text-center d-flex flex-column w-100"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-0">
      123
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>0812</strong>
    </div>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>
