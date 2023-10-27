<template>
  <div>
    <v-container>
      <h1>Setting Page</h1>

      <v-btn text @click="goToDashboardMenu">
        <span class="mr-2">Dashbard</span>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Setting",
  created() {
    /**
     * stop ipcRenderer before redirect to setting menu
     */
    this.$electron.ipcRenderer.removeAllListeners("pong:cpu");
    this.$electron.ipcRenderer.removeAllListeners("pong:mem");
  },
  methods: {
    goToDashboardMenu() {
      /**
       * redirect to dashboard menu [/]
       */
      this.$router.push({ name: "Dashboard" });
    }
  }
};
</script>
