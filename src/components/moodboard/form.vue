<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title> إضافة مودبورد</v-card-title>
          <v-card-text>
            <v-form class="mx-auto col-11" ref="form">
              <v-row v-if="project_select">
                <v-col cols="2"></v-col>
                <v-col cols="6">
                   <v-autocomplete
                  v-model="moodboard.Project"
                  outlined
                  rounded
                  dense
                  :items="projects"
                  item-text="ProjectName"
                  item-value="ProjectID"
                  label="المشروع"
                  prepend-inner-icon="mdi-user"
                ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="6">
                  <v-autocomplete
                    rounded
                    outlined
                    dense
                    label="نوع التصميم"
                    :items="styles"
                    item-text="Style"
                    item-value="ItemID"
                    v-model="moodboard.TypeOfDesign"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col> </v-col>
                <v-col cols="2">
                  <v-btn dark color="primary" @click="add(moodboard)">
                    إضافة
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="6">
                  <v-textarea
                    outlined
                    rounded
                    dense
                    label="تفاصيل"
                    rows="2"
                    v-model="moodboard.Details"
                  >
                  </v-textarea>
                </v-col>
                
              </v-row>
              <v-row v-if="1==2">
                <v-col cols="2"></v-col>
                <v-col cols="6">
                   
                    <v-row>
                      <v-col cols="6">
                      <v-file-input v-model="moodboard_image" label="إضافة صورة" rounded outlined/>
                      </v-col>
                      <v-col cols="6">
                    <v-btn @click="save_image(moodboard_image)" dark color="primary">حفظ</v-btn>
                      </v-col>
                    </v-row>
                </v-col>
              </v-row>
              <v-row v-if="moodboard_id">
                <v-col cols="12">
                  <v-card>
                    <v-card-title> إضافة جزئية مودبورد </v-card-title>
                    <v-card-text>
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th>اسم العنصر</th>
                            <th>ستايل العنصر</th>
                            <th>ملاحظات</th>
                            <th>صور</th>
                            <th>
                              <v-btn @click="items.push({ Project })">
                                <v-icon> fas fa-plus </v-icon>
                              </v-btn>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in items" :key="index">
                            <td>
                              <v-autocomplete
                                v-model="item.TableItem"
                                solo
                                :items="table_items"
                                item-text="ItemName"
                                item-value="ItemID"
                                label="اسم العنصر"
                              ></v-autocomplete>
                            </td>
                            <td>
                              <v-autocomplete
                               solo
                                :items="styles"
                                item-text="Style"
                                item-value="ItemID"
                                v-model="item.Style"
                              >
                              </v-autocomplete>
                            </td>
                            <td>
                              <v-textarea
                                v-model="item.Notes"
                                solo
                                label="ملاحظات"
                                rows="1"
                              ></v-textarea>
                            </td>
                            <td>
                              <v-file-input clearable solo v-model="item.images" multiple/>
                            </td>
                            <td>
                              <v-btn @click="save(item)" title="حفظ" icon>
                                <v-icon> fas fa-check </v-icon>
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </v-card-text>
                  </v-card>
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
   name:'moodboard.form',
  data() {
    return {
      items: [],
      menu1: false,
      menu2: false,
      date1: null,
      date2: null,
      Project: null,
      added_moodboard: true,
      moodboard: {},
      contract_types: ["type1", "type2", "type3"],
      quotation: {
        data: {},
        labels: {
          project_name: this.$t("project_name"),
          customer_full_name: this.$t("customer_full_name"),
          address: this.$t("address"),
          statement: this.$t("statement"),
          price_in_letters: this.$t("price_in_letters"),
          price_in_numbers: this.$t("price_in_numbers"),
          project_area: this.$t("project_area"),
          project_estimated_time: this.$t("project_estimated_time"),
          issue_date: this.$t("issue_date"),
          mobile: this.$t("customer_mobile"),
          contract_customer: this.$t("contract_customer"),
          project_range: this.$t("project_range"),
          extra_details: this.$t("extra_details"),
          payments: this.$t("payments"),
          date_hijri: this.$t("date_hijri"),
          date_grigorean: this.$t("date_grigorean"),
          contract_subject: this.$t("contract_subject"),
        },
      },
      project_select:false,
      moodboard_image:null
    };
  },
  mounted() {
    if (this.$route.params.project) {
      this.Project = this.$route.params.project.ProjectID;
      this.moodboard.Project = this.Project;
    } else {
      this.project_select = true;
      this.$store.dispatch("project/index");
    }
    this.$store.dispatch("moodboard_style/index");
    this.$store.dispatch("item/index");
  },
  methods: {
    ...mapActions("moodboard_item", ["store"]),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
    add_payment() {
      this.quotation.data.Payments.push({
        key: Math.random() * 100,
        amount: "",
      });
    },
    change_amount(e, payment) {
      payment.amount = parseFloat(e.target.innerText);
    },
    delete_payment(payment) {
      this.quotation.data.Payments = this.quotation.data.Payments.filter(
        (i) => i.key != payment.key
      );
    },
    add(moodboard) {
      this.$store.dispatch("moodboard/store", moodboard);
    },
    save(item){
      item.MoodBoardParent = this.moodboard_id;
      item.Project = this.moodboard.Project;
      this.$store.dispatch("moodboard_item/store",item);
    },
    save_image(image){
      this.$store.dispatch("moodboard_image/store",image);
    }
  },
  computed: {
    ...mapState({
      styles: (state) => state.moodboard_style.all,
      table_items: (state) => state.item.all,
      projects: (state)=>state.project.all,
      moodboard_id:(state)=>state.moodboard.one
    }),
  },
};
</script>