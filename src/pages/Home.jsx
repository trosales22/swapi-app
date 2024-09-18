import { Alert, Box, CircularProgress, Grid2, IconButton, Pagination, TextField, Typography } from '@mui/material';
import MainLayout from '../components/MainLayout';
import MediaCard from '../components/MediaCard';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPeople } from "../redux/peopleSlice";
import ViewPeopleDetailsModal from '../components/modules/people/ViewPeopleDetailsModal';

function HomePage(){
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const txtSearchRef = useRef();
    const dispatch = useDispatch();
    const peopleList = useSelector((state) => state.people.list);
    const isPeopleListingLoading = useSelector((state) => state.people.is_listing_loading);
    const isPeopleListingError = useSelector((state) => state.people.is_listing_error);

    useEffect(() => {
        dispatch(getAllPeople({ page }));
    }, [dispatch]);

    useEffect(() => {
        if (peopleList) {
            setTotal(peopleList.count);
        }
    }, [peopleList]);

    const onSearchHandler = () => {
        setPage(1);
        dispatch(getAllPeople({
            search: txtSearchRef.current.value.trim()
        }));
    }

    const onPageChangeHandler = (event, newPage) => {
        setPage(newPage);
        dispatch(getAllPeople({
            page: newPage
        }));
    };
    
    return (
        <MainLayout>
            <Typography color="text.primary" variant="h5" sx={{marginBottom: '10px'}}>People</Typography>

            <ViewPeopleDetailsModal />

            <Box sx={{display: 'flex', width: 400, maxWidth: '40%', marginBottom: "10px"}}>
                <TextField
                    inputRef={txtSearchRef}
                    fullWidth
                    label="Search..."
                    variant="outlined"
                    size="small"
                    onChange={(e) => onSearchHandler(e.target.value)}
                />
            </Box>

            { isPeopleListingLoading ? (
                <CircularProgress />
            ) : isPeopleListingError ? (
                <Alert severity="error">
                    Something went wrong while fetching people list.
                </Alert>
            ): (
                <Grid2 container spacing={2}>
                    {peopleList && (peopleList?.results ?? []).map((row, index) => {
                        console
                        return (
                            <Grid2 item="true" xs={12} sm={6} md={3} key={index}>
                                <MediaCard dispatch={dispatch} data={row} />
                            </Grid2>
                        );
                    })}
                </Grid2>
            )}

            {total > itemsPerPage && (
                <Pagination
                    count={Math.ceil(total / itemsPerPage)}
                    page={page}
                    onChange={onPageChangeHandler}
                    sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
                />
            )}
        </MainLayout>
    );
}

export default HomePage;