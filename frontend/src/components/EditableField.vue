<template>
  <div>
    <input 
        v-if="isEditMode" 
        v-model="fieldValue" 
        @blur="isEditMode = false"
        @vnode-mounted="onInputMounted"
        @change="updateField"
        
        type="text"
        class="form-control text-center fs-4 border border-primary rounded py-1"
    >
    <div v-else @click="isEditMode = true" :class="this.fieldValue != this.originalValue ? 'border-success': 'border-dark'" class="border border-2 rounded py-1">
        <p  class="text-center mb-0 fs-4">{{ fieldValue }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fieldValue: {
      type: String,
      required: true,
    },
    originalValue: {
      type: String,
    },
  },
  data() {
    return {
      isEditMode: false,
    //   hasChanged: this.fieldValue != this.originalValue,
    //   originalValue: this.fieldValue
    };
  },
  methods: {
    updateField() {
      console.log(this.fieldValue);
      this.$emit("updateField", this.fieldValue);
    },
    onInputMounted({ el }) {
      el.focus();
    },
  },
};
</script>

<style>
</style>