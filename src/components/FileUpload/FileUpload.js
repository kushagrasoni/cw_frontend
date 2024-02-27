import React, {useState} from 'react';
import {Input, Button, Box} from '@mui/material';

const FileUpload = (props) => {


    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Input type="file" onChange={props.fileChange}/>
        </div>
    );

};

export default FileUpload;
