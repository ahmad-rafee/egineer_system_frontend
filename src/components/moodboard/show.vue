<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <v-row>
              <v-col cols="10"> عرض مودبورد </v-col>
            </v-row>
            <v-row>
              <v-row
                v-if="
                  $store.state.auth.role != 'Engineer' ||
                  $store.state.auth.role != 'Customer'
                "
              >
                <v-col cols="6">
                  <v-autocomplete
                    v-model="project"
                    outlined
                    rounded
                    dense
                    :items="projects"
                    item-text="ProjectName"
                    item-value="ProjectID"
                    label="المشروع"
                    prepend-inner-icon="mdi-user"
                    @change="get_moodboard"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-card>
                  <v-card-title> ملاحظات المودبورد </v-card-title>
                  <v-card-text>
                    {{ all.MoodBoardNotes }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card>
                  <v-card-title> ستايل المودبورد </v-card-title>
                  <v-card-text>
                    {{ all["MoodBoardStyle "] }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-card min-width="800">
                <v-card-title> أجزاء المودبورد </v-card-title>
                <v-card-text>
                  <v-simple-table class="full-width">
                    <thead>
                      <tr>
                        <th>اسم العنصر</th>
                        <th>ستايل العنصر</th>
                        <th>صور العنصر</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(part, index) in all.MoodBoardParts"
                        :key="index"
                      >
                        <td>
                          {{ part.table_item_name }}
                        </td>
                        <td>
                          {{ part.part_style_name }}
                        </td>
                        <td>
                          <v-btn icon>
                            <v-icon @click="images = part.part_images;show_images=true;">
                              fas fa-eye
                            </v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="show_images" width="600">
          <v-card>
            <v-card-title> صور العنصر </v-card-title>
            <v-card-text>
              <v-carousel v-model="slider">
                <v-carousel-item v-for="(image,index) in images" :key="index">
                  <img
                    :src="'http://172.86.75.235:8000/media/' + image"
                    alt=""
                    style="width: 100%; height: 100%"
                  />
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
          </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      project_select: false,
      project: null,
      images:[],
      show_images:false,
      slider:0
    };
  },
  methods: {
    create_task(project) {
      this.$router.push({
        name: "task.form",
        params: {
          project,
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
    submit(item) {
      this.$store.dispatch("task_submession/store", {
        Task: item.PK,
        TaskName: item.TaskName,
        File: item.File,
        EmployeeID: item.EmployeeID,
        Project: item.Project,
      });
    },
    edit(item) {
      let name = "task";
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
          this.$store.dispatch("task/delete", item);
        }
      });
    },
    get_moodboard(item) {
      this.$store.dispatch("moodboard/get_by_project", item);
    },
  },
  mounted() {
    if (this.$route.params.project) {
      this.$store.dispatch("moodboard/get_by_project", project.ProjectID);
      this.project_select = true;
    } else {
      this.$store.dispatch("project/index");
    }
  },
  computed: {
    ...mapState({
      all: (state) => state.moodboard.all,
      projects: (state) => state.project.all,
    }),
  },
};
</script>