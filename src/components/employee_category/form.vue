<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> إضافة مسمى وظيفي </v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
            <v-row>
                <v-col cols="6">
                    <v-text-field label="الاسم" outlined rounded dense v-model="data.CategoryName"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-autocomplete label="الصلاحية" outlined rounded dense v-model="data.Role" :items="roles" item-text="text" item-value="role"/>
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
   name:'employee_category.form',
  data() {
    return {
      data:{
        },
          roles:[
            {
              text:"مهندس",
              role:"Engineer"
            },
            {
              text:"مشرف",
              role:"SupervisorEngineer"
            },
            {
              text:"مسوق",
              role:"Marketing"
            },
          ]
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions("employee_category",["store"]),
  },
};
</script>