import React, { useEffect, useState } from 'react';
import './App.css';
import {ContentState, Editor, EditorState, Modifier, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';

function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
};


const styleMap = {
  'red-line': {
    color:'red',
  },
  'HIGHLIGHTED':{
    backgroundColor:'yellow',
  }
};

  useEffect(() => {
    // Load content from local storage on component mount
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent))));
    }
  }, []);
  
  const handleBeforeInput = (char) => {
    const currentContent = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const currentBlock = currentContent.getBlockForKey(selectionState.getStartKey());
    const currentText = currentBlock.getText();
    const currentBlockType = currentBlock.getType();
    const currentInlineStyles = editorState.getCurrentInlineStyle().toArray(); 
    console.log(currentText,currentBlockType,currentInlineStyles)
    if (currentText.slice(-1)=="#" && char === ' ' && currentBlockType.indexOf("header-one")==-1 ) {
      console.log(editorState)
      setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
      return 'handled';
    }
    else if (currentText.slice(-1)==" " && char === '#' && currentBlockType.indexOf("header-one")!=-1 ) {
      console.log(editorState)
      setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
      return 'handled';
    }
    
    else if (currentText.slice(-3)=="***" && char === ' ' && currentInlineStyles.indexOf("UNDERLINE")==-1 ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
      return 'handled';
    }
    else if (currentText.slice(-3)==" **" && char === '*' && currentInlineStyles.indexOf("UNDERLINE")!=-1 ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
      return 'handled';
    }
    else if (currentText.slice(-3)=="```" && char === ' ' && currentInlineStyles.indexOf("HIGHLIGHTED")==-1 ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHTED'));
      return 'handled';
    }
    else if (currentText.slice(-3)=="``" && char === '`' && currentInlineStyles.indexOf("HIGHLIGHTED")!=-1 ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHTED'));
      return 'handled';
    }
    else if (currentText.slice(-2)=="**" && char === ' ' && currentInlineStyles.indexOf("red-line")==-1 ) {
      const newEditorState = RichUtils.toggleInlineStyle(editorState, 'red-line');
            onChange(newEditorState);
            return 'handled';
      return 'handled';
    }
    else if (currentText.slice(-2)==" *" && char === '*' && currentInlineStyles.indexOf("red-line")!=-1 ) {
      const newEditorState = RichUtils.toggleInlineStyle(editorState, 'red-line');
            onChange(newEditorState);
            return 'handled';
      return 'handled';
    }
    else if (currentText.slice(-1)=="*" && char === ' ' && currentInlineStyles.indexOf("BOLD")==-1 ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
      return 'handled';
    }
    else if (currentText.slice(-1)==" " && char === '*' && currentInlineStyles.indexOf("BOLD")!=-1 ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
      return 'handled';
    }
    
    return 'not-handled';
  };
 


 

  return (
    <div className="App">
    <div style={{display:'flex',width:'80%',}}>
    <p style={{marginLeft:'42%',flex:8}}>Demo editor by Akash Paul</p>
    <button onClick={() => localStorage.setItem('editorContent', JSON.stringify(convertToRaw(editorState.getCurrentContent())))}>
        Save
      </button>    </div>
    <div className='editor-outer'>
      
    <div className='editor'>
      <Editor
        editorState={editorState}
        customStyleMap={styleMap}
        onChange={onChange}
        handleBeforeInput={handleBeforeInput}
      />
      {/* {console.log(editorState)} */}
    </div>
      </div>
    </div>
  );
}

export default App;
