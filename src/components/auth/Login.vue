<template>
<v-row justify="center" dense>
    <v-col cols="6">
  <v-card outlined>
      <v-card-title>
          تسجيل الدخول
      </v-card-title>
        <v-card-text>
        <v-form class="mx-auto col-11" ref="form"  >
            <v-text-field v-model="user.username" outlined rounded dense label="اسم المستخدم" prepend-inner-icon="mdi-email" type="email"></v-text-field>
            <v-text-field v-model="user.password" outlined rounded dense label="كلمة المرور" prepend-inner-icon="mdi-lock" type="password"></v-text-field>
            <v-alert border="right" color="red" dark v-if="errors != null"> {{error_data[errors.Status].text}}</v-alert>          
            <v-btn block color="primary" @click="login(user)">
                تسجيل الدخول
            </v-btn>
        </v-form>
        </v-card-text>
  </v-card>
  </v-col>
  
  </v-row>
</template>
<script>
import {mapActions, mapState} from 'vuex';
export default {
    data(){
        return{
            user:{
                
            },
            email:{
                label:"Email"
            },
            password:{
                label:"Password"
            },
            error_data:{
                InCorrectPassword:{
                    text:"كلمة المرور غير صحيحة"
                }
            }
        };
        
    },
    methods:{
        ...mapActions("auth",['login'])
    },
    computed:{
        ...mapState("auth",["token","errors"])
    },
    watch:{
        token:function(val){
            if(val != null){
                this.$router.push("/");
            }
        }
    }
}
</script>