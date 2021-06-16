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

    return (
        <Container >
            <Box className={styles.wrapper}>

                   <div className={styles.codeWrapper}>
                       <div>Original code  - {props.originalTitle}</div>
                       <CodeEditor  code={props.originalCode} />
                   </div>

                    <div className={styles.codeWrapper}>
                        <div>Minified code - {props.minifiedTitle}</div>
                        <CodeEditor  code={props.minifiedCode} />
                    </div>

            </Box>
        </Container>
    );

};

export default FileItem;


