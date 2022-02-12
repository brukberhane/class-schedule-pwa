import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Container, Tabs, Tab, CircularProgress, Box, AppBar, Toolbar, Typography, Button, Alert} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import {changeSchedule, getSchedule} from "../actions/ScheduleActions";
import {isEmpty} from "../Constants";
import Day from "../components/Day";
import {useLocation, useNavigate} from "react-router-dom";
import SwipeableViews from 'react-swipeable-views';

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItem: 'cetner'
    }
};

const ScheduleScreen = ({match, getSchedule, schedule, loading, changeSchedule}) => {
    const [index, setIndex] = useState("0");
    const navigate = useNavigate();
    const {state} = useLocation();

    useEffect(() => {
        if (isEmpty(schedule))
            getSchedule(state);
    }, [schedule]);

    const handleBack = () => {
        changeSchedule();
        navigate("/");
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>{state}</Typography>
                    <Button color="inherit" onClick={handleBack}>Back</Button>
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
                                                <Day day={item}/>
                                            </TabPanel>
                                        ))
                                    }
                                </SwipeableViews>
                            </TabContext>
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
    loading: schedule.loading
});

export default connect(mapStateToProps, {getSchedule, changeSchedule})(ScheduleScreen);