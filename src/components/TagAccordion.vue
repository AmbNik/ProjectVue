<template>
  <CardAdd
    v-if="!isLoading && !props.items.length && !props.error"
    :tag="tag"
    @open-add-dialog="openAddDialog"
  />

  <AlertError v-model:error="props.error" />

  <SkeletonLoader v-if="isLoading" />

  <v-expansion-panels v-else-if="!props.error" v-model="activePanels" multiple>
    <v-expansion-panel v-for="tag in uniqueTags" :key="tag">
      <v-expansion-panel-title>
        <h2>{{ tag }}</h2></v-expansion-panel-title
      >
      <v-expansion-panel-text>
        <v-row>
          <CardAdd :tag="tag" @open-add-dialog="openAddDialog" />

          <Cards
            v-model:items="props.items"
            :tag="tag"
            @open-dialog-info="openDialogInfo"
            @open-link="openLink"
            @open-edit-dialog="openEditDialog"
            @open-delete-dialog="openDeleteDialog"
          >
            <template v-slot:name="{ item }">
              <slot name="name" :item="item"></slot>
            </template>

            <template v-slot:description="{ item }">
              <slot name="description" :item="item"></slot>
            </template>
          </Cards>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, computed, nextTick, defineEmits } from "vue";
import { useClipboard } from "@vueuse/core";
import SkeletonLoader from "@/components/UI/SkeletonLoader.vue";
import AlertError from "@/components/UI/AlertError.vue";
import CardAdd from "@/components/UI/CardAdd.vue";
import Cards from "@/components/UI/Cards.vue";

const activePanels = ref([]);

const emit = defineEmits([
  "update-selected-item",
  "update-new-item",
  "open-dialog-info",
  "add-item",
  "scroll-position-update",
  "open-dialog-delete",
]);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },

  error: {
    type: [String, Object],
    default: "",
  },
});

const openLink = (url) => {
  if (url) {
    window.open(url, "_blank");
  }
};

const uniqueTags = computed(() => {
  const tags = new Set();
  let hasNoTag = false;

  props.items.forEach((item) => {
    if (item.tags) {
      if (item.tags === null || item.tags === undefined) {
        hasNoTag = true;
      } else {
        tags.add(item.tags);
      }
    } else {
      hasNoTag = true;
    }
  });

  const sortedTags = Array.from(tags).sort((a, b) => a.localeCompare(b));
  if (hasNoTag) {
    sortedTags.push("Без тега");
  }

  return sortedTags;
});

const filteredItems = (tag) => {
  console.log("i222tem", props.items);
  if (tag == "Без тега") tag = null;
  return props.items.filter((item) => item.tags === tag);
};

const openDialogInfo = (item) => {
  emit("open-dialog-info", item);
};

const openEditDialog = (item) => {
  emit("update-selected-item", item);
};

const openDeleteDialog = (item) => {
  emit("open-dialog-delete", item);
};

const openAddDialog = (tag = null) => {
  emit("add-item", tag);
};
</script>

<style>
.small-icon {
  font-size: 20px;
}
.my-2 {
  margin: 8px 0;
}
.green-my {
  background-color: #388e3c !important;
}
</style>
