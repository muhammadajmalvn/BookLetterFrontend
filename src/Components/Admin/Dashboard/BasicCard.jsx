import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


const BasicCard = ({ value, title, desc }) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {title}
                </Typography>
                <Typography variant='h5' component='div'>
                    {value}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    {desc}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BasicCard