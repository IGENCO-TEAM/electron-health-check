<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mt-5 mb-2">
        <h1 class="display-2 font-weight-bold mb-3 ig-color-white">
          👷Health Check♻️
        </h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-card class="mx-auto" max-width="344">
          <!-- <v-row justify="center">
                <div ref="cpuUse"></div>
              </v-row> -->
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline">
                <div ref="cpuUse"></div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-card class="mx-auto" max-width="344">
          <!-- <v-row justify="center">
                <div ref="memUse"></div>
              </v-row> -->
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline">
                <div ref="memUse"></div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col>
        <v-alert border="top" colored-border type="warning" elevation="2">
          <strong>## CPU ##</strong>
          <p>More than 80% for 3 minutes alert to slack</p>

          <strong>## Memory ##</strong>
          <p>More than 80% for 3 minutes alert to slack</p>

          <v-btn color="info" @click.native="testSendAlert"
            >Test send Alert</v-btn
          >
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      cpuPercentage: 0,
      memPercentage: 0
    };
  },
  mounted() {
    setInterval(() => {
      this.$electron.ipcRenderer.send("ping:cpu");
      this.$electron.ipcRenderer.send("ping:mem");
      // this.$electron.ipcRenderer.send('ping:disk')
    }, 3000);

    this.$electron.ipcRenderer.on("pong:cpu", (event, data) => {
      if (typeof data.cpuPercentage !== "undefined") {
        this.cpuPercentage = data.cpuPercentage;
        this.$refs.cpuUse.innerHTML = `CPU usage: ${data.cpuPercentage}%`;

        /**
         * validate cpu usage more than 80% for 3 minutes
         * send alert to slack
         */
        if (data.cpuPercentage > 80) {
          this.$electron.ipcRenderer.send("test:send:slack", {
            cpuPercentage: data.cpuPercentage,
            memPercentage: this.memPercentage
          });
        }
      }
    });

    this.$electron.ipcRenderer.on("pong:mem", (event, data) => {
      if (typeof data.memInfo.usedMemPercentage !== "undefined") {
        this.memPercentage = data.memInfo.usedMemPercentage;
        this.$refs.memUse.innerHTML = `Memory usage: ${data.memInfo
          .usedMemPercentage || 0}%`;

        /**
         * validate memory usage more than 80% for 3 minutes
         * send alert to slack
         */
        if (data.memInfo.usedMemPercentage > 80) {
          this.$electron.ipcRenderer.send("test:send:slack", {
            cpuPercentage: this.cpuPercentage,
            memPercentage: data.memInfo.usedMemPercentage
          });
        }
      }
    });

    this.$electron.ipcRenderer.on("pong:disk", (event, data) => {
      console.log(data);
    });

    this.$electron.ipcRenderer.on("rs:test:send:slack", (event, data) => {
      console.log(data);
    });
  },
  methods: {
    testSendAlert() {
      let that = this;
      this.$electron.ipcRenderer.send("test:send:slack", {
        cpuPercentage: that.cpuPercentage,
        memPercentage: that.memPercentage
      });
    }
  }
};
</script>
