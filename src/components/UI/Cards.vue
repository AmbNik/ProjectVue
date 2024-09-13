<template>
  <v-col
    v-for="item in filteredItems(props.tag)"
    :key="item.id"
    cols="12"
    md="5"
    lg="4"
    xl="2"
  >
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-card
          v-bind="props"
          height="120px"
          :color="isHovering ? 'grey-lighten-2' : 'grey-darken-3'"
          :class="{
            'green-my': isAddingItem && item.id === isAddingItemName,
          }"
          @click="$emit('open-dialog-info', item)"
        >
          <v-card-title>
            <v-row class="align-center justify-space-between justify-end">
              <slot name="name" :item="item"> </slot>
              <v-col class="d-flex justify-end"> </v-col>
              <v-icon
                @click.stop="$emit('open-link', item.url)"
                class="ml-2"
                small
                style="cursor: pointer"
              >
                mdi-open-in-new
              </v-icon>

              <template v-slot:append>
                <v-btn icon="mdi-heart"></v-btn>

                <v-btn icon="mdi-magnify"></v-btn>

                <v-btn icon="mdi-dots-vertical"></v-btn>
              </template>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-dots-vertical"
                    variant="text"
                    v-bind="props"
                  ></v-btn>
                </template>

                <v-list>
                  <v-list-item @click="$emit('open-edit-dialog', item)">
                    <v-list-item-title>Редактировать</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="$emit('open-delete-dialog', item)">
                    <v-list-item-title>Удалить</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </v-card-title>
          <slot name="description" :item="item"> </slot>
        </v-card>
      </template>
    </v-hover>
  </v-col>
</template>

<script setup>
const items = defineModel("items");

const props = defineProps({
  tag: String,
});
const filteredItems = (tag) => {
  if (tag == "Без тега") tag = null;
  return items.value.filter((item) => item.tags === tag);
};
</script>
