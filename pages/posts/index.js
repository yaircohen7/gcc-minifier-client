import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";

export default function ListItems() {


    return (
        <List className={classes.root} minWidth="xl" style={{height:300,overflowY:'scroll'}}>
            {files.map((file) => {
                return (

                    <>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Single-line item"
                                secondary={'Secondary text'}
                            />

                            <Link href={`/posts/${file}`} key={file}>
                                <IconButton edge="end" aria-label="edit">
                                    <SettingsIcon />
                                </IconButton>
                            </Link>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                    </>
                )
            })}
        </List>
    );

}

