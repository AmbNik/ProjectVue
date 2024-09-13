<template>
  <v-app>
    <!-- Sidebar navigation drawer -->
    <v-navigation-drawer v-model="drawer" app temporary width="300">
      <v-list dense>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          link
          @click="navigateTo(item.route)"
        >
          <v-list-item
            :prepend-icon="item.icon"
            :title="item.title"
          ></v-list-item>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App bar -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Search component -->
      <v-text-field
        v-model="searchQuery"
        label="Поиск"
        single-line
        hide-details
        Append
      ></v-text-field>
      <template v-slot:append>
        <v-btn icon="mdi-magnify"></v-btn>
      </template>
    </v-app-bar>

    <!-- Main content -->
    <router-view />
  </v-app>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBar from "@/components/navigation/SearchBar.vue"; // Adjust path as necessary

export default {
  components: {
    SearchBar,
  },
  setup() {
    const drawer = ref(false);
    const searchQuery = ref("");
    const router = useRouter();

    const menuItems = [
      { title: "Приложения", icon: "mdi-apps", route: "/applications" },
      { title: "Сервисы", icon: "mdi-server", route: "/services" },
      {
        title: "Виртуальные машины",
        icon: "mdi-virtual-reality",
        route: "/virtualmachines",
      },
    ];

    const navigateTo = (route) => {
      router.push(route);
    };

    return {
      drawer,
      menuItems,
      navigateTo,
      searchQuery,
    };
  },
};
</script>

<style>
.my-2 {
  margin-bottom: 16px;
}
</style>
