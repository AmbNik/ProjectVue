<template>
  <v-col
    md="5"
    lg="4"
    xl="2"
    class="align-center justify-center"
    @click="$emit('open-add-dialog', props.tag)"
  >
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-card
          height="120px"
          v-bind="props"
          :color="
            isHovering ? 'green-lighten-2 border-opacity-0 ' : 'transparent'
          "
          border="dashed thin"
          class="d-flex align-center justify-center border-lg border-opacity-10"
        >
          <v-icon size="x-large" style="font-size: 50px">mdi-plus</v-icon>
        </v-card>
      </template>
    </v-hover>
  </v-col>
</template>
<script setup>
const props = defineProps({
  tag: String,
});
</script>
