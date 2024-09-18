import { Button, Typography, useTheme } from '@mui/material';
import SadnessPic from '../assets/images/sadness-pic.png';
import { useNavigate } from 'react-router-dom';

function NotFoundPage(){
    const theme = useTheme();
    const navigate = useNavigate();

    const goToMainPage = () => {
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <img src={SadnessPic} alt="404 Image" style={{ maxWidth: '100%', maxHeight: '50vh', marginRight: '20px' }} />
            <div>
                <Typography style={{ fontFamily: 'Roboto', fontWeight: 'bold', color: theme.palette.primary.main, fontSize: '2rem' }}>
                    Page Not Found
                </Typography>
                <Typography style={{ fontFamily: 'Roboto', marginTop: '10px', color: 'gray', fontSize: '1.2rem' }}>
                    Sorry, the page you are looking for might be in another universe.
                </Typography>
                <Button variant="contained" color="primary" onClick={goToMainPage}>
                    Go to Main Page
                </Button>
            </div>
        </div>
    );
}

export default NotFoundPage;