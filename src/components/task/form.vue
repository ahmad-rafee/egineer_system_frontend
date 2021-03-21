<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title> {{ $t("task_assignment") }} </v-card-title>
          <v-card-text>
            <v-form class="mx-auto col-11" ref="form">
              <v-row>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="task.EmployeeID"
                    outlined
                    rounded
                    dense
                    :items="employees"
                    item-text="EmployeeName"
                    item-value="EmpID"
                    label="الموظف"
                    prepend-inner-icon="mdi-calendar"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="task.Project"
                    outlined
                    rounded
                    dense
                    :items="projects"
                    item-text="ProjectName"
                    item-value="ProjectID"
                    label="المشروع"
                    prepend-inner-icon="mdi-user"
                    @change="get_parts"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="task.TaskName"
                    label="اسم المهمة"
                    rounded
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="task.MoodBoardPartT"
                    outlined
                    rounded
                    dense
                    :items="moodboard_parts"
                    item-text="item_name"
                    item-value="PK"
                    label="جزئية المودبورد"
                    prepend-inner-icon="mdi-user"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="task.NumberOfMeters"
                    outlined
                    rounded
                    dense
                    label="عدد الأمتار"
                    prepend-inner-icon="mdi-calendar"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="task.NumberOfWindows"
                    outlined
                    rounded
                    dense
                    label="عدد الواجهات"
                    prepend-inner-icon="mdi-calendar"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-textarea
                    v-model="task.Details"
                    outlined
                    rounded
                    dense
                    label="تفاصيل"
                    prepend-inner-icon="fas fa-info-circle"
                    type="text"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-switch
                    v-model="task.CompletedByEmployee"
                    label="تم إنجازها من قبل الموظف"
                  >
                  </v-switch>
                </v-col>
                <v-col cols="6">
                  <v-switch
                    v-model="task.ConfirmedBySuperVisor"
                    label="تمت الموافقة بواسطة المشرف"
                  >
                  </v-switch>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-switch
                    v-model="task.ConfirmedByCustomer"
                    label="تمت الموافقة بواسطة العميل"
                  >
                  </v-switch>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn block dark color="primary" @click="store(task)">
                    إضافة مهمة
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
   name:'task.form',
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      task: {
        ConfirmedByCustomer:false,
        ConfirmedBySuperVisor:false,
        CompletedByEmployee:false
      },
    };
  },
  mounted() {
    if(this.$route.params.employee){
      this.task.EmployeeID=this.employees.EmpID;
    }
    if(this.$route.params.project){
      this.task.Project = this.$route.params.project.ProjectID;
      this.get_parts(this.task.Project);
    }else
    this.$store.dispatch("project/index");
    this.$store.dispatch("employee/index");
  },
  methods: {
    ...mapActions("task", ["store"]),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
    add_payment() {
      this.task.Payments.push({
        key: Math.random() * 100,
        amount: "",
      });
    },
    change_amount(e, payment) {
      payment.amount = parseFloat(e.target.innerText);
    },
    delete_payment(payment) {
      this.task.Payments = this.task.Payments.filter(
        (i) => i.key != payment.key
      );
    },
    get_parts(item){
      this.$store.dispatch("moodboard_item/index",item);
// console.log(item);
    }
  },
  computed: {
    ...mapState({
      employees: (state) => state.employee.all,
      projects: (state) => state.project.all,
      moodboard_parts: (state) => state.moodboard_item.all,
    }),
  },
  watch: {},
};
</script>