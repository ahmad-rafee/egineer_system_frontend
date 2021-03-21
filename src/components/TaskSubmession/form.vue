<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> تسليم مهمة </v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="6">
                   <v-autocomplete :items="tasks" label="المهمة" item-text="TaskName" item-value="PK"></v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                  block
                  dark color="primary"
                  @click="store(data)"
                >
                تسليم
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
   name:'task_submession.form',
  data() {
    return {
      data:{}
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions("task_submession",["store"]),
  },
};
</script>