import React from 'react';
import {Typography, Paper, Grid, Box} from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {oneDark} from "react-syntax-highlighter/src/styles/prism";

const TextDisplay = (props) => {

    return (
        <Grid container spacing={1}>
            <Grid item md={11.5}>
                <Paper sx={{
                    padding: '10px',
                    marginTop: '20px',
                    border: "1px solid #ccc",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
                }}>
                    <Typography variant="body1">
                        {props.textTitle}
                    </Typography>
                    <Box sx={{
                        maxHeight: 500,
                        overflowY: 'auto'
                    }}>
                        {props.isCode ? (
                        <SyntaxHighlighter
                            language="python"
                            style={oneDark}
                        >
                            {props.text}
                        </SyntaxHighlighter>
                        ) : (
                            <SyntaxHighlighter language="text">{props.text}</SyntaxHighlighter>
                        )}

                    </Box>
                </Paper>
            </Grid>
        </Grid>

    );
};

export default TextDisplay;
