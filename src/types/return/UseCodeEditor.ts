import { Ref } from 'vue';
import { Ace } from 'ace-builds';
import { VAceEditorInstance } from 'vue3-ace-editor/types';

type UseCodeEditorReturn = {
  codeEditor: Ref<VAceEditorInstance | undefined>;
  editorContent: Ref<string>;
  editorOptions: {
    [Property in keyof Ace.EditorOptions]?: Ace.EditorOptions[Property];
  };
};

export default UseCodeEditorReturn;
