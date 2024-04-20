<template>
  <div>
    <MainLayout>
      <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" :content="title" />
      </Head>
      <div
        class="my-5 text-md md:text-lg lg:text-2xl font-semibold text-white"
      >
        {{ annexesTitle }}
      </div>
      <div
        class="relative mb-5 bg-gray-700 border shadow-sm sm:rounded-lg"
      >
        <!-- --- Start section action -->
        <div
          class="px-4 py-4 bg-gray flex sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"
        >
          <div>
            <span class="text-gray-100 text-sm mr-2">Action multiple</span>
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="inline-flex gap-1 w-full justify-between items-center rounded-md bg-gray-700 border-gray-400 border py-2 px-3 text-sm font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700/75"
                >
                  {{ selectedAction }}
                  <span class="icon-[mdi--chevron-down]"></span>
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute left-0 mt-2 w-28 origin-top-right divide-y divide-gray-300 rounded-md bg-gray-700 shadow-lg ring-1 ring-black/5 focus:outline-none"
                >
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="setAction('Publier')"
                        :class="[
                          active ? 'bg-gray-800 text-white' : 'text-gray-400',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]"
                      >
                        <span class="mr-2 h-5 w-5 icon-[mdi--file-move-outline"></span>
                        Publier
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="setAction('Dépublier')"
                        :class="[
                          active ? 'bg-gray-800 text-white' : 'text-gray-400',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]"
                      >
                        <span class="mr-2 h-5 w-5 icon-[mdi--file-move-inline"></span>
                        Dépublier
                      </button>
                    </MenuItem>
                  </div>
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="setAction('Supprimer')"
                        :class="[
                          active ? 'bg-gray-800 text-white' : 'text-gray-400',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]"
                      >
                        <Icon
                          name="bi:trash3"
                          :active="active"
                          class="mr-2 h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                        Supprimer
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <button
                v-if="selectedAction === 'Ordonner'"
                @click="applyAction()"
                class="ml-3 inline-flex items-center text-white focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-3 py-2"
                :class="'bg-primary hover:bg-primary-light'"
            >
              Appliquer
            </button>
            <button
                v-else
                @click="(selectedAction === 'Séléctionner' || selectedAnnexes.length <= 0) ? null : applyAction()"
                class="ml-3 inline-flex items-center text-white focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-3 py-2"
                :class="(selectedAction === 'Séléctionner' || selectedAnnexes.length <= 0) ? 'bg-gray-800/50' : 'bg-gray-800 hover:bg-gray-900'"
            >
              Appliquer
            </button>
          </div>
          <div class="d-flex items-center justify-end gap-3">
            <div class="d-flex flex-inline justify-end gap-1">
              <div class="relative">
                <input
                    v-model="search"
                    @change="fetchPaginatedAnnexes()"
                    type="text"
                    id="table-search"
                    class="max-w-26 py-2 px-3 pe-5 block bg-white border focus:outline-none rounded-lg text-sm text-gray-500 focus:ring-1 focus:border-gray-200 focus:ring-gray-300 placeholder:text-gray-400"
                    placeholder="Rechercher"
                />
              </div>
              <button
                  @click="( !search || search === '') ? null : fetchPaginatedAnnexes()"
                  class=" items-center text-white focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-3 py-2"
                  :class="( !search || search === '') ? 'bg-gray-800/50' : 'bg-gray-800 hover:bg-gray-700'"
              >
                Rechercher
              </button>
            </div>
            <button
                @click="showAddNewModal()"
                class=" text-white bg-gray-800 focus:outline-none hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-3 py-2"
            >
              <span class="icon-[mdi--plus"></span> Ajouter
            </button>
          </div>
        </div>
        <Modal
          :annexe="annexesModel"
          v-model="showModal"
          @close="onModalClose"
          @refresh="refreshDatas"
        />
        <!-- --- End section action -->

        <!-- --- Start section table -->
        <table class="w-full text-sm text-left rtl:text-white text-white">
          <thead
            class="text-xs text-white uppercase bg-gray-800/75 border-t border-b"
          >
            <tr>
              <th scope="col" class="px-6 py-3 text-primary font-light">
                <input
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-green-600 accent-green-700 checkbox"
                    :class="{ 'checkbox-checked' :  selectedModel }"
                    @change=" toggleAll"
                    v-model="selectedModel"
                />
              </th>

              <th scope="col" class="px-6 py-3 text-primary font-light">
                Année
                <Icon
                  name="uil:sort"
                  @click=" sortAnnexes('Label')"
                  class="cursor-pointer"
                  size="16"
                />
              </th>
              <th scope="col" class="px-6 py-3 text-primary font-light">
                <div class="flex items-center">
                  Date de création
                  <Icon
                    name="uil:sort"
                    @click=" sortAnnexes('created_at')"
                    class="cursor-pointer"
                    size="16"
                  />
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-primary font-light">
                Statut
              </th>
              <th
                scope="col"
                class="text-right px-6 py-3 text-primary font-light"
              >
                Actions
              </th>
            </tr>
          </thead>
          <!-- --- Start section table body without data --- -->
          <tbody v-if="years.loading || !years.data.length">
            <!-- Skeleton -->
            <tr class="border-b bg-gray-700 hover:bg-gray-100 h-12" v-if="years.loading" v-for="i of [1,4,5,6,7,8]" :key="i">
              <td class="text-center ps-4"><VaSkeleton variant="rounded" inline width="40px" height="28px"/></td>
              <td class="text-center ps-4"><VaSkeleton variant="rounded" inline width="110px" height="28px"/></td>
              <td class="text-center ps-4"><VaSkeleton variant="rounded" inline width="90px" height="28px"/></td>
              <td class="text-center ps-4"><VaSkeleton variant="rounded" inline width="90px" height="28px"/></td>
              <td class="text-center pe-4"><VaSkeleton class="ms-auto" variant="rounded" inline width="40px" height="28px"/></td>
            </tr>
            <!-- No data -->
            <tr class="border-b bg-gray-700 hover:bg-gray-100" v-else >
            <td colspan="5">
              <p class="text-center py-8 text-white">
                Pas de Données trouvées
              </p>
            </td>
          </tr>
          </tbody>
          <!-- --- Start section table body with data --- -->
          <tbody v-else>
            <tr
              v-for="annexe in years.data"
              :key="annexe.id"
              :class="{
                'bg-gray-600/10': annexe.selected,
                'bg-gray-700': !annexe.selected,
                'border-b  ': true,
              }"
          >
            <th class="px-6">
              <input
                  type="checkbox"
                  v-model="annexe.selected"
                  :class="{ 'checkbox-checked': annexe.selected }"
                  class="form-checkbox h-4 w-4 text-primary accent-green-700 checkbox"
                  @input="toggleSelection(annexe)"
              />
            </th>
            <th
                scope="row"
                class="px-6 text-md font-medium text-gray-300 whitespace-nowrap"
            >
              {{ annexe.label }}
            </th>
            <td class="px-6 text-md text-gray-300">
              {{ formatDate(annexe.createdAt) }}
            </td>
            <td class="px-6 pt-2">
              <VaSwitch
                  size="small"
                  @click="togglePublished(annexe)"
                  v-model="annexe.isPublished"
                  true-label="En ligne"
                  false-label="Hors ligne"
              />
            </td>
            <td class="px-6 text-right">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                      class="inline-flex items-center justify-center rounded-full w-10 h-10 bg-black bg-opacity-0 text-sm font-medium text-white hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <span class="text-xl icon-[mdi--dots-vertical]"></span>
                  </MenuButton>
                </div>
                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                      class="absolute top-5 z-10 right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                        <button
                            @click="edit(annexe)"
                            :class="[
                              active
                                ? 'bg-gray-600 text-white'
                                : 'text-gray-300',
                              'group gap-1 flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                        >
                          <Icon name="uil:edit" size="14" />Modifier
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button
                            @click="deleteAnnexe(annexe)"
                            :class="[
                              active
                                ? 'bg-gray-600 text-white'
                                : 'text-gray-300',
                              'group gap-1 flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]"
                        >
                          <Icon name="uil:trash-alt" size="14" />Supprimer
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </td>
          </tr>
          </tbody>
          <!-- editabled -->

        </table>
        <!-- --- End section table -->

      </div>
    </MainLayout>
  </div>
