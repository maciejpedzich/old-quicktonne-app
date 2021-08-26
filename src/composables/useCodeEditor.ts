import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import { VAceEditorInstance } from 'vue3-ace-editor/types';
import { AceMultiCursorManager } from '@convergencelabs/ace-collab-ext';
import { Ace } from 'ace-builds';
import { debounce } from 'debounce';

import socket from '@/socket';
import DebouncedFunction from '@/types/DebouncedFunction';
import UseCodeEditorReturn from '@/types/return/UseCodeEditor';

let cursorManager: AceMultiCursorManager | null = null;
let emitCursorChange: DebouncedFunction | null = null;
let emitContentChange: DebouncedFunction | null = null;

export default function useCodeEditor(
  partnerUsername: Ref<string>
): UseCodeEditorReturn {
  const route = useRoute();
  const roomId = route.params.roomId as string;

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

  const initRemoteEditingManagers = () => {
    const editor = codeEditorElement.value?._editor as Ace.Editor;
    cursorManager = new AceMultiCursorManager(editor.session);

    cursorManager.addCursor(
      partnerUsername.value,
      partnerUsername.value,
      '#1c80cf',
      { row: 0, column: 0 }
    );

    emitCursorChange = debounce(
      () =>
        socket.emit(
          'incomingCursorChange',
          roomId,
          editor.selection.getCursor()
        ),
      200
    );

    emitContentChange = debounce(
      () => socket.emit('incomingContentChange', roomId, editorContent.value),
      200
    );

    editor.on(
      'input',
      // We need this weird type annotation for signatures to match
      emitContentChange as (() => void) & { clear(): void; flush(): void }
    );
    editor.session.selection.on('changeCursor', emitCursorChange);
  };

  const removeRemoteEditingManagers = (oldUsername: string) => {
    const editor = codeEditorElement.value?._editor as Ace.Editor;

    cursorManager?.removeCursor(oldUsername);

    editor.session.selection.off(
      'changeCursor',
      emitCursorChange as DebouncedFunction
    );
    editor.off('input', emitContentChange as DebouncedFunction);

    emitCursorChange = null;
    emitContentChange = null;
    cursorManager = null;
  };

  const addRemoteChangeListeners = () => {
    socket.on('remoteCursorChange', (location: Ace.Point) => {
      cursorManager?.setCursor(partnerUsername.value, location);
    });

    socket.on(
      'contentChange',
      (content: string) => (editorContent.value = content)
    );
  };

  return {
    codeEditorElement,
    editorContent,
    editorOptions,
    setEditorLanguage,
    initRemoteEditingManagers,
    removeRemoteEditingManagers,
    addRemoteChangeListeners
  };
}
