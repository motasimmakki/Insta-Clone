import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const fileLimit = 50;

  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if(file === null) {
      setError("File Not Selected!");
      setTimeout(() => {setError('')}, 2000);
      return;
    }
    if((file.size / (1024 * 1024)) > fileLimit) {
      setError(`File too large, try uploading a file less than ${fileLimit}MB`);
      setTimeout(() => {setError('')}, 3000);
      return;
    }
    setLoading(true);
  }

  return (
    <div className='upload-btn'>
      {
        (error != "")? 
        <Alert severity="error">{error}</Alert> : 
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="outlined" color="secondary" component="label" size="large">
                <MovieIcon/>
                Upload Media
                <input hidden accept="*" multiple type="file" onChange={handleChange}/>
            </Button>
        </Stack>
      }
      {
        loading &&
        <LinearProgress variant="determinate" color="secondary" value={60}
        sx={{mt:"0.5rem"}}/>
      }
    </div>
  )
}
