import React from 'react';
import {Typography, Paper, Box} from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {oneDark} from "react-syntax-highlighter/src/styles/prism";

const TextDisplay = (props) => {

    return (
        <Paper sx={{
            width: '700px',
            height: '700px',
            padding: '10px',
            margin: '20px',
            border: "1px solid #ccc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
        }}>
            <Typography variant="body1">
                {props.textTitle}
            </Typography>
            <Box sx={{
                maxHeight: '95%',
                maxWidth: '100%',
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


    );
};

export default TextDisplay;
