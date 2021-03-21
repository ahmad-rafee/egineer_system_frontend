<template>
<v-container>
  <v-row justify="center" dense>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> أنواع عروض الأسعار </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="all"
            :items-per-page="5"
          >
          <template v-slot:item.actions="{item}">
              <v-btn icon @click="create_contract(item)">
                  <v-icon>
                      mdi-plus
                  </v-icon>
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
                text:"النوع",
                value:'Type'
            },
        ],
    };
  },
  mounted(){
      this.$store.dispatch("price_offer_type/index");
  },
  methods: {
    ...mapActions(["add_quotation"]),
    save_grigorean(date) {
      this.$refs.menu1.save(date);
    },
    save_hijri(date) {
      this.$refs.menu2.save(date);
    },
  create_contract(quotation){
      console.log(quotation);
      this.$router.push({
          name:'project.form',
          params:{
              quotation
          }
      });
  }
  },
  computed:{
      ...mapState("price_offer_type",["all"])
  }
};
</script>