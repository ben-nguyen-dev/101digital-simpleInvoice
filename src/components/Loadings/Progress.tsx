import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Progress = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Progress;
