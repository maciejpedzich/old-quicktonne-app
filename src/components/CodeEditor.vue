<template>
  <VAceEditor
    ref="codeEditorElement"
    class="flex-grow-1"
    theme="twilight"
    :printMargin="false"
    :options="editorOptions"
    v-model:value="editorContent"
  ></VAceEditor>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, watch } from 'vue';

import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-min-noconflict/theme-twilight';
import '@convergencelabs/ace-collab-ext/dist/css/ace-collab-ext.min.css';

import useCodeEditor from '@/composables/useCodeEditor';

export default defineComponent({
  name: 'CodeEditor',
  components: {
    VAceEditor
  },
  props: {
    partnerUsername: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { partnerUsername, language } = toRefs(props);

    const {
      codeEditorElement,
      editorContent,
      editorOptions,
      setEditorLanguage,
      initRemoteEditingManagers,
      removeRemoteEditingManagers,
      addRemoteChangeListeners
    } = useCodeEditor(partnerUsername);

    onMounted(() => {
      setEditorLanguage(language.value);
      addRemoteChangeListeners();

      partnerUsername.value.length > 0 && initRemoteEditingManagers();
    });

    watch(partnerUsername, (newUsername, oldUsername) => {
      oldUsername.length > 0 && removeRemoteEditingManagers(oldUsername);
      newUsername.length > 0 && initRemoteEditingManagers();
    });

    return { codeEditorElement, editorContent, editorOptions };
  }
});
</script>
