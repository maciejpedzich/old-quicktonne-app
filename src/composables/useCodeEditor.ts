import { ref } from 'vue';
import { VAceEditorInstance } from 'vue3-ace-editor/types';

import UseCodeEditorReturn from '@/types/return/UseCodeEditor';

export default function useCodeEditor(): UseCodeEditorReturn {
  const codeEditor = ref<VAceEditorInstance | undefined>();
  const editorContent = ref('');
  const editorOptions = { fontSize: 18 };

  return { codeEditor, editorContent, editorOptions };
}
