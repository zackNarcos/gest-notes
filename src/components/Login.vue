<template>
  <div
    class="mx-4 pt-20 w-2/3 mx-auto bg-gray-700 rounded-xl text-white d-flex items-center justify-center flex-col py-10"
  >
    <div>
      <RouterLink to="/" class="text-3xl flex items-center justify-center md:mt-5 gap-3">
        Gest Notes
      </RouterLink>
    </div>
    <div class="px-16 ">
    <h2 class="py-2 text-2xl mt-5 text-pink-500 text-center">Bienvenue</h2>
    <p class="text-gray-300 text-sm">
      Vueillez vous connecter pour accéder à votre espace
    </p>
    <div class="py-4 w-full">
      <label class="text-sm text-gray-300">Email</label>
      <va-input
          clearable
          v-model="email"
          placeholder="exemple@domaine.com"
          class="capitalize w-full"
      />
    </div>
    <div class="pb-2">
      <label class="text-sm text-gray-300">Mot de passe</label>
      <va-value v-slot="isPasswordVisible" :default-value="false">
        <va-input
            clearable
            v-model="password"
            :type="isPasswordVisible.value ? 'text' : 'password'"
            placeholder="********"
            @click-append-inner="
                isPasswordVisible.value = !isPasswordVisible.value
              "
            class="capitalize w-full"
        >
          <template #appendInner>
            <va-icon
                :name="
                    isPasswordVisible.value ? 'visibility_off' : 'visibility'
                  "
                size="small"
                color="secondary"
            />
          </template>
        </va-input>
      </va-value>
    </div>
    <div class="pb-2 mt-6">
      <button
          @click="login"
          :disabled="isButtonDisabled"
          block
          class="text-xl py-3 text-center w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        Connexion
      </button>
    </div>
  </div>

  </div>
</template>

<script setup>
import {useAuthedUserStore} from "@/stores/authedUser.js";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
const authedUserStore = useAuthedUserStore();


let email = ref("zackabess@gmail.com");
let password = ref("admin");
let errors = ref(null);

const isButtonDisabled = computed(() => {
  return !email.value || !password.value;
});
const router = useRouter();
const login = async () => {
  try {
    await authedUserStore.login(email.value, password.value);
    if (authedUserStore.isAuthenticated) {
      await router.push("/");
    }
  } catch (error) {
    errors.value = error.response.data.message;
  }
};

</script>
