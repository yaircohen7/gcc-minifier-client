import React, {useState,useEffect} from "react";
import styles from './FileItem.module.css';
import {makeStyles} from "@material-ui/core/styles";
import CodeEditor from "./CodeEditor";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
const FileItem = (props) => {
    // const classes = useStyles();
    console.log('FileItem',props);
    // const [originalCode,set_originalCode] = useState(props.originalCode);
    // const [minifiedCode,set_minifiedCode] = useState(props.minifiedCode);
    // useEffect(() => {
    //     set_originalCode(props.originalCode);
    //     set_minifiedCode(props.minifiedCode);
    // },[props]);

    return (
        <Container maxWidth="xxl">
            <Box display="flex" justifyContent="center" flexDirection="row" className={styles.wrapper}>

                   <div>
                       <div>Original code</div>
                       <CodeEditor  code={props.originalCode} />
                   </div>

                    <div>
                        <div>Minified code</div>
                        <CodeEditor  code={props.minifiedCode} />
                    </div>

            </Box>
        </Container>
    );

};

export default FileItem;


