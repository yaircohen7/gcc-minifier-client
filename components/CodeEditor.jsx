import React, { useState, useEffect } from "react";
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
const styles = {
    root: {
        boxSizing: 'border-box',
        fontFamily: '"Dank Mono", "Fira Code", monospace',
        ...theme.plain
    }
}

const CodeEditor = (props) => {
    const [content, setContent] = useState(props.content);
    const highlight = code => (
        <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <React.Fragment>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                        </div>
                    ))}
                </React.Fragment>
            )}
        </Highlight>
    )


        return (
            <Editor
                value={content}
                onValueChange={setContent}
                highlight={highlight}
                padding={10}
                style={styles.root}
            />
        )
};

export default CodeEditor;
