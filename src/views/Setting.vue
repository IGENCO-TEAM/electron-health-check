<template>
  <div>
    <v-container>
      <h1>Setting Page</h1>

      <code>{{ config }}</code>

      <hr />
      <v-btn text @click="goToDashboardMenu">
        <span class="mr-2">Dashbard</span>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      config: null
    };
  },
  created() {
    /**
     * stop ipcRenderer before redirect to setting menu
     */
    this.$electron.ipcRenderer.removeAllListeners("pong:cpu");
    this.$electron.ipcRenderer.removeAllListeners("pong:mem");
  },
  mounted() {
    /**
     * get setting from sqlite3
     */
    console.log(`get:setting`);
    this.$electron.ipcRenderer.send("get:setting");

    /**
     * listen to setting from sqlite3
     */
    this.$electron.ipcRenderer.on("rs:setting", (event, data) => {
      console.log(data);

      this.config = data;
    });
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
