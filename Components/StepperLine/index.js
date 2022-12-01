import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const QontoConnector = styled(StepConnector)(({ theme }) => ({

    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#0E8750;',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#0E8750;',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 4,
        borderRadius: 3,
    },
}));

const steps = ['0', '1', '2', '3'];

export default function CustomizedSteppers({ activeStep }) {
    return (
        <Stack sx={{ width: '30%' }}>
            <Stepper activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label) => (
                    <Step sx={{ mr: '0px', ml: '0px' }} key={label}></Step>
                ))}
            </Stepper>
        </Stack>
    );
}
