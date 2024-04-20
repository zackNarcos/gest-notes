<template>
  <div>
    <QuillEditor
      theme="snow"
      :toolbar="toolbar"
      :modules="modules"
      :value="props.modelValue"
      @update:content="onUpdateValue"
      content-type="html"
      style="min-height: 14rem; max-height: 24rem; overflow-y: auto; border: 0px"
      :placeholder="props.placeholder"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { QuillEditor } from "@vueup/vue-quill";
import ImageUploader from "quill-image-uploader";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css";

const props = defineProps({
  modelValue: String,
  placeholder: String,
});
const emit = defineEmits(["update:modelValue", "change"]);

const toolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["image", "link"],
  [{ align: [] }],
  ["clean"],
];

const modules = [
  {
    name: "imageUploader",
    module: ImageUploader,
    options: {
      upload: async (file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await axios.post("/upload/public", formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          });
          return response.data.file_url;

        } catch (err) {
          console.log(err);
        }
      },
    },
  },
];
const onUpdateValue = (content) => {
  emit("update:modelValue", content);
};
</script>
<style scoped lang="css">
:deep(.ql-toolbar.ql-snow) {
  border-top: 0;
  border-left: 0;

  border-right: 0px;
}
</style>

