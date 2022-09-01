import React, { useState, useEffect } from "react"
import { 
    Typography, 
    FormControl, 
    TextField, 
    InputLabel, 
    Select, 
    MenuItem, 
    Button,
} from '@material-ui/core'
import Alert from '@mui/material/Alert';

import NumberFormatCustom from "../../utils/NumberFormaterCustom";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import styles from './formGenerated.module.css';

export default function FormGenerated({fileContent}) {
    const [messageError, setMessageError] = useState(false);
    const [fileDataContent, setFileDataContent] = useState(false);

  // This function is responsible for reading the sent file and saving the object in the state
    const uploadData = (event: { target: { files: Blob[]; }; }) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileData = e?.target?.result ? JSON.parse(e.target.result) : false;
    
          if(!fileData.data) {
             // If the uploaded file does not have the Date field, the system returns an error message.
            setMessageError("JSON file not supported");
            return;
          }
          setMessageError(false)
          setFileDataContent(fileData);
        };
        reader.readAsText(event.target.files[0]);
    }

    // This function is responsible for fetching the field within the file sent through the fieldID, avoiding a new loop in the code.
    const getValueByFieldId = (fieldId) => {
        const fieldItem = Boolean(fileDataContent.data) ? fileDataContent?.data?.find(value => { return value.fieldId === fieldId; }) : false;
        return fieldItem;
    } 

    
    const [valueDate, setValue] = React.useState<Dayjs | null>(
        dayjs(Date.now()), // Retorna a data atual
    );
    const handleChangeDate = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    return (
        <div className={styles.formGeneratedContent}>

            {messageError && (
                <Alert severity="error">{messageError}</Alert>
            )}

            {fileContent &&
                <>
                    <Typography 
                      component='h3' 
                      variant='body1'
                    >
                        {fileContent?.formName}
                    </Typography>
                    {fileContent.fields && 
                        fileContent.fields.map(field => {
                           switch (field.type) {
                                case 'date':
                                    return (
                                        <LocalizationProvider 
                                            key={`date-label-${field.id}`} 
                                            dateAdapter={AdapterDayjs} 
                                        >
                                            <DesktopDatePicker
                                              label={field.name}
                                              className={styles.inputGroup}
                                              inputFormat="MM/DD/YYYY"
                                              value={fileDataContent ? getValueByFieldId(field.id).value : valueDate}
                                              onChange={handleChangeDate}
                                              renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    )
                                case 'select':
                                    return (
                                            <FormControl 
                                              className={styles.inputGroup} 
                                              key={`date-select-${field.id}`}
                                            > 
                                                <InputLabel 
                                                  className={styles.label} 
                                                  id={`select-label-${field.id}`}
                                                >
                                                    {field.name}
                                                </InputLabel>
                                                <Select
                                                  labelId={`select-label-${field.id}`}
                                                  id={`select-${field.id}`}
                                                  value={fileDataContent ? getValueByFieldId(field.id).value : ''}
                                                  label={field.name}
                                                >
                                                    {field.options && field.options.map(option =>
                                                        <MenuItem 
                                                          key={`select-option-${option.id}`} 
                                                          value={option.value}
                                                        >
                                                            {option.name
                                                        }</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                    )
                                default:
                                    return (
                                        <TextField 
                                        key={`input-text-${field.id}`}
                                        id={`input-text-${field.id}`}
                                        label={field.name}
                                        value={fileDataContent ? getValueByFieldId(field.id).value : ''}
                                        className={`${styles.label} ${styles.inputGroup}`}
                                        InputProps={field.type === 'number' && {inputComponent: NumberFormatCustom}}
                                        />
                                    )
                            }  
                        })
                    }
                    <Button
                      fullWidth
                      variant="contained" 
                      color="secondary"
                      component="label"
                      className={styles.buttonUpload}
                    >
                        Upload file with data
                        <input hidden accept=".json" onChange={uploadData} type="file" />
                    </Button>
                </>
            }
        </div>
    )
}