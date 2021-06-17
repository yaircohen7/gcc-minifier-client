import React, { useState } from "react";
import Router from 'next/router';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css'
import { Alert, AlertTitle } from '@material-ui/lab';
import { toast, ToastContainer } from 'react-nextjs-toast';
import Container from "@material-ui/core/Container";
import Loader from "../components/Loader";

const UploadFiles = () => {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [errorMsg,set_errorMsg] = useState(false);
    const [loader,setLoader] = useState(false);

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
        setLoader(true);
    };
    const getUploadParams = ({ file, meta }) => {
        const body = new FormData()
        body.append('file', file)
        return { url: process.env.baseUrl + '/upload', body }
    }
    const handleChangeStatus = ({meta, remove, xhr}, status) => {
        switch (status) {
            case 'uploading' :
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status > 399) {
                        try {
                            set_errorMsg(JSON.parse(xhr.responseText).response);
                        } catch (e) {
                            console.log(e);
                        }
                        setLoader(false);
                    }
                    if (xhr.readyState == 4 && xhr.status==200) {
                        toast.remove();
                        let token = JSON.parse(xhr.responseText).token;
                        Router.push('/posts/' + token);
                        setLoader(false);
                    }
                };
                break;
            case 'headers_received' :
               toast.notify(`${meta.name} uploaded!`,{type:'success',title:false});
                break;
            case 'aborted' :
                toast.notify(`${meta.name} upload aborted!`,{type:'warning',title:''});
                break;
        }
    }

    return (
        <Container maxWidth={"xl"}>
            <React.Fragment>
                {loader ? <Loader/> : ""}
                <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    maxFiles={1}
                    multiple={false}
                    canCancel={false}
                    onSubmit={selectFile}
                    accept="text/javascript,application/javascript,application/zip"
                    inputContent="Drop a JS file or ZIP archive"
                    styles={{
                        dropzone: { width: '80%', height: 200, overflow:'hidden' },
                        dropzoneActive: { borderColor: 'green' },
                        submitButtonContainer:{display:'none'},
                        submitButton:{display:'none'},
                    }}
                />
            </React.Fragment>
            {errorMsg ? <Alert severity="error" onClose={() => {set_errorMsg(false)}}><AlertTitle>We're sorry but your file isn't legit..</AlertTitle>{errorMsg}</Alert> : ''}
            <ToastContainer />

        </Container>

    );
};

export default UploadFiles;