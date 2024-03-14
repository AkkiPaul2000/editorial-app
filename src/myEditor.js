import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding} from 'draft-js';
import './editor.css'
 
export default function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };



  const handleBeforeInput = (char) => {
    
    // if (char === '#') {
    //   setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
    //   return 'handled';
    // }
    if (char === '*') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
      return 'handled';
    }
    if (char === '#') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
      return 'handled';
    }
    if (char === '$') {
      setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
      return 'handled';
    }
    return 'not-handled';
  };
  return (
    <div className='editor'>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        handleBeforeInput={handleBeforeInput}
      />
      {/* {console.log(editorState)} */}
    </div>
  );
}

//////////////////

