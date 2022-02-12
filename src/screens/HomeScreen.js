import React, { useEffect } from "react";
import { connect } from "react-redux";
import {changeSchedule, getScheduleList} from "../actions/ScheduleActions";
import {
    List,
    ListItem,
    ListItemButton,
    Card,
    ListItemText,
    AppBar,
    Toolbar,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {isEmpty} from "../Constants";

const HomeScreen = ({getScheduleList, changeSchedule, list, schedule, loading}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isEmpty(schedule))
            navigate('/schedule', { replace: true, state: schedule.batchId})
        getScheduleList();
    }, list)

    const handleItem = (item) => {
        navigate(`/schedule`, { replace: true, state: item})
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Class Schedule for HiLCoE
                    </Typography>
                </Toolbar>
            </AppBar>
            <List>
                {
                    loading ?
                        <ListItem key="1">Loading....</ListItem> :
                        list !== [] ?
                            list.map((sched, idx) => (
                                <ListItem key={idx} style={{display: 'flex', justifyContent: 'center'}}>
                                    <Card style={styles.card} onClick={() => handleItem(sched)}>
                                        <ListItemButton style={styles.listItemButton}>
                                            <ListItemText style={styles.text}>{sched}</ListItemText>
                                        </ListItemButton>
                                    </Card>
                                </ListItem>
                            )) :
                            <ListItem>No Schedules</ListItem>
                }
            </List>
        </>
    );
}

const mapStateToProps = ({schedule}) => ({
    list: schedule.scheduleList,
    schedule: schedule.schedule,
    loading: schedule.loading
});

const styles = {
    card: {
        width: '100%',
    },
    listItemButton: {
        textAlign: 'center',
        padding: 0
    },
    text: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        padding: '1rem',
    }
}

export default connect(mapStateToProps, {changeSchedule, getScheduleList})(HomeScreen);
