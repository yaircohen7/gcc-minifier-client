import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-twilight.css"; //Example style, you can use another

import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
const styles = {
    root: {
        boxSizing: 'border-box',
        fontFamily: '"Dank Mono", "Fira Code", monospace',
       // maxHeight:'500px',
        maxWidth:'45%',
        overflowY:'scroll',
        position:'relative',
        // ...theme.plain
    }
}

const CodeEditor = (props) => {
    console.log('CodeEditor',props);
    const [code, setCode] = useState("");
    useEffect(() => {
        console.log('CodeEditor',props);
        setCode(props.code);
    },[props.code]);
    return (
       <Container>
           <Editor
               value={code}
               onValueChange={(code) => {
                   setCode(code);
                   if(props.updateCode){
                       props.updateCode(code);
                   }
               }
               }
               highlight={(code) => highlight(code, languages.js)}
               padding={10}

           />
       </Container>
    );
};

export default CodeEditor;