</template>

<script setup>
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {formatDate} from "@/utils/helpers.js";
import {storeToRefs} from "pinia";
import MainLayout from "@/layouts/MainLayout.vue";
import {Icon} from "@iconify/vue";
import {onMounted, ref} from "vue";
import {useYearsStore} from "@/stores/year.js";
import $swal from "sweetalert2";
import Modal from "@/views/annees/Modal.vue";

const $annexesStore = useYearsStore();
const { years } = storeToRefs($annexesStore);
const annexesTitle = ref("Annees");
const title = ref("Gest Notes " + annexesTitle.value);
const search = ref(null);
const selectedAnnexes = ref([]);
const sortField = ref("label");
const sortDirection = ref("desc");
const selectedAction = ref("Séléctionner");
const  selectedModel = ref(false);

const DEFAULT_ANNEXE = {
  id: null,
  label: "",
  isPublished: false,
};

const  annexesModel = ref({ ...DEFAULT_ANNEXE });

const  showModal = ref(false);

const setAction = (action) => {
  selectedAction.value = action;
};

const  toggleAll = () => {
  if (selectedAnnexes.value.length === $annexesStore.years.data.length) {
    selectedAnnexes.value = [];
    $annexesStore.years.data.forEach((annexe) => {
      annexe.selected = false;
    });
     selectedModel.value = false
  } else {
    selectedAnnexes.value = [];
    $annexesStore.years.data.forEach((annexe) => {
      annexe.selected = true;
      selectedAnnexes.value.push(annexe);
    });
     selectedModel.value = true
  }
};

