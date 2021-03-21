<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="model"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="model"
        :label="label"
        prepend-inner-icon="mdi-clock-time-four-outline"
        readonly
        rounded
        dense
        outlined
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="model"
      full-width
      @click:minute="
        $refs.menu.save(model);
        updateTime(model);
      "
    ></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  name: "time-picker",
  props: ["model", "label"],
  data() {
    return {
      menu: false,
      date: null,
    };
  },
  mounted() {
    if (this.$props.model) {
      this.model = this.$props.model;
    }
    if (this.$props.label) {
      this.label = this.$props.label;
    }
  },
  methods: {
    updateDate(model) {
      this.$emit("input", model);
    },
  },
};
</script>