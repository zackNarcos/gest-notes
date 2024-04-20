<script setup>
import {RouterView, useRouter} from 'vue-router'

import { onMounted } from 'vue'
import { useAuthedUserStore } from '@/stores/authedUser.js'

const authedUserStore = useAuthedUserStore()
const router = useRouter()
onMounted(() => {
  if (authedUserStore.isAuthenticated) {
    router.push('/')
  } else {
    router.push('/login')
  }
})
</script>

<template>
  <RouterView />
</template>

