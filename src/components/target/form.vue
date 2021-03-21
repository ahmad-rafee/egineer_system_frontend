<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> إضافة محدد </v-card-title>
        <v-card-text>
          <v-form class="mx-auto col-11" ref="form">
            <v-row>
<v-col cols="2"></v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="target.EmpID"
                  outlined
                  rounded
                  dense
                  :items="employees"
                  item-text="EmployeeName"
                  item-value="EmpID"
                  label="الموظف"
                  prepend-inner-icon="fas fa-user"
                ></v-autocomplete>
              </v-col>
            </v-row>
          <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="target.NumberOfMeters"
                  outlined
                  rounded
                  dense
                  label="عدد الأمتار"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="target.NumberOfWindows"
                  outlined
                  rounded
                  dense
                  label="عدد الواجهات"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn block dark color="primary" @click="store(target)">
                  إضافة
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
import { mapActions, mapState } from "vuex";
export default {
   name:'target.form',
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      target:{},
    };
  },
  mounted() {
    this.$store.dispatch("employee/index");
    this.$store.dispatch("project/index");
    if(this.$route.params.employee){
      this.target.EmpID = this.$route.params.employee.EmpID;
    }
  },
  methods: {
    ...mapActions("target", ["store"]),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
    change_amount(e, payment) {
      payment.amount = parseFloat(e.target.innerText);
    },
  },
  computed: {
    ...mapState({
      employees: (state) => state.employee.all,
      projects: (state) => state.project.all,
    }),
  },
};
</script>