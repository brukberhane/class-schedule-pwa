import React, {lazy, Suspense, useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    Container,
    Tab,
    CircularProgress,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Alert,
    Tooltip, Snackbar, IconButton
} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import {changeSchedule, getSchedule} from "../actions/ScheduleActions";
import {isEmpty} from "../Constants";
import {useLocation, useNavigate} from "react-router-dom";
import SwipeableViews from 'react-swipeable-views';
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
const Day = lazy(() => import("../components/Day"));

const ScheduleScreen = ({getSchedule, schedule, loading, changeSchedule, errors}) => {
    const [index, setIndex] = useState("0");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {state} = useLocation();

    useEffect(() => {
        if (isEmpty(schedule))
            getSchedule(state);

        if (errors)
            setOpen(true);
    }, [schedule, getSchedule, state, errors]);

    const handleBack = () => {
        changeSchedule();
        navigate("/");
    };

    const handleRefresh = () => {
        getSchedule(schedule?.batchId);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>{state}</Typography>
                    {/* <Button color="inherit" onClick={handleBack}>Back</Button> */}
                    <Tooltip title="Refresh Schedule">
                        <IconButton color="inherit" onClick={handleRefresh}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Change Schedule">
                        <IconButton color="inherit" onClick={handleBack}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            {
                loading ?
                    <CircularProgress/> :
                    !isEmpty(schedule) ?
                        <Box sx={{height: '100%'}}>

                            <TabContext value={index}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <TabList variant="fullWidth" onChange={(event, newValue) => setIndex(newValue)}>
                                        {schedule.days
                                            .filter((item) => {
                                                let dayExists = false;

                                                item.periods.forEach((per) => {
                                                    if (per.name)
                                                        dayExists = true;
                                                });

                                                return dayExists;
                                            })
                                            .map((item, idx) => (
                                                <Tab label={item.doW} key={idx} value={idx.toString()}/>
                                            ))
                                        }
                                    </TabList>
                                </Box>
                                <SwipeableViews
                                    axis={'x'}
                                    index={parseInt(index)}
                                    onChangeIndex={(item) => setIndex(item.toString())}>
                                    {schedule.days
                                        .filter((item) => {
                                            let dayExists = false;

                                            item.periods.forEach((per) => {
                                                if (per.name)
                                                    dayExists = true;
                                            });

                                            return dayExists;
                                        })
                                        .map((item, idx) => (
                                            <TabPanel value={idx.toString()} key={idx} sx={{width: '100%'}}>
                                                <Suspense fallback={<CircularProgress />}>
                                                  <Day day={item}/>
                                                </Suspense>
                                            </TabPanel>
                                        ))
                                    }
                                </SwipeableViews>
                            </TabContext>
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                message={errors}
                                action={action} />
                        </Box> :
                        <Container>
                            <Alert severity="error">Failed to get the schedule. Try going back to the List and selecting
                                again.</Alert>
                        </Container>
            }
        </>
    );
}

const mapStateToProps = ({schedule}) => ({
    schedule: schedule.schedule,
    loading: schedule.loading,
    errors: schedule.errors
});

export default connect(mapStateToProps, {getSchedule, changeSchedule})(ScheduleScreen);
