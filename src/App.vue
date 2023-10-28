<template>
  <v-app>
    <main-header />

    <v-main>
      <router-view />
    </v-main>

    <main-footer />
  </v-app>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "App",
  components: {
    "main-header": Header,
    "main-footer": Footer
  },
  mounted() {
    /**
     * default redirect to dashboard menu [/]
     */
    this.$router.push({ name: "Dashboard" });
  },
  methods: {
    goToSettingMenu() {
      /**
       * redirect to setting menu [/setting]
       */
      this.$router.push({ name: "Setting" });
    }
  }
};
</script>

<style></style>
