<template>
  <div>
    <v-container fluid v-if="role == 'Admin'">
      <v-row>
        <v-col cols="3">
          <base-material-stats-card
            color="primary"
            icon="mdi-poll"
            title=" عدد العملاء"
            :value="admin_info.CustomerNumber"
            sub-icon="mdi-tag"
            sub-text="عدد العملاء في النظام"
          />
        </v-col>
        <v-col cols="3">
          <base-material-stats-card
            color="green"
            icon="mdi-poll"
            title=" عدد المشاريع"
            :value="admin_info.ProjectsNumber"
            sub-icon="mdi-tag"
            sub-text="عدد المشاريع المسجلة في النظام"
          />
        </v-col>
        <v-col cols="3">
          <base-material-stats-card
            color="red"
            icon="mdi-poll"
            title=" عدد الموظفين"
            :value="admin_info.EmployeesNumber"
            sub-icon="mdi-tag"
            sub-text="عدد الموظفين المسجلين في النظام"
          />
        </v-col>
        <v-col cols="3">
          <base-material-stats-card
            color="orange"
            icon="mdi-poll"
            title=" قيد التنفيذ"
            :value="admin_info.CurrentProjects"
            sub-icon="mdi-tag"
            sub-text="المشاريع التي يتم العمل عليها"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card outlined raised rounded>
            <v-card-title> آخر المشاريع </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>اسم المشروع</th>
                      <th>المساحة</th>
                      <th>التقدم الحالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="project in admin_info.LeatestProjects"
                      :key="project.ProjectID"
                    >
                      <td>{{ project.ProjectName }}</td>
                      <td>{{ project.ProjectArea }}</td>
                      <td>{{ project.CurrentProgress }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card outlined raised rounded>
            <v-card-title> آخر العملاء المسجلين </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>اسم العميل</th>
                      <th>رقم الجوال</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="customer in admin_info.LeatestCustomers"
                      :key="customer.PK"
                    >
                      <td>{{ customer.FullName }}</td>
                      <td>{{ customer.CustomerPhoneNumber }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card outlined raised rounded>
            <v-card-title> المهام المتأخرة </v-card-title>
            <v-card-text>
              <v-data-table :headers="tasks_headers" :items="reminded" :items-per-page="5">
                <template v-slot:item.DueDate="{ item }">
                  {{ new Date(item.DueDate).toLocaleDateString()}}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-row v-if="$store.state.auth.role == 'Engineer'">
                    <v-col cols="6">
                      <v-btn dark color="primary" @click="submit(item)">
                        تسليم
                      </v-btn>
                      <v-btn
                        icon
                        @click="edit(item)"
                        title="تعديل"
                        v-if="$store.state.auth.role != 'Engineer'"
                      >
                        <v-icon> fas fa-edit </v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        @click="remove(item)"
                        title="حذف"
                        v-if="$store.state.auth.role != 'Engineer'"
                      >
                        <v-icon> fas fa-trash </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-btn
                    icon
                    @click="$store.dispatch('task/confirmTask', item)"
                    title="تأكيد"
                    v-if="
                      (!item.ConfirmedBySuperVisor &&
                        $store.state.auth.user.role == 'SuperVisorEngineer') ||
                      $store.state.auth.user.role == 'Admin'
                    "
                  >
                    <v-icon> fas fa-check </v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    @click="$store.dispatch('task/confirmTask', item)"
                    title="تأكيد"
                    v-if="
                      !item.ConfirmedByCustomer &&
                      $store.state.auth.user.rol == 'Customer'
                    "
                  >
                    <v-icon> fas fa-check </v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="role == 'SupervisorEngineer'">
      <v-row>
        <v-col cols="3">
          <base-material-stats-card
            color="primary"
            icon="mdi-poll"
            title=" عدد العملاء"
            :value="design_supervisor_info.CustomerNumber"
            sub-icon="mdi-tag"
            sub-text="عدد العملاء في النظام"
          />
        </v-col>
        <v-col cols="3">
          <base-material-stats-card
            color="green"
            icon="mdi-poll"
            title=" عدد المشاريع"
            :value="design_supervisor_info.ProjectsNumber"
            sub-icon="mdi-tag"
            sub-text="عدد المشاريع المسجلة في النظام"
          />
        </v-col>
        <v-col cols="3">
          <base-material-stats-card
            color="red"
            icon="mdi-poll"
            title=" عدد الموظفين"
            :value="design_supervisor_info.EmployeesNumber"
            sub-icon="mdi-tag"
            sub-text="عدد الموظفين المسجلين في النظام"
          />
        </v-col>
        <v-col cols="3">
          <base-material-stats-card
            color="orange"
            icon="mdi-poll"
            title=" قيد التنفيذ"
            :value="design_supervisor_info.CurrentProjects"
            sub-icon="mdi-tag"
            sub-text="المشاريع التي يتم العمل عليها"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card outlined raised rounded>
            <v-card-title> آخر المشاريع </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>اسم المشروع</th>
                      <th>المساحة</th>
                      <th>التقدم الحالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="project in design_supervisor_info.LeatestProjects"
                      :key="project.ProjectID"
                    >
                      <td>{{ project.ProjectName }}</td>
                      <td>{{ project.ProjectArea }}</td>
                      <td>{{ project.CurrentProgress }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="role != 'Admin' && role != 'SupervisorEngineer'">
      <v-row>
       
        <v-col cols="4">
          <base-material-stats-card
            color="green"
            icon="mdi-poll"
            title=" مهامي"
            value="2"
            sub-icon="mdi-tag"
            sub-text="عدد المهام في قائمة الانتظار"
          />
        </v-col>
        <v-col cols="4">
          <base-material-stats-card
            color="red"
            icon="mdi-poll"
            title=" مشاريعي"
            value="4"
            sub-icon="mdi-tag"
            sub-text="عدد المشاريع التي أعمل عليها"
          />
        </v-col>
        <v-col cols="4">
          <base-material-stats-card
            color="orange"
            icon="mdi-poll"
            title=" قيد التنفيذ"
            value="5"
            sub-icon="mdi-tag"
            sub-text="مهام قيد التنفيذ"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card outlined raised rounded>
            <v-card-title> آخر المشاريع </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>اسم المشروع</th>
                      <th>المساحة</th>
                      <th>التقدم الحالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="project in design_supervisor_info.LeatestProjects"
                      :key="project.ProjectID"
                    >
                      <td>{{ project.ProjectName }}</td>
                      <td>{{ project.ProjectArea }}</td>
                      <td>{{ project.CurrentProgress }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      items: ["1", "2"],
      tasks_headers:[
        {
          text: "رقم المهمة",
          value: "Task",
        },
        {
          text: "اسم الموظف",
          value: "EmployeeName",
        },
        {
          text: "التاريخ النهائي",
          value: "DueDate",
        },
        {
          text: "إجراءات",
          value: "actions",
        },
      ],
    };
  },
  mounted() {
    if (this.role == "Admin") {
      this.$store.dispatch("admin_dashboard/index");
      this.$store.dispatch("task/getRemindedTasks");
    }
    if (this.role == "SupervisorEngineer" || this.role != "Admin") {
      this.$store.dispatch("design_supervisor_dashboard/index");
    }
  },
  computed: {
    ...mapState({
      admin_info: (state) => state.admin_dashboard.all,
      design_supervisor_info: (state) => state.design_supervisor_dashboard.all,
      role: (state) => state.auth.role,
      reminded:(state)=>state.task.reminded
    }),
  },
};
</script>