import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {changeSchedule, getScheduleList} from "../actions/ScheduleActions";
import {
    List,
    ListItem,
    ListItemButton,
    Card,
    ListItemText,
    AppBar,
    Toolbar,
    Typography, IconButton, Snackbar, Tooltip
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {isEmpty} from "../Constants";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";

const HomeScreen = ({getScheduleList, changeSchedule, list, schedule, loading, errors}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!isEmpty(schedule))
            navigate('/schedule', {replace: true, state: schedule.batchId})
        else
            getScheduleList();

        if (errors)
            setOpen(true);
    }, [errors])

    const handleItem = (item) => {
        navigate(`/schedule`, {replace: true, state: item})
    }

    const handleRefresh = () => {
        getScheduleList();
    };

    const handleCLose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCLose}>
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Class Schedule for HiLCoE
                    </Typography>
                    <Tooltip title="Refresh Schedule List">
                        <IconButton color="inherit" onClick={handleRefresh}>
                            <RefreshIcon/>
                        </IconButton>
                    </Tooltip>
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
            <Snackbar open={open} autoHideDuration={6000} onClick={handleCLose} message={errors} action={action}/>
        </>
    );
}

const mapStateToProps = ({schedule}) => ({
    list: schedule.scheduleList,
    schedule: schedule.schedule,
    loading: schedule.loading,
    errors: schedule.errors
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
