import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StyledEngineProvider } from '@mui/material/styles';
import './styles.css'

const steps = [
    {
        label: 'Cadastre-se',
        description: `Por favor, escreva seu nome e e-mail`,
    },
    {
        label: 'Escolha uma senha',
        description:
            'Escolha uma senha segura',
    },
    {
        label: 'Cadastro realizado com sucesso',
        description: `E-mail e senha cadastrados com sucesso`,
    },
];

export default function VerticalLinearStepper({ activeStep }) {

    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel><h2 className='step-label'>{step.label}</h2></StepLabel>
                            <div className='step-description'>
                                {step.description}
                            </div>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </StyledEngineProvider >
    )
}