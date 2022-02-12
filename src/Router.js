import React from 'react';
import {
    BrowserRouter,
    Routes as Switch,
    Route,
    Link
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';

export default function Router(props) {
    return (
        <BrowserRouter basename="/HiLCoE-CS">
            <Switch>
                <Route path="/" exact element={<HomeScreen />} />
                <Route path={`/schedule`} element={<ScheduleScreen />} />
            </Switch>
        </BrowserRouter>
    )
}