<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Ismartsoft Logo"
        class="shrink mr-2 imsartsoft-logo"
        contain
        :src="ismartsoftLogo"
        transition="scale-transition"
        width="50"
      />
    </div>

    <v-spacer></v-spacer>

    <!-- <v-btn href="https://igenco.co.th/" target="_blank" text>
      <span class="mr-2">IGENCO</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn> -->
    <v-btn text :title="`SETTING`" @click="goToSettingMenu">
      <v-icon>mdi-cog</v-icon>
      <!-- <span class="mr-2">SETTING</span> -->
    </v-btn>
  </v-app-bar>
</template>

<script>
const ismartsoftLogo = require("@/assets/ismartsoft-logo.png");

export default {
  name: "Header",
  data() {
    return {
      ismartsoftLogo
    };
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
