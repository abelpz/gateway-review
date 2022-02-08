import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { APP_NAME as appName } from "@common/constants";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid, Paper, StepButton } from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import AuthForm from "./Login/AuthForm";
import OrgForm from "./Org/OrgForm";
import ResourcesForm from "./Resources/ResourcesForm";
import SettingsLayout from "./SettingsLayout";

export default function SettingsStepper() {
  const { t, i18n } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [auth, org, resources] = useSelector(({ settings, ...state }) => [
    settings.auth,
    settings.org,
    state.sources.resources,
  ]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    setSteps([
      {
        label: t("Login"),
        Component: AuthForm,
        completed: !!auth?.sha1,
      },
      {
        label: t("Organization"),
        Component: OrgForm,
        completed: !!org?.id,
      },
      {
        label: t("Resources"),
        Component: ResourcesForm,
        completed: !!resources.filter((res) => res.owner.id === org.id).length,
      },
    ]);
  }, [auth?.sha1, org?.id, resources, t]);

  useEffect(() => {
    if (activeStep === steps.length && steps[activeStep - 1]?.completed)
      Router.push("/");
  }, [activeStep, steps]);

  const isStepOptional = (step) => {
    return steps[step]?.optional === true;
  };

  const isStepSkipped = useCallback(
    (step) => {
      return skipped.has(step);
    },
    [skipped]
  );

  const handleNext = useCallback(() => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  }, [activeStep, isStepSkipped, skipped]);

  // useEffect(() => {
  //   if (activeStep && steps[activeStep]?.completed && activeStep !== (steps.length - 1))
  //     handleNext()
  // }, [steps, activeStep, handleNext])

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleOnChange = useCallback(
    (token) => {
      if (steps[activeStep]?.completed)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    },
    [activeStep, steps]
  );

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignContent="space-between"
      pt={5}
      spacing={5}
      height="100%"
    >
      <Grid item xs={10} sm={8} flex={1} sx={{ pt: 5, pl: 5 }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            stepProps.completed = steps[index]?.completed;
            return (
              <Step key={step.label} {...stepProps}>
                <StepButton
                  disabled={
                    !steps[index]?.completed && !steps[index - 1]?.completed
                  }
                  color="inherit"
                  onClick={handleStep(index)}
                >
                  {step.label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? null : (
          <>
            <SettingsLayout title={appName}>
              {(() => {
                const Component = steps[activeStep].Component;
                return <Component handleOnChange={handleNext}></Component>;
              })()}
            </SettingsLayout>
            <Paper
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                p: "1rem",
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignContent="space-between"
                m="auto"
              >
                <Grid item flex={1} textAlign={"left"} xs={4} sm={2}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1, backgroundColor: "rgba(0, 0, 0, 0.17)" }}
                  >
                    <ArrowBackIcon fontSize="small" />
                    {t(" Back")}
                  </Button>
                </Grid>
                <Grid item flex={1} textAlign={"right"} xs={4} sm={2}>
                  {isStepOptional(activeStep) && (
                    <Button
                      color="inherit"
                      onClick={handleSkip}
                      sx={{ mr: 1, backgroundColor: "rgba(0, 0, 0, 0.17)" }}
                    >
                      {t("Skip")}
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={!steps[activeStep]?.completed}
                    sx={{ mr: 1, backgroundColor: "rgba(0, 0, 0, 0.17)" }}
                  >
                    {activeStep === steps.length - 1 ? (
                      t("Finish")
                    ) : (
                      <>
                        {t("Next ")}
                        <ArrowForwardIcon fontSize="small" />
                      </>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </Grid>
    </Grid>
  );
}
