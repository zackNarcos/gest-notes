<template>
  <div
      class="dropdown dropdown-hover w-100"
  >
    <div class="flex text-center align-mid justify-between link text-sm md:text-md lg:text-lg my-1.5 mx-1 lg:mx-2 text-gray-600 hover:text-green-600">
      <label
          class="dropdown-label text-gray-500/75"
          tabindex="0"
      >
        {{ props.title }}
      </label>
      <Icon
          name="tdesign:chevron-down"
          class="w-4 lg:w-4"
          size="22"
      />
    </div>
    <div
        class="md:top-10 lg:top-12 dropdown-menu  bg-white shadow-md rounded-t-none rounded-b-xl"
        :class="props.direction"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: 'dropdown-menu-bottom-right',
  },
  title: {
    type: String,
    default: 'Menu',
  },
});

</script>

<style lang="scss" scoped>

.dropdown-label {
  cursor: pointer;
  //truncate text if too long and show ellipsis at the end
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  //max line 1
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  max-width: 90%;
  font-size: 14px;

}

.dropdown-menu {
  max-height: 15rem;
  overflow-y: auto;

//  remove scrollbar
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    //display: none;
  }

  // show only scrollbar when needed
  &::-webkit-scrollbar {
    width: 5px;
    display: block;
    background: #00dc82;
  }
}
</style>
