import React, { lazy, Suspense } from "react";
import {CircularProgress, Container} from "@mui/material";
const Period = lazy(() => import("./Period"));

const Day = ({day: { periods }}) => {
    return (
        <Container sx={styles.container}>
            <Suspense fallback={<CircularProgress />}>
            {periods.map((item, index) => (
                <Period key={index} period={item} />
            ))}
            </Suspense>
        </Container>
    )
}

const styles = {
    containerStyle: {
        paddingBottom: 20,
        paddingTop: 20,
    }
};

export default Day;
