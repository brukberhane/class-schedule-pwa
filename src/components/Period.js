import React from 'react';
import {Box, Card, CardContent, CardHeader, Divider, Typography} from '@mui/material';
import '../css/Period.css';

const Period = ({period: {number, name, code, room, time, lecturer}}) => {
    const { card, items, body, header } = styles;

    return name ? (
        <Card style={card}>
            <CardHeader style={header} title={name}/>
            <Divider style={{marginBottom: '1rem'}} />
            <CardContent style={body}>
                <div style={items}>
                    <Typography color="text.secondary" component="span">Time: </Typography>
                    <span className="text">{time}</span>
                </div>

                <div style={items}>
                    <Typography color="text.secondary" component="span">Code: </Typography>
                    <span className="text">{code}</span>
                </div>

                <div style={items}>
                    <Typography color="text.secondary" component="span">Teacher: </Typography>
                    <span className="text">{lecturer}</span>
                </div>

                <div style={items}>
                    <Typography color="text.secondary" component="span">Room Number: </Typography>
                    <span className="text">{room}</span>
                </div>
            </CardContent>
        </Card>
    ) : null;
}

const styles = {
    header: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5em',
    },
    card: {
        marginTop: '1rem',
        marginBottom: '1rem',
        textAlign: 'center',
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 0,
        paddingTop: 0
    },
    items: {
        width: '75%',
        display: 'flex',
        justifyContent: 'space-between',
    }
}

export default Period;