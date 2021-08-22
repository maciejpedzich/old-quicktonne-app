import { ref } from 'vue';
import { VAceEditorInstance } from 'vue3-ace-editor/types';

import UseCodeEditorReturn from '@/types/return/UseCodeEditor';

export default function useCodeEditor(): UseCodeEditorReturn {
  const codeEditorElement = ref<VAceEditorInstance | undefined>();
  const editorContent = ref('');
  const editorOptions = { fontSize: 18 };

  const setEditorLanguage = async (language: string) => {
    await import(
      /* @vite-ignore */
      `../../node_modules/ace-builds/src-noconflict/mode-${language}`
    );

    codeEditorElement.value?._editor
      .getSession()
      .setMode(`ace/mode/${language}`);
  };

  return { codeEditorElement, editorContent, editorOptions, setEditorLanguage };
}
