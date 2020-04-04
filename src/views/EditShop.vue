<template>
  <div>
    <div class="mx-auto w-96">
      <h1 class="label-forms mb-5 mt-10 mb:text-4xl text-center">
        Editer mon enseigne
      </h1>
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
        <table class="mx-auto text-center text-gray-800">
          <thead>
          <tr>
            <th>Jour</th>
            <th>Ouverture</th>
            <th>Fermeture</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(schedule, index) in schedules" :key="index">
            <td>{{dayMap[schedule.day]}}</td>
            <td>
              <input class="border rounded p-2" type="time" v-model="schedule.open_hour">
            </td>
            <td>
              <input class="border rounded p-2" type="time" v-model="schedule.close_hour">
            </td>
          </tr>
          </tbody>
        </table>
      </Formik>
      <div class="mt-4" v-if="status !== null">
        <HelpMessage :type="submitMessage.type">{{submitMessage.text}}</HelpMessage>
      </div>
    </div>
  </div>
</template>

<script>
  import Formik from "../components/Formik/Formik";
  import FormGroup2 from "../components/Formik/FormGroup2";
  import api from "../api/api";
  import HelpMessage from "../components/HelpMessage";

  export default {
    name: "Editshop",
    components: {Formik, FormGroup2, HelpMessage},
    async mounted() {
      let response = await api.get('/user/current-user');
      const {user} = response.data;
      this.user = user;
      if(user.role_id !== 2) {
        throw new Error("User is not a merchant");
      }
      response = await api.get('/shop/show');
      const {shop} = await response.data;
      this.shop = shop;
      this.setFields();
      response = await api.get(`/schedule/shop/${shop.id}/show`);
      const {schedules, interval, number_max} = response.data;
      this.schedules = schedules;
      this.fields['number_max']['value'] = number_max;
      this.fields['interval']['value'] = interval;
      this.initalized = true
    },
    data: function () {
      return {
        initalized: false,
        dayMap: {
          1: 'Lundi',
          2: 'Mardi',
          3: 'Mercredi',
          4: 'Jeudi',
          5: 'Vendredi',
          6: 'Samedi',
          7: 'Dimanche'
        },
        status: null,
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
        schedules: [],
      }
    },
    computed: {
      submitMessage() {
        if (this.status === 200) {
          return {
            type: 'success',
            text: 'Enregistrement réussi'
          }
        } else if (this.status >= 400) {
          return {
            type: 'error',
            text: "Erreur lors de l'enregistrement"
          }
        }
        return {};
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

      async submit(values){
        const promises = [];
        this.schedules.forEach((schedule) => {
          schedule.number_max = values.number_max;
          schedule.interval = values.interval;
          promises.push(api.put(`/schedule/${schedule.id}/edit`, schedule));
        });
        try {
           await Promise.all(promises);
           this.status = 200;
        } catch (e) {
          this.status = 400;
        }

      }
    },
  }
</script>
<style scoped>
</style>
