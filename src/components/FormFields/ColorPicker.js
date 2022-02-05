import { t } from "i18next";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

import CircleIcon from "@mui/icons-material/Circle";
import { InputAdornment, TextField, Tooltip } from "@mui/material";

function ColorPicker({ label, ...props }) {
  const [color, setColor] = useState("#777777");

  return (
    <>
      <Tooltip
        title={
          <HexColorPicker
            color={color}
            onChange={setColor}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        }
        placement="top"
        PopperProps={{ style: {width:"300px"}}}
        arrow
      >
        <TextField
          {...props}
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
          label={t("color")}
          placeholder={label}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CircleIcon sx={{ color }} />
              </InputAdornment>
            ),
            style: {
              color,
            },
          }}
        ></TextField>
      </Tooltip>
    </>
  );
}

export default ColorPicker;
