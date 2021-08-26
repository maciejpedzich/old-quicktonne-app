import { Ref } from 'vue';
import { Ace } from 'ace-builds';
import { VAceEditorInstance } from 'vue3-ace-editor/types';

type UseCodeEditorReturn = {
  codeEditorElement: Ref<VAceEditorInstance | undefined>;
  editorContent: Ref<string>;
  editorOptions: {
    [Property in keyof Ace.EditorOptions]?: Ace.EditorOptions[Property];
  };
  setEditorLanguage(language: string): Promise<void>;
  initRemoteEditingManagers(): void;
  removeRemoteEditingManagers(oldUsername: string): void;
  addRemoteChangeListeners(): void;
};

export default UseCodeEditorReturn;
