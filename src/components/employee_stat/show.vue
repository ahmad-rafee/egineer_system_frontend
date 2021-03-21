<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title>مهام متأخرة </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="tasks" :items-per-page="5" @click:row="display_task">
              <template v-slot:item.actions="{ item }">
                <v-row v-if="$store.state.auth.role == 'Engineer'">
                  <v-col cols="6">
                    <v-file-input
                      v-model="item.File"
                      label="اختر ملفا"
                      prepend-icon="mdi-plus"
                      width="100"
                      dense
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-btn icon @click="edit(item)" title="تعديل">
                      <v-icon> fas fa-edit </v-icon>
                    </v-btn>
                    <v-btn icon @click="remove(item)" title="حذف">
                      <v-icon> fas fa-trash </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title>مهام يعمل عليها </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="tasks_in_progress"
              :items-per-page="5"
              @click:row="display_task"
            >
              <template v-slot:item.actions="{ item }">
                <v-row v-if="$store.state.auth.role == 'Engineer'">
                  <v-col cols="6">
                    <v-file-input
                      v-model="item.File"
                      label="اختر ملفا"
                      prepend-icon="mdi-plus"
                      width="100"
                      dense
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-btn dark color="primary" @click="submit(item)">
                      تسليم
                    </v-btn>
                    <v-btn icon @click="edit(item)" title="تعديل">
                      <v-icon> fas fa-edit </v-icon>
                    </v-btn>
                    <v-btn icon @click="remove(item)" title="حذف">
                      <v-icon> fas fa-trash </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      headers: [
        {
          text: "اسم المهمة",
          value: "TaskName",
        },
        {
          text: "عدد الأمتار",
          value: "NumberOfMeters",
        },
        {
          text: "عدد الواجهات",
          value: "NumberOfWindows",
        },
        {
          text: "تفاصيل",
          value: "Details",
        },
        {
          text: "إجراءات",
          value: "actions",
        },
      ],
    };
  },
  methods: {
    create_price_offer(item) {
      this.$router.push({
        name: "price_offer.form",
        params: {
          item,
        },
      });
    },
    create_moodboard(project) {
      this.$router.push({
        name: "moodboard.form",
        params: {
          project,
        },
      });
    },
    add_target(employee) {
      this.$router.push({
        name: "target.form",
        params: {
          employee,
        },
      });
    },
    edit(item) {
      let name = "employee";
      this.$router.push({
        name: `${name}.form`,
        params: {
          [name]: item,
        },
      });
    },
    remove(item) {
      this.$swal({
        title: "هل أنت متأكد ؟",
        showCancelButton: true,
        confirmButtonText: `تأكيد`,
        cancelButtonText: `إلغاء`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("employee/delete", item);
        }
      });
    },
    display_task(task) {
      this.$router.push({
        name: "task.show",
        params: {
          task,
        },
      });
    },
  },
  mounted() {
    this.$store.dispatch("employee/index");
    if (this.$route.params.employee) {
      this.$store.dispatch(
        "task/getTasksDoneByEmployee",
        this.$route.params.employee.EmpID
      );
      this.$store.dispatch(
        "task/getCurrentTasksForEmployee",
        this.$route.params.employee.EmpID
      );
    }
  },
  computed: {
    ...mapState({
      all: (state) => state.employee.all,
      tasks: (state) => state.task.all,
      tasks_in_progress: (state) => state.task.current,
    }),
  },
};
</script>