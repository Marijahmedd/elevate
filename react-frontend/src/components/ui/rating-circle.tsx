import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function RatingCircle({ value }: { value: number }) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                variant="determinate"
                value={(value / 10) * 100}
                color={value < 5 ? "warning" : "success"}
                size={30}
                thickness={4}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="white">
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}
