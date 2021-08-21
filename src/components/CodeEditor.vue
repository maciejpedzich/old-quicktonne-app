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
import { defineComponent, onMounted } from 'vue';

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
    language: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const {
      codeEditorElement,
      editorContent,
      editorOptions,
      setEditorLanguage
    } = useCodeEditor();

    onMounted(() => setEditorLanguage(props.language));

    return { codeEditorElement, editorContent, editorOptions };
  }
});
</script>
