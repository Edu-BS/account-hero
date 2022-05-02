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

                <div v-for="user in expense.fractions" :key="user._id" class="row mt-3">
                        <label for="inputPassword" class="col-sm-2 col-form-label">{{user.username}}</label>
                        <div class="col-sm-10">
                            <input type="number" v-model="user.amount" class="form-control" id="number">
                        </div>
                </div>


                <div class="d-flex">
                    <button @click="submit" ref="formButton" type="submit"
                        class="btn btn-primary rounded-pill mx-auto mt-4">Crear</button>
                </div>
            </form>
        </div>
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
            amount: 0,
        }
        let user2 = {
            _id: 2,
            username: "edu",
            amount: 0,
        }
        this.expense.fractions.push(user1)
        this.expense.fractions.push(user2)
        
        // guardo el id del grupo donde se encuentra el gasto nuevo 
        this.expense.idGroup = this.$route.params.idGroup
       
       // cuando cambie el monto de la factura fracciono por igual entre todos los integrantes
        this.$watch('expense.amount',(newAmount) => {
          let amount = newAmount
          let fraccion = amount / this.expense.fractions.length
          // cambio el amount de cada usuario
          this.expense.fractions.forEach(user => {
              user.amount = fraccion
          });
      })

    // observando si se cambia el valor en algun usuario 
      this.$watch('expense.fractions', (users)=> {
          
      },{deep: true})

    },

    methods: {
        submit() {
            this.createGroup(this.group)
        },

    },
};
</script>

<style>
</style>
