import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleViewPeopleDetailsModal } from '../../../redux/modalSlice';
import { getPeopleById } from '../../../redux/peopleSlice';
import { Alert, CircularProgress, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CustomModal from '../../CustomModal';
import { getFilmById, clearTitles } from '../../../redux/filmSlice';

export default function ViewPeopleDetailsModal() {
    const [details, setDetails] = useState(null);
    const dispatch = useDispatch();
    const openViewModal = useSelector((state) => state.modal.open_view_people_details_modal);
    const selectedPeopleId = useSelector((state) => state.modal.selected_people_id);
    const peopleDetails = useSelector((state) => state.people.details);
    const isFetchByIdLoading = useSelector((state) => state.people.is_fetch_by_id_loading);
    const isFetchByIdError = useSelector((state) => state.people.is_fetch_by_id_error);
    const filmTitles = useSelector((state) => state.film.titles);

    useEffect(() => {
        if(openViewModal){
            dispatch(getPeopleById(selectedPeopleId));
        }
    }, [dispatch, openViewModal]);

    useEffect(() => {
        setDetails(peopleDetails);

        if (peopleDetails?.films) {
            dispatch(clearTitles());
            // Extract film IDs from the URLs
            const filmIds = peopleDetails.films.map(getIdFromUrl);

            // Fetch film details for each film ID
            filmIds.forEach(id => {
                dispatch(getFilmById(id));
            });
        }
    }, [peopleDetails, dispatch]);

    const onCloseDialogHandler = () => {
        dispatch(toggleViewPeopleDetailsModal(false));
    };

    const getIdFromUrl = (url) => {
        // Extract the ID from the URL using string manipulation
        const parts = url.split('/');
        return parts[parts.length - 2]; // ID is the second last part of the URL
    };

    const modalActions = (
        <Button onClick={onCloseDialogHandler}>Close</Button>
    );

    return (
        <CustomModal 
            title="View People" 
            onClose={onCloseDialogHandler}
            isOpen={openViewModal}
            actions={modalActions}
        >
            <div>
                {isFetchByIdLoading ? (
                <CircularProgress />
                ) : isFetchByIdError ? (
                <Alert severity="error">
                    Something went wrong while viewing people details.
                </Alert>
                ) : details ? (
                    <TableContainer component={Paper} sx={{ width: '100%' }}>
                        <Table sx={{ width: '100%' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography>Name</Typography></TableCell>
                                    <TableCell><Typography>{details?.name}</Typography></TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><Typography>Height | Mass</Typography></TableCell>
                                    <TableCell><Typography>{details?.height } | {details?.mass}</Typography></TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><Typography>Gender</Typography></TableCell>
                                    <TableCell><Typography>{details?.gender}</Typography></TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><Typography>Hair Color</Typography></TableCell>
                                    <TableCell><Typography>{details?.hair_color}</Typography></TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><Typography>Skin Color</Typography></TableCell>
                                    <TableCell><Typography>{details?.skin_color}</Typography></TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><Typography>Eye Color</Typography></TableCell>
                                    <TableCell><Typography>{details?.eye_color}</Typography></TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell><Typography>Films</Typography></TableCell>
                                    <TableCell>
                                        {filmTitles.length ? (
                                            <ol>
                                                {filmTitles.map((item, index) => (
                                                    <li key={index}>
                                                        <Typography>{item}</Typography>
                                                    </li>
                                                ))}
                                            </ol>
                                        ) : (
                                            <Typography>No films available.</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography>No details available.</Typography>
                )}
            </div>
        </CustomModal>
    );
}