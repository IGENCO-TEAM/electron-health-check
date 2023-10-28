<template>
  <v-simple-table fixed-header height="300px">
    <template #default>
      <thead>
        <tr>
          <th class="text-center">
            Name Setting
          </th>
          <th class="text-center">
            Value
          </th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
          <td>
            <v-btn
              text
              small
              color="warning"
              @click="$emit('update-config', item)"
            >
              <span class="mr-2">Edit</span>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "TableLists",
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {};
  }
};
</script>
