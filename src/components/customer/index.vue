<template>
  <v-container>
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title> 
               <v-row>
          <v-col cols="10">
            
              العملاء 
          </v-col>
              <v-col cols="2">
                <v-btn to="/customer/form" dark color="primary"> إضافة عميل جديد </v-btn>
              </v-col>
            </v-row>

          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="all" :items-per-page="5">
              <template v-slot:item.actions="{ item }">
                <v-btn icon @click="create_contract(item)" title="إضافة عرض سعر">
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                <v-btn icon @click="edit(item)" title="تعديل">
                  <v-icon> fas fa-edit </v-icon>
                </v-btn>
                <v-btn icon @click="remove(item)" title="حذف">
                  <v-icon> fas fa-trash </v-icon>
                </v-btn>
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
          text: "اسم العميل كاملا",
          value: "FullName",
        },
        {
          text: "رقم الجوال",
          value: "CustomerPhoneNumber",
        },
        {
          text: "اسم المستخدم",
          value: "CustomerUserName",
        },
        {
          text: "إضافة مشروع",
          value: "actions",
        },
      ],
    };
  },
  methods: {
    edit(item) {
      let name = "customer";
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
          this.$store.dispatch("customer/delete", item).then(()=>{
            this.$store.dispatch("customer/index");
          });;
        }
      });
    },
  },
  mounted(){
    this.$store.dispatch("customer/index");
  },
  computed: {
    ...mapState({
      all: (state) => state.customer.all,
    }),
  },
};
</script>