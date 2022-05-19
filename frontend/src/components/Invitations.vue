<template>
  <div v-if="invitations.length > 0" class="container bg-red-100 ">
    <!-- Display the error var -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
      <button @click="deleteError" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    
    <a class="btn btn-secondary position-relative  d-lg-none" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
      Invitations
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {{ invitations.length }}
        <span class="visually-hidden">unread messages</span>
      </span>
    </a>

    <div v-if="invitations.length > 0" class="accordion d-none d-lg-block mt-4" id="invitations-accordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Invitaciones
          </button>
        </h2>
      </div>
    </div>
    <div class="collapse" id="collapseExample">
      <div class="card card-body overflow-auto" style="max-height:200px">
        <ul v-for="invitation in invitations" :key="invitation._id" class="list-group" >
          <li class="list-group-item row align-items-center d-flex">
            <div class="col-6 col-xs-1">
              <p class="m-0">{{ invitation.group.name }}</p>
            </div>
            <div class="col-6 col-xs-1 d-flex justify-content-end p-0">
              <button class="btn btn-danger btn-sm me-2" @click="rejectInvitation(invitation)" >
                Eliminar
              </button>
              <button class="btn btn-primary btn-sm" @click="acceptInvitation(invitation)">
                Aceptar
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import InvitationController from "../controllers/invitationController";

export default {
  data() {
    return {
      error: null,
      endpoint: import.meta.env.VITE_APP_URL_API,
      invitations: [],
    };
  },
  mounted() {
    this.getInvitations();
  },
  methods: {
    async getInvitations() {
      const invitations = await InvitationController.getInvitations(
        this.endpoint + "/user/invitations",
        this.$auth.userName,
        this.$auth.token
      );

      this.invitations = invitations;
    },
    async acceptInvitation(invitation) {
      const response = await InvitationController.acceptInvitation(
        this.endpoint + "/user/invitation/accept",
        this.$auth.token,
        invitation._id
      );

      // const data = await response.json();

      if (response.status === 200) {
        this.getInvitations();
        this.$parent.getGroups();
      }
    },
    async rejectInvitation(invitation) {
      await InvitationController.rejectInvitation(
        `${this.endpoint}/user/invitation/reject`,
        this.$auth.token,
        invitation._id
      )
        .then((response) => {
          console.log(invitation);
          console.log(response);
          // this.invitations.find(invitation => invitation._id === response._id) = null
          let this_invitation = this.invitations.find(invitation => invitation._id === response._id)
          this.invitations.splice(this.invitations.indexOf(this_invitation), 1);
          // console.log("this_invitation", this_invitation);
          // this_invitation = response
          // console.log(this.invitations);
        })
        .catch((error) => {
          this.error = error;
        });
    },
    deleteError() {
      this.error = null;
    },
  },
};
</script>

<style>
</style>