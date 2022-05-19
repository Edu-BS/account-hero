<template>
    <main>
        <NavComponent view="Dashboard" />
        <div class="container mb-5">
            <div v-if="this.errors !== null" class="alert alert-warning alert-dismissible fade show" role="alert">
                {{ this.errors }}
                <button @click="deleteError" type="button" class="btn-close" data-bs-dismiss="alert"
                aria-label="Close"></button>
            </div>
            
            <form @submit.prevent="submit" class="form justify-content-center col-9 col-md-5 m-auto mt-4">
                <div v-if="infoGroup.isEtherGroup" class="text-center mt-4">
                    <img src="/ether.png" height="40" alt="">
                </div>
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
                        <label class="form-check-label" for="flexCheckDefault"> {{user.username}}</label>
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"  v-model="user.checked">
                        <div> {{user.amount}}</div>
                    </div>
                    
                </div>
                <div class="d-flex">
                    <button ref="formButton" type="submit"
                        class="btn btn-primary rounded-pill mx-auto mt-4">Crear</button>
                </div>
            </form>
        </div>
    </main>
</template>
<script>
import EthereumController from "../blockchain/ethereumController";

export default {
  data() {
    return {
      EthereumController: null,
      errors: null,
      infoGroup: {
        isEtherGroup: false,
        name: "",
        description: "",
        expenses: [],
        fractions: [],
        amount: 0,
      },
      expense: {
        idGroup: "",
        name: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
        amount: 0,
        fractions: [],
      },
    };
  },

  async mounted() {
    this.EthereumController = await EthereumController.getInstance();
    // guardo el id del grupo donde se encuentra el gasto nuevo
    this.expense.idGroup = this.$route.params.idGroup;

    this.getUserGroup();

    // cuando cambie el monto de la factura fracciono por igual entre todos los integrantes
    this.$watch("expense.amount", (newAmount) => {
      // console.log("entra");
      let amount = newAmount;
      let userActive = this.expense.fractions.filter((user) => user.checked);
      let fraccion = amount / userActive.length;

      // cambio el amount de cada usuario
      this.expense.fractions.forEach((user) => {
        user.amount = Number.parseFloat(0).toFixed(2);
        if (user.checked) {
          user.amount = Number.parseFloat(fraccion).toFixed(2);
        }
      });
    });

    // observando si se cambia el valor en algun usuario
    this.$watch(
      "expense.fractions",
      () => {
        let users = this.expense.fractions;
        let amount = this.expense.amount;

        // filtro por usuarios que estan activos
        let userActive = this.expense.fractions.filter((user) => user.checked);

        // calculo la fraccion por la cantidad de usuarios activos
        let fraccion = amount / userActive.length;

        // moidifico el amount de los usuarios
        this.expense.fractions.forEach((user) => {
          user.amount = Number.parseFloat(0).toFixed(2);
          if (user.checked) {
            user.amount = Number.parseFloat(fraccion).toFixed(2);
          }
        });
      },
      { deep: true }
    );
  },

  methods: {
    submit() {
      this.newExpense();
    },

    async getUserGroup() {
      const res = await fetch(
        import.meta.env.VITE_APP_URL_API + `/group/${this.expense.idGroup}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.$auth.token,
          },
        }
      );

      const data = await res.json();
      this.infoGroup = data;
      // agrego los usuarios a las fracciones
      this.infoGroup.users.forEach((user) => {
        let newUser = {
          userId: user._id,
          username: user.username,
          amount: Number.parseFloat(0).toFixed(2),
          checked: true,
        };
        // console.log("this.infoGroup -> ", this.infoGroup);
        if (this.infoGroup.isEtherGroup) {
          newUser.walletAddress = user.walletAddress;
        }
        this.expense.fractions.push(newUser);
      });
    },
    async newExpense() {
      let response;
      if (this.infoGroup.isEtherGroup) {
        await this.createEtherExpense()
          .then((res) => {
            // console.log(res);
            this.$router.push({
              name: "group",
              params: { id: this.infoGroup._id },
            });
          })
          .catch((err) => {
            this.errors = err.message;
          });
      } else {
        response = await fetch(
          `${import.meta.env.VITE_APP_URL_API}/newExpense`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + this.$auth.token,
            },
            body: JSON.stringify(this.expense),
          }
        );
        const data = await response.json();
        // console.log(response);
        // console.log(data);
        if (data.expense) {
          let idGroup = this.infoGroup._id;
          this.$router.push({ name: "group", params: { id: idGroup } });
        } else if (data.errors) {
          this.errors = data.errors.expense.message;
        }
      }
    },
    async createEtherExpense() {
      const etherExpense = {
        group: this.expense.idGroup,
        name: this.expense.name,
        description: this.expense.description,
        date: new Date().toISOString().slice(0, 10),
        amount: this.expense.amount,
        fractions: [],
      };

      let fractions = this.expense.fractions;
      console.log("this.expense -> ", this.expense);  
      try {
        for (let index = 0; index < this.expense.fractions.length; index++) {
          console.log("this.expense.fractions[index] -> ", this.expense.fractions[index]);
          if (this.expense.fractions[index].username !== this.$auth.userName) {
            let fractionAddress = await this.EthereumController.createFraction(
              fractions[index].walletAddress,
              fractions[index].amount
            ).catch((err) => {
              throw err;
            });
            console.log("fractionAddress -> ", fractionAddress);
            if (fractionAddress)
              etherExpense.fractions.push(fractionAddress.toString());
          }
        }
      } catch (error) {
        this.errors = error.message;
        throw error;
      }
      if (etherExpense.fractions.length)
        return await fetch(`${import.meta.env.VITE_APP_URL_API}/EtherExpense`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.$auth.token,
          },
          body: JSON.stringify(etherExpense),
        });
    },
    deleteError() {
      this.errors = null;
    },
  },
};
</script>

<style>
</style>
