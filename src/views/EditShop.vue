<template>
  <div>
    <div class="flex flex-col w-56 m-auto my-4">
      <h1 class="label-forms mb-5 mt-10 mb:text-4xl ">
        Editer mon enseigne
      </h1>
    </div>
    <Formik v-if="initalized" @onSubmit="submit" class="mx-auto w-160">
      <FormGroup2 v-for="(field) in fields"
                  :key="field.name"
                  :type="field.type"
                  :name="field.name"
                  :value="field.value"
                  :label="field.label"
                  class="w-2/3"
      >
      </FormGroup2>
      <table class="mx-auto w-2/3 text-center text-gray-800">
        <thead>
          <tr>
            <th>Jour</th>
            <th>Ouverture</th>
            <th>Fermeture</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(date, index) in dates" :key="index">
            <td>{{date.label}}</td>
            <td>
              <Field
                      :key="date.name1"
                      :type="date.type"
                      :name="date.name1"
                      :value="date.value1"
                      :label="date.label"
              ></Field>
            </td>
            <td>
              <Field
                      :key="date.name2"
                      :type="date.type"
                      :name="date.name2"
                      :value="date.value2"
                      :label="date.label"
              ></Field>
            </td>
          </tr>
        </tbody>
      </table>
    </Formik>
    <!-- <input type="time" id="number" v-model="monday.start"> -->
  </div>
</template>

<script>
  import Formik from "../components/Formik/Formik";
  import FormGroup2 from "../components/Formik/FormGroup2";
  import Field from "../components/Formik/Field"
  import api from "../api/api";

  export default {
    name: "Editshop",
    components: {Formik, FormGroup2, Field},
    async mounted() {  
      let response = await api.get('/user/current-user');
      const {user} = response.data;
      this.user = user;
      if(user.role_id !== 2) {
        throw new Error("User is not a merchant");
      }
      response = await api.get('/shop/show')
      const {shop} = await response.data;
      this.shop = shop;
      this.setFields();
      response = await api.get(`/schedule/shop/${shop.id}/show`);
      const {schedules, interval, number_max} = response.data;
      this.schedules = schedules;
      this.fields['number_max']['value'] = number_max;
      this.fields['interval']['value'] = interval;
      this.setDates();
      this.initalized = true
    },
    data: function () {
      return {
        initalized: false,
        fields: {
          label: {
            label: 'Label',
            name: 'label',
            type: 'text',
            value: '',
          },
          address: {
            label: 'Adresse',
            name: 'address',
            type: 'text',
            value: '',
          },
          zip_code: {
            label: 'Code',
            name: 'zip_code',
            type: 'number',
            value: ''
          },
          city: {
            label: 'Ville',
            name: 'city',
            type: 'text',
            value: ''
          },
          interval: {
            label: 'Combien de temps passent en moyenne vos clients (en minutes)',
            name: 'interval',
            type: 'number',
            value: ''
          },
          number_max: {
            label: 'Combien de personne pouvez-vous accueillir ?',
            name: 'number_max',
            type: 'number',
            value: ''
          }
        },
        dates: [
          {
            label: 'Lundi',
            name: '1',
            name1: 'begin_lun',
            name2: 'end_lun',
            type: 'time',
            value1: '',
            value2: ''
          },
          {
            label: 'Mardi',
            name: '2',
            name1: 'begin_mar',
            name2: 'end_mar',
            type: 'time',
            value1: '',
            value2: ''
          },
          {
            label: 'Mercredi',
            name: '3',
            name1: 'begin_mer',
            name2: 'end_mer',
            type: 'time',
            value1: '',
            value2: ''
          },
          {
            label: 'Jeudi',
            name: '4',
            name1: 'begin_jeu',
            name2: 'end_jeu',
            type: 'time',
            value1: '',
            value2: ''
          },
          {
            label: 'Vendredi',
            name: '5',
            name1: 'begin_ven',
            name2: 'end_ven',
            type: 'time',
            value1: '',
            value2: ''
          },
          {
            label: 'Samedi',
            name: '6',
            name1: 'begin_sam',
            name2: 'end_sam',
            type: 'time',
            value1: '',
            value2: ''
          },
          {
            label: 'Dimanche',
            name: '7',
            name1: 'begin_dim',
            name2: 'end_dim',
            type: 'time',
            value1: '',
            value2: ''
          },
        ],
        schedules: [],
      }
    },
    methods: {
      setFields(){
        Object.entries(this.shop).forEach(([key, value]) => {
          if (this.fields[key]) {
            this.fields[key]['value'] = value
          }
        })
      },
      setDates(){
        this.schedules.forEach(s => {
          this.dates.forEach(d => {
            if (d.name == s.day) {
              d.value1 = s.open_hour;
              d.value2 = s.close_hour;
            }
          })
        })
      },
      submit(values){
        console.log(values)
      }
    },
  }
</script>
<style scoped>
</style>
