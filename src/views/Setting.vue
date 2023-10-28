<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
          <v-card-title class="text-h5">
            Update Setting
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="dialogData.name"
              label="Name Setting"
              type="text"
              outlined
              :disabled="true"
            ></v-text-field>
            <v-text-field
              v-model="dialogData.value"
              label="Value"
              type="text"
              outlined
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" text @click="reloadTable">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="saveDialog">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row class="text-center">
      <v-col class="mt-5 mb-2">
        <h1 class="display-2 font-weight-bold mb-3 ig-color-white">
          Setting Health Check
        </h1>
      </v-col>
    </v-row>

    <table-lists :items="configLists" @update-config="updateConfig" />

    <v-row class="text-center">
      <v-col class="mb-2">
        <v-btn color="secondary" class="mt-2" @click="goToDashboardMenu">
          <v-icon>mdi-view-dashboard</v-icon>
          <span class="mr-2">Dashbard</span>
        </v-btn>
      </v-col>
    </v-row>
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
      configLists: [],
      dialog: false,
      dialogData: {}
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
    },
    updateConfig(d) {
      /**
       * set dialog data
       */
      this.dialogData = d;

      /**
       * open dialog to update setting
       */
      this.dialog = true;
    },
    saveDialog() {
      /**
       * update setting
       */
      this.$electron.ipcRenderer.send("update:setting", this.dialogData);

      /**
       * listen to update setting
       */
      // eslint-disable-next-line no-unused-vars
      this.$electron.ipcRenderer.on("rs:update:setting", (event, data) => {
        /**
         * update setting in table
         */
        this.configLists = data;

        /**
         * close dialog
         */
        this.dialog = false;
      });
    },
    reloadTable() {
      /**
       * get setting from sqlite3
       */
      this.$electron.ipcRenderer.send("get:setting");

      /**
       * close dialog
       */
      this.dialog = false;
    }
  }
};
</script>
