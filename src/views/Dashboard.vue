<template>
  <div>
    <v-container>
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3 ig-color-white">
            Health Check
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
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  mounted() {
    setInterval(() => {
      this.$electron.ipcRenderer.send("ping:cpu");
      this.$electron.ipcRenderer.send("ping:mem");
      // this.$electron.ipcRenderer.send('ping:disk')
    }, 3000);

    this.$electron.ipcRenderer.on("pong:cpu", (event, data) => {
      if (typeof data.cpuPercentage !== "undefined") {
        this.$refs.cpuUse.innerHTML = `CPU usage: ${data.cpuPercentage}%`;
      }
    });

    this.$electron.ipcRenderer.on("pong:mem", (event, data) => {
      if (typeof data.memInfo.usedMemPercentage !== "undefined") {
        this.$refs.memUse.innerHTML = `Memory usage: ${data.memInfo
          .usedMemPercentage || 0}%`;
      }
    });

    this.$electron.ipcRenderer.on("pong:disk", (event, data) => {
      console.log(data);
    });
  }
};
</script>
