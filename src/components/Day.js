import React from "react";
import Period from './Period';
import {Container} from "@mui/material";

const Day = ({day: {doW, periods }}) => {
    return (
        <Container sx={styles.container}>
            {periods.map((item, index) => (
                <Period key={index} period={item} />
            ))}
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