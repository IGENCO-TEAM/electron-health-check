<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-2">
        <h1 class="display-2 font-weight-bold mb-3 ig-color-white">
          Setting Health Check
        </h1>
      </v-col>
    </v-row>

    <table-lists :items="configLists" />

    <v-btn color="secondary" class="mt-2" @click="goToDashboardMenu">
      <span class="mr-2">Dashbard</span>
    </v-btn>
  </v-container>
</template>

<script>
import TableLists from "@/components/setting/TableLists.vue";

export default {
  name: "Setting",
  components: {
    TableLists
  },
  data() {
    return {
      configLists: null
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
      this.configLists = data;
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