const onModalClose = () => {
   annexesModel.value = { ...DEFAULT_ANNEXE };
};

const showAddNewModal = () => {
   showModal.value = true;
};

const edit = async (annexe) => {
  try {
    annexesModel.value = await $annexesStore.get(annexe.id);
    showModal.value = true;
    showAddNewModal();
  } catch (error) {
    console.log(error);
  }
};

const deleteAnnexe = async (annexe) => {
  try {
    const result = await $swal.fire({
      title: "Êtes vous sur de vouloir supprimer?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#15803d",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
    });
    if (result.isConfirmed) {
      const res = await $annexesStore.delete(annexe);
      if (res.success) {
        await $swal.fire({
          title: "Annexe général supprimé avec succès",
          icon: "success",
          confirmButtonColor: "#15803d",
        });
      }
        await fetchPaginatedAnnexes();

    }
  } catch (error) {
    console.log(error);
  }
};

const published = async () => {
  if (selectedAnnexes.value.length === 0) {
    $swal.fire({
      position: "center",
      icon: "warning",
      title: "Sélectionner des données",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  try {
    const res = await $annexesStore.publishedAll(selectedAnnexes.value);
    if (res.status === 200) {
      $annexesStore.years.data.map((c) => {
        selectedAnnexes.value.map((s) => {
          if (s.id === c.id)
            c.isPublished= true
          return c
        })
      })
      selectedAnnexes.value.map((c) => {
        c.selected = false;
      });
      selectedAnnexes.value = [];
      selectedAction.value = "Sélectionner";
       selectedModel.value = false
    }
  } catch (err) {
    console.log(err);
  }
};

const unPublished = async () => {
  if (selectedAnnexes.value.length === 0) {
    await $swal.fire({
      position: "center",
      icon: "warning",
      title: "Sélectionner des données",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  try {
    const res = await $annexesStore.unPublishedAll(selectedAnnexes.value);
    if (res.status === 200) {
      $annexesStore.years.data.map((c) => {
        selectedAnnexes.value.map((s) => {
          if (s.id === c.id)
            c.isPublished= false
          return c
        })
      })
      selectedAnnexes.value.map((c) => {
        c.selected = false;
      });
      selectedAnnexes.value = [];
      selectedAction.value = "Sélectionner";
       selectedModel.value = false
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteAll = async () => {
  if (selectedAnnexes.value.length === 0) {
    await $swal.fire({
      position: "center",
      icon: "warning",
      title: "Sélectionner des données",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    $swal
      .fire({
        title: "Êtes vous sur de vouloir tous les supprimer?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#15803d",
        cancelButtonColor: "#d33",
        cancelButtonText: "Annuler",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await $annexesStore.deleteAll(selectedAnnexes.value);
            if (res.success) {
              selectedAnnexes.value = [];
              selectedAction.value = "Sélectionner";
              $swal.fire({
                title: "Annexes supprimés avec succès",
                icon: "success",
                confirmButtonColor: "#15803d",
              });
            }
              await fetchPaginatedAnnexes();
          } catch (err) {
            console.log(err);
          }
        }
      });
  }
};


const publishedOne = async (annexe) => {
  if (!annexe) {
    await $swal.fire({
      position: "center",
      icon: "warning",
      title: "Aucun id ! mise à jour impossible",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  try {
    const res = await $annexesStore.publishedOne(annexe);
    if (res.status !== 200) {
      $annexesStore.years.data.map((c) => {
        if (annexe.id === c.id)
          c.isPublished = false
        return c
      })
    }
  } catch (err) {
    console.log(err);
  }
};
const unpublishedOne = async (annexe) => {
  if (!annexe) {
    await $swal.fire({
      position: "center",
      icon: "warning",
      title: "Aucun id ! mise à jour impossible",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  try {
    console.log(annexe.isPublished)
    const res = await $annexesStore.unPublishedOne(annexe);
    if (res.status !== 200) {
      $annexesStore.years.data.map((c) => {
        if (annexe.id === c.id)
          c.isPublished = true
        return c
      })
    }
  } catch (err) {
    console.log(err);
  }
};

const applyAction = async () => {
  if (selectedAction.value) {
    switch (selectedAction.value) {
      case "Publier":
        await published();
        break;
      case "Dépublier":
        await unPublished();
        break;
      case "Supprimer":
        await deleteAll();
        break;
    }
  }
};

const togglePublished = async (annexe) => {
  console.log(annexe.isPublished)
  if (annexe.isPublished === false) {
    await unpublishedOne(annexe);
  } else {
    await publishedOne(annexe);
  }
};

const toggleSelection = (annexe) => {
  annexe.selected = !annexe.selected;
  if (annexe.selected) {
    selectedAnnexes.value.push(annexe);
  } else {
    selectedAnnexes.value = selectedAnnexes.value.filter((n) => annexe.id !== annexe.id);
  }
};

const refreshDatas = async () => {
  await fetchPaginatedAnnexes();
};

const  sortAnnexes = (field) => {
  if (field === sortField.value) {
    if (sortDirection.value === "desc") {
      sortDirection.value = "asc";
    } else {
      sortDirection.value = "desc";
    }
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
  fetchPaginatedAnnexes();
};

const fetchPaginatedAnnexes = async () => {
  let params = {};
  params = {
    label: search.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value,
  }
  try {
    await $annexesStore.getAll(params);
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  await fetchPaginatedAnnexes();
});
</script>
<style scoped>
.checkbox {
  @apply dark:bg-white dark:border-gray-400 rounded-sm p-2;
}
.checkbox-checked {
  @apply bg-green-600 border-green-600 rounded-sm p-2;
}
</style>