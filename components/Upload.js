import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';

export default function Upload() {
  return (
    <div className='upload-btn'>
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="outlined" color="secondary" component="label" size="large">
                <MovieIcon/>
                Upload Media
                <input hidden accept="*" multiple type="file"/>
            </Button>
        </Stack>
        <LinearProgress variant="determinate" color="secondary" value={60}
        sx={{mt:"0.5rem"}}/>
    </div>
  )
}
