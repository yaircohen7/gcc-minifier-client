import Head from 'next/head'
import Link from 'next/link';
import React, {useState, useRef, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import FastForwardIcon from '@material-ui/icons/FastForward';
import {Container} from "@material-ui/core";
import http from "../../api/client";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minWidth: 360,
        maxHeight:300,
        backgroundColor: theme.palette.background.paper,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Archives() {
    const classes = useStyles();
    const [files,setFiles] = useState([]);
    useEffect(() => {
        const axiosObject = {
            url: `/`,
            method: "GET"
        };
        http(axiosObject)
            .then(response => {
                console.log(response.data);
                setFiles(response.data.response);
            })
            .catch(error => {
                console.log(error.response);

            });


    }, []);
    return (
        <Container>
            <List className={classes.root}>

                    {files.map((file)=>{
                        return (
                            <ListItem key={file[0]}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={file[1].files[0]} secondary={'Last modified '+new Date(file[1].timestamps.mTime).toLocaleString()} />
                                <Link href={`/posts/${file[0]}`}>
                                    <FastForwardIcon />
                                </Link>
                            </ListItem>

                        );
                    })}
            </List>
        </Container>
    );
}