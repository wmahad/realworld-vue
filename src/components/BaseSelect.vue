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
import { fieldMixin } from '@/mixins/fieldMixin'
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  mixins: [fieldMixin]
}
</script>
