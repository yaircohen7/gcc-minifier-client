import Head from 'next/head'
import Link from 'next/link';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from '../styles/Home.module.css'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, {useState,useRef} from "react";
import FileUpload from "../components/FileUpload";


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

export default function Home() {
  const classes = useStyles();
  const styles = {  width: 600, color: 'black', padding: 20, margin:'0 auto' };



  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl">
           <div style={styles}>
              <FileUpload  />
           </div>
          </Container>
        </React.Fragment>
          <Link href="/archives">Or check our archives!</Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         Made by YC
        </a>
      </footer>
    </div>
  )
}
