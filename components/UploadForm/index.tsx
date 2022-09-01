import React, { useState } from "react"
import styles from './uploadForm.module.css';
import { Typography, Button } from '@material-ui/core'
import FormGenerated from '../FormGenerated';
import Alert from '@mui/material/Alert';

export default function UploadForm() {
  const [messageError, setMessageError] = useState(false);
  const [fileContent, setFileContent] = useState(false);

  // This function is responsible for reading the sent file and saving the object in the state
  const uploadFile = (event: { target: { files: Blob[]; }; }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileJson = e?.target?.result ? JSON.parse(e.target.result) : false;
      if(!Boolean(fileJson.fields)) {
      // If the uploaded file does not have the Fields field, the system returns an error message.
        setMessageError("JSON file not supported");
        return messageError;
      }
      setMessageError(false)
      setFileContent(fileJson);

    };
    reader.readAsText(event.target.files[0]);
  }

  return (
    <>    
        <div className={styles.mainContent}>
            <Typography component='h1' variant='h4'>
                Challenge Next
            </Typography>
            <Typography 
              component='h2' 
              variant='body1' 
              className={styles.legend}
            >
                You will need to attach a JSON file to generate the information for this challenge
            </Typography>
            {!fileContent && (
                <form
                  noValidate
                  autoComplete='off'
                >
                    <Button
                      fullWidth
                      variant="contained" 
                      color="secondary"
                      component="label"
                      className={styles.buttonUpload}
                    >
                        Upload JSON File
                        <input hidden accept=".json" onChange={uploadFile} type="file" />
                    </Button>

                  {messageError && (
                    <Alert severity="error">{messageError}</Alert>
                  )}
                </form>
            )}

            {fileContent && (
              <FormGenerated fileContent={fileContent}/> 
            )}
        </div>
    </>
  )
}