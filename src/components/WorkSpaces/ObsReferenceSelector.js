import ReferenceSelector from "bible-reference-rcl/dist/components/ReferenceSelector";
import React, { useState } from "react";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ReferenceText = styled(Typography)(({ theme }) => ({
  padding: "0.25rem 0 0.3rem",
  margin: "0 0.5rem",
}));

export default function ObsReferenceSelector({
  initialStory,
  initialFrame,
  stories,
  onChangeStory,
  frames,
  onChangeFrame,
  loadingFrames,
}) {
  const handleNext = async (e) => {
    if (initialFrame !== (frames.length - 1).toString())
      onChangeFrame(e, (parseInt(initialFrame) + 1).toString());
  };
  const handlePrev = async (e) => {
    if (initialFrame !== "0")
      onChangeFrame(e, (parseInt(initialFrame) - 1).toString());
  };
  return (
    <>
      <Button onClick={handlePrev}>
        <NavigateBeforeIcon></NavigateBeforeIcon>
      </Button>
      <ReferenceText>OBS</ReferenceText>
      <Autocomplete
        value={initialStory}
        onChange={onChangeStory}
        id="controllable-story"
        options={stories}
        sx={{ maxWidth: "4rem" }}
        renderInput={(params) => <TextField variant="standard" {...params} />}
        disableClearable
      />
      <ReferenceText>{" : "}</ReferenceText>
      <Autocomplete
        value={initialFrame}
        onChange={onChangeFrame}
        id="controllable-frame"
        options={frames}
        sx={{ maxWidth: "4rem" }}
        renderInput={(params) => <TextField variant="standard" {...params} />}
        loading={loadingFrames}
        disableClearable
      />
      <Button onClick={handleNext}>
        <NavigateNextIcon></NavigateNextIcon>
      </Button>
    </>
  );
}
