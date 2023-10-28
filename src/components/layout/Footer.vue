<template>
  <v-footer padless>
    <v-col class="blue darken-2 text-center" cols="12">
      {{ new Date().getFullYear() }} —
      <a
        href="https://ismartsoft.igenco.co.th/"
        target="_blank"
        rel="noreferrer"
        class="white--text"
        ><strong>Ismartsoft TEAM</strong></a
      >
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
