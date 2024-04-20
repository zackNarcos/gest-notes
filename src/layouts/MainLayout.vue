<template>
  <div class="w-full flex h-svh bg-gray-800">
    <div class="w-56 h-full bg-gray-900">
      <SideNave />
    </div>
    <div class="w-10/12 p-2">
      <div class="bg-gray-700 rounded-lg py-2 px-3 text-white">
        <div
            class="grid d-flex gap-4 items-center justify-between"
        >
          <div class="col-span-4">
            <VaInput
                v-model="search"
                class="w-full"
                placeholder="Rechercher"
            >
              <template #prependInner>
                <VaIcon
                    name="search"
                    color="secondary"
                    size="large"
                />
              </template>
            </VaInput>
          </div>
          <div class="flex items-center gap-3">
            <span class="icon-[mdi--bell] text-[24px] "></span>
            <span class="icon-[mdi--settings] text-[24px] "></span>
          </div>
        </div>
      </div>
      <div class="py-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import SideNave from "@/components/ui/SideNave.vue";

const search = ref('');
</script>


