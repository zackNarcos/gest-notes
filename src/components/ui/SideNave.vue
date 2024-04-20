<template>
  <div class="px-3 py-2">
    <div class=" rounded w-full h-12 text-[38px] text-pink-600 text-center py-1.5 capitalize font-bold">
      zack
    </div>
    <div class="flex flex-col gap-2 mt-20">
      <RouterLink class="d-flex items-center px-7 gap-2 py-2.5 rounded text-white font-normal"
                  v-for="item in items"
                  :key="item.title"
                  :to="item.to"
                  :class="isActive(item.to) ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : ' bg-gray-800'"
      >
        <span :class="`icon-${item.icon}`" class="text-[24px]"></span>
        <span class="text-[18px]">{{ item.title }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const items = ref([
  {
    icon: 'mdi--home',
    title: 'Dashboard',
    to: '/',
  },
  {
    icon: 'mdi--account',
    title: 'Matières',
    to: '/matieres',
  },
  {
    icon: 'mdi--account',
    title: 'Notes',
    to: '/',
  },
  {
    icon: 'mdi--account',
    title: 'Classes',
    to: '/classes',
  },
  {
    icon: 'mdi--account',
    title: 'Etudiants',
    to: '/etudiants',
  },
  {
    icon: 'mdi--account',
    title: 'Année scolaire',
    to: '/annees',
  },
]);

const isActive = (to) => route.path === to;
</script>

