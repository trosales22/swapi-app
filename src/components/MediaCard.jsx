import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import appLogo from '../assets/images/app-logo.png';
import { toggleViewPeopleDetailsModal, setSelectedPeopleId } from '../redux/modalSlice';

export default function MediaCard({dispatch, data}) {
    const getIdFromUrl = (url) => {
        // Extract the ID from the URL using string manipulation
        const parts = url.split('/');
        return parts[parts.length - 2]; // ID is the second last part of the URL
    };

    const onViewPeopleDetailsModal = () => {
        dispatch(setSelectedPeopleId(getIdFromUrl(data.url)));
        dispatch(toggleViewPeopleDetailsModal(true));
    };

    return (
        <Card
            sx={{
                width: 200,
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
            }}
            onClick={onViewPeopleDetailsModal}
        >
            <CardMedia
                sx={{ height: 140 }}
                image={appLogo}
                title={data.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                {data?.name || 'Name'}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <b>Gender:</b> {data?.gender || 'Unknown' }
                </Typography>
            </CardContent>
        </Card>
    );
}
