import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from '../styles/Home.module.css'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, {useState,useRef} from "react";
import FileUpload from "../components/FileUpload";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';


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
    fileBoxContainer:{
        width: 600, color: 'black', padding: 20, margin:'0 auto'
    },
    archivesLink: {
        display: 'block',
        textAlign: 'center',
        padding: 10,
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 14,
    }
}));

export default function Home() {
   const router = useRouter();
  const classes = useStyles();

    const [loader, setLoader] = React.useState(false);
 // const styles = {  width: 600, color: 'black', padding: 20, margin:'0 auto' };



  return (
    <div className={styles.container}>
      <Head>
        <title>Shrink it!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <BottomNavigation
            value={0}
            showLabels
            className="navigation"
        >

            <BottomNavigationAction label="Upload" icon={<RestoreIcon />} onClick={()=> router.push("/")}/>
            <BottomNavigationAction label="Archives" icon={<FavoriteIcon />} onClick={()=> router.push("/archives")}/>
        </BottomNavigation>
        <div className="title">SHRINK IT</div>
      <main className={styles.fileBoxContainer}>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl">
           <div style={styles}>
              <FileUpload  />
           </div>
          </Container>
        </React.Fragment>
          <Link href="/archives">
              <div className={styles.archivesLink}>
                  Or check our <span>archives!</span>
              </div>
          </Link>
      </main>
    </div>
  )
}
