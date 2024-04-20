<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-40" @close="show = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
      </TransitionChild>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
          class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-pink-600 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:max-w-[400px] sm:w-full"
            >

              <!-- spiner tailwindcss -->
              <Icon v-if="loading" name="spinner"
                    class="absolute left-0 top-0 bg-white right-0 bottom-0 flex items-center justify-center w-10 h-10 text-primary animate-spin" />
              <header
                class="relative py-3 px-4 flex justify-between items-center"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg leading-6 font-bold text-gray-900"
                >
                  {{
                    annexe.id
                      ? `Mettre à jour un annexe"`
                      : "Créer un nouvelle annexe"
                  }}
                </DialogTitle>
                <button
                  @click="closeModal()"
                  class="absolute bg-gray-700 shadow-md -top-2 -right-2 w-8 h-8 flex items-center justify-center text-gray-400 rounded-md transition-colors cursor-pointer hover:bg-primary hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </header>
              <form @submit.prevent="onSubmit">
                <div class="bg-gray-700 text-white px-4 pt-5 pb-4">
                  <div class="flex flex-direction-column">
                    <span class="mb-2">Classe<span class="text-red-500  text-[18px]"> *</span></span>
                    <VaInput v-model="annexe.label"
                              placeholder="Saisir un nom de classe"
                    />
                  </div>
                  <div class="flex flex-direction-column mt-2 z-20">
                    <span class="mb-2">Année<span class="text-red-500  text-[18px]"> *</span></span>
                    <VaSelect v-model="selecteYear"
                              :options="allYears"
                              :text-by="option => option.text"
                              placeholder="Sélectionner une année"
                              searchable
                    />
                  </div>
                </div>
                <footer
                  class="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                >
                  <button
                    :disabled="!annexe.label"
                    type="submit"
                    :class="(!annexe.label) ? 'bg-pink-700/50 hover:bg-pink-800/50' : 'bg-pink-600 hover:bg-pink-700'"
                    class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-md bg-primary hover:bg-primary-light focus:ring-primary"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    class="mt-3 w-full inline-flex justify-center font-medium rounded-md shadow-sm px-4 py-2 bg-gray-200 text-gray-600 font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-md"
                    @click="closeModal"
                    ref="cancelButtonRef"
                  >
                    Annuler
                  </button>
                </footer>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {computed, onMounted, onUpdated, ref} from "vue";
import {useYearsStore} from "@/stores/year.js";
import {Icon} from "@iconify/vue";
import {useClasseStore} from "@/stores/classe.js";

const $yearsStore = useYearsStore();
const $annexesStore = useClasseStore();
const props = defineProps({
  modelValue: Boolean,
  annexe: {
    required: true,
    type: Object,
  },
});


const isEdit = ref(false);
const loading = ref(false);
const errors = ref([]);
const allYears = ref([{
  text: "Sélectionner une année",
  value: null,
}]);
const selecteYear = ref({text: "Sélectionner une année", value: null});
const emit = defineEmits(["update:modelValue", "close"]);

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

onUpdated(async () => {
  await $yearsStore.getAll();
  $yearsStore.years.data.forEach((year) => {
    if (year.id === props.annexe.yearsId) {
      selecteYear.value = {text: year.label, value: year.id};
    }
  });
  annexe.value = {
    id: props.annexe.id,
    label: props.annexe.label,
    year: selecteYear.value,
  };
  isEdit.value = !!props.annexe.id;
  return annexe.value;
});

const annexe = ref({
  id: props.annexe.id,
  label: props.annexe.label,
  year: selecteYear.value,
});

const closeModal = () => {
  annexe.value = {
    id: props.annexe.id,
    label: props.annexe.label,
    year: selecteYear.value,
  };

  show.value = false;
  errors.value = [];
  emit("close");
};
const onSubmit = () => {
  loading.value = true;
  let tmpAnnexe = {
    id: annexe.value.id,
    label: annexe.value.label,
    yearsId: selecteYear.value.value,
  };

  if (tmpAnnexe.id) {
    $annexesStore.update(tmpAnnexe).then(() => {
      loading.value = false;
      emit("refresh");
      closeModal();
    });
  } else {
    $annexesStore
      .create(tmpAnnexe)
      .then(() => {
        loading.value = false;
        emit("refresh");
        closeModal();
      })
      .catch((err) => {
        loading.value = false;
        errors.value = err.response.data.errors;
      });
  }
};

onMounted(async () => {
  await $yearsStore.getAll();
  $yearsStore.years.data.forEach((year) => {
    if (year.id === props.annexe.yearsId) {
      selecteYear.value = {text: year.label, value: year.id};
    }
  });
  allYears.value = $yearsStore.years.data.map((year) => {
    return {text: year.label, value: year.id};
  });
  annexe.value = {
    id: props.annexe.id,
    label: props.annexe.label,
    year: selecteYear.value,
  };
  isEdit.value = !!props.annexe.id;
  return annexe.value;
});
</script>
