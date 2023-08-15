<template>
  Somewhere in between {{ someData }}
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      someData: 'some text'
    }
  }
})
</script>