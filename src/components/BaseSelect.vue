<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @input="updateValue"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: String,
    value: [String, Number],
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      // <-- method triggered by input event
      this.$emit('input', event.target.value)
    }
  }
}
</script>
