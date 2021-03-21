<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> إضافة نوع وظيفة </v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
            <v-row>
                <v-col cols="12">
                    <v-text-field label="الاسم" outlined rounded dense v-model="data.JobType"></v-text-field>
                </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="12">
                <v-btn
                  block
                  dark color="primary"
                  @click="store(data)"
                >
                  {{ $t("register") }}
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
   name:'job_type.form',
  data() {
    return {
      data:{}
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions("job_type",["store"]),
  },
};
</script>