import { CircularProgress } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes as Switch,
  Route,
} from 'react-router-dom';
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const ScheduleScreen = lazy(() => import("./screens/ScheduleScreen"));

export default function Router() {
  return (
    <BrowserRouter basename="/HiLCoE-CS">
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path={`/schedule`} element={<ScheduleScreen />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
