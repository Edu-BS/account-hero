<template>
    <main>
        <NavComponent view="Dashboard" />

        <div class="container mb-5">

            <form @submit.prevent="submit" class="form justify-content-center col-9 col-md-5 m-auto mt-5">
                <label for="name_input" class="form-label">Nombre del gasto</label>
                <input v-model="expense.name" type="name" name="name" id="name_input" class="form-control" required>

                <label for="description_input" class="form-label mt-3">Descripción</label>
                <textarea v-model="expense.description" name="description" id="description_input" class="form-control"
                    rows="4"></textarea>

                <label for="usuarios_input" class="form-label mt-3">Monto</label>
                <input type="number" v-model="expense.amount" name="monto" id="monto_input" class="form-control"
                    required>

                <label for="usuarios_input" class="form-label mt-3">Fecha</label>
                <input type="date" v-model="expense.date" name="monto" id="monto_input" class="form-control" required>

                <div v-for="user in expense.fractions" :key="user._id" class="mt-3">
                    <div class="form-check form-check-inline">
                        <label class="form-check-label" for="flexCheckDefault"> {{user.username}} </label>
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"  v-model="user.checked">
                        <p>{{user.amount}}</p>
                    </div>
                </div>
                <div class="d-flex">
                    <button @click="submit" ref="formButton" type="submit"
                        class="btn btn-primary rounded-pill mx-auto mt-4">Crear</button>
                </div>
            </form>
        </div>
        <p>{{this.$auth.token}}</p>
    </main>
</template>
<script>


export default {
    data() {
        return {
            expense: {
                idGroup : '',
                name: '',
                description: '',
                date: new Date().toISOString().slice(0, 10),
                amount: 0,
                fractions: []
            }
        };
    },

    created() {
        let user1 = {
            _id: 1,
            username: "santy",
            amount: Number.parseFloat(0).toFixed(2),
            checked : true
        }
        let user2 = {
            _id: 2,
            username: "edu",
            amount: Number.parseFloat(0).toFixed(2),
             checked : false
        }

        let user3 = {
            _id: 3,
            username: "mario",
            amount: Number.parseFloat(0).toFixed(2),
             checked : true
        }
        this.expense.fractions.push(user1)
        this.expense.fractions.push(user2)
        this.expense.fractions.push(user3)
        
        // guardo el id del grupo donde se encuentra el gasto nuevo 
        this.expense.idGroup = this.$route.params.idGroup
        
        this.getGroup()

       // cuando cambie el monto de la factura fracciono por igual entre todos los integrantes
        this.$watch('expense.amount',(newAmount) => {
          let amount = newAmount
          let userActive = this.expense.fractions.filter(user => user.checked )
          let fraccion = amount / userActive.length
         
         // cambio el amount de cada usuario
          this.expense.fractions.forEach(user => {
              user.amount = Number.parseFloat(0).toFixed(2)
              if (user.checked) {
                  user.amount = Number.parseFloat(0).toFixed(2)
              }
          });
      })

    // observando si se cambia el valor en algun usuario 
      this.$watch('expense.fractions', ()=> {
          let users = this.expense.fractions
          let amount = this.expense.amount
          
          // filtro por usuarios que estan activos 
          let userActive = this.expense.fractions.filter(user => user.checked )
          
          // calculo la fraccion por la cantidad de usuarios activos 
          let fraccion = amount / userActive.length
          
          // moidifico el amount de los usuarios 
          this.expense.fractions.forEach(user => {
              user.amount = Number.parseFloat(0).toFixed(2)
              if (user.checked) {
                  user.amount = Number.parseFloat(fraccion).toFixed(2)
              }
          })
      },{deep: true})

    },

    methods: {
        submit() {
           
        },

        async getGroup() {
            console.log(this.expense.idGroup);
            const res = await fetch(import.meta.env.VITE_APP_URL_API + `/group/${this.expense.idGroup}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.$auth.token,
                }
            })

            const data = await res.json();
            console.log(data);
        }

    },

    computed : {

    }
};
</script>

<style>
</style>
