import React, {useState} from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import TextDisplay from './components/TextDisplay/TextDisplay';

import {
    Container,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    Divider,
    CircularProgress,
    Box, Button
} from '@mui/material';

import axios from "axios";
import cgiLogo from "./assets/logos/CGI_logo_color_rgb.svg"
import TextInput from "./components/TextInput/TextInput";

const App = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [displayText, setDisplayText] = useState('');
    const [sparkCode, setSparkCode] = useState('');
    const [loading, setLoading] = useState(false);

    const backendURL = 'http://localhost:5000'

    const [targetTable, setTargetTable] = useState('');


    const handleTableChange = (newValue) => {
        setTargetTable(newValue);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setDisplayText('');
        setSparkCode('');
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('target_table', targetTable);

            const response = await axios.post(`${backendURL}/api/upload`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            setDisplayText(response.data.prompt);
            setSparkCode(response.data.code);
            console.log(`File Name: ${response.data.filename}`)
        } catch (error) {
            console.error('Error uploading file:', error.response.data);
            setDisplayText(error.response.data.detail);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <CssBaseline/>

            <AppBar
                position="flex"
                sx={{
                    backgroundColor: '#ffffff'
                }}
            >
                <Toolbar style={{
                    display: 'fixed'
                }}>
                    <Box style={{
                        display: 'flex',
                        marginRight: '50px'
                    }}>
                        <img src={cgiLogo} alt="CGI logo"
                             style={{width: 70, height: 70}}/>
                    </Box>
                    <Box>
                        <Typography variant="h4" color="black" fontFamily="Source Sans Pro">
                            {"CodeWeaver "}
                            <Typography variant="overline" color="black" fontFamily="Source Sans Pro">
                                A Code Generation Tool
                            </Typography>
                        </Typography>
                    </Box>


                </Toolbar>
            </AppBar>
            {/*<Drawer*/}
            {/*    open={drawerOpen}*/}
            {/*    sx={{*/}
            {/*        width: 240,*/}
            {/*        backgroundColor: '#f5f5f5',*/}
            {/*        '& .MuiDrawer-paper': {*/}
            {/*            boxSizing: 'border-box',*/}
            {/*        },*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Toolbar/>*/}
            {/*    <Divider/>*/}
            {/*</Drawer>*/}
            <Container maxWidth='md'
                       sx={{mt: 2, mb: 2}}
            >
                <Box sx={{
                    display: 'flex',
                    height: '70px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    margin: '5px',
                    border: "1px solid #ccc",
                    borderRadius: '10px',
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
                }}>
                    <FileUpload fileChange={handleFileChange}/>
                    <TextInput label="Database.Table" onChange={handleTableChange} value={targetTable}/>
                    <Button variant="contained" onClick={handleSubmit} disabled={!(targetTable && selectedFile)}>
                        Submit
                    </Button>
                </Box>


                <Box style={{
                    display: 'flex',
                    alignItem: 'center',
                    justifyContent: 'center',
                }}>
                    {displayText && (
                        <TextDisplay isCode={false} textTitle="Prompt:" text={displayText}/>
                    )}

                    {loading ? (
                        <CircularProgress/>
                    ) : (
                        sparkCode ?
                            <TextDisplay isCode={true} textTitle="Spark Code:" text={sparkCode}/>
                            : <p></p>
                    )
                    }
                </Box>
            </Container>
        </div>
    );
};

export default App;

