<template>
  <div>
    <div class="flex flex-col w-56 m-auto my-4">
      <h1 class="label-forms mb-5 mt-10 mb:text-4xl ">
        Editer mon enseigne
      </h1>
    </div>
    <Formik v-if="initalized" @onSubmit="submit">
      <FormGroup2 v-for="(field) in fields"
                  :key="field.name"
                  :type="field.type"
                  :name="field.name"
                  :value="field.value"
                  :label="field.label"
                  class="w-2/3"
      >
      </FormGroup2>
      <div class="flex flex-col w-2/3 m-auto my-2 items-stretch invisible sm:invisible md:visible lg:visible xl:visible">
        <div class="flex flex-wrap -mx-3 mb-6 justify-between ">
          <div class="w-full md:w-1/4 px-3 md:mb-0 ">
            <label class="font-semibold text-gray-700 block mb-2 align-middle">Jour</label>
          </div>
          <div class="w-full md:w-1/4 px-3 md:mb-0 ">
            <label class="font-semibold text-gray-700 block mb-2 align-middle">Ouverture</label>
          </div>
          <div class="w-full md:w-1/4 px-3 md:mb-0 ">
            <label class="font-semibold text-gray-700 block mb-2 align-middle">Fermeture</label>
          </div>
        </div>
      </div>
      <Date v-for="date in dates"
            :key="date.name"
            :type="date.type"
            :name="date.name1"
            :name1="date.name2"
            :value1="date.value1"
            :value2="date.value2"
            :label="date.label"
            class="justify-center"
      >
        {{ date.label }}
      </Date>
    </Formik>
  </div>
</template>

<script>
  import Formik from "../components/Formik/Formik";
  import FormGroup2 from "../components/Formik/FormGroup2";
  import Date from "../components/Date";
  import api from "../api/api";

  export default {
    name: "Editshop",
    components: {Formik, FormGroup2, Date},
    beforeMount() {
      api.get('/user/current-user')
        .then(response => {
          this.user = response.data.user;
          if (response.data.user.role_id == 2) {
            api.get('/shop/show')
              .then(response => {
                this.shop = response.data.shop;
                this.setFields();
                api.get(`/schedule/shop/${this.shop.id}/show`)
                  .then(response => {
                    const {schedules, interval, number_max} = response.data;
                    this.schedules = schedules;
                    this.fields['number_max']['value'] = number_max;
                    this.fields['interval']['value'] = interval;
                    this.setDates();
                    this.initalized = true
                  });
              })
          }
        });
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
