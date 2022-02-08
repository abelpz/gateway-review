import { Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";



import ReviewForm from "./ReviewForm";


export default function ContextMenu({
  fields,
  repo,
  position,
  onClose,
  quote,
  authentication,
  preppend
}) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewClick = () => {
    onClose();
    setShowReviewForm(true);
  };

  return (
    <>
      <Menu
        open={position !== null}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={
          position !== null
            ? { top: position.mouseY, left: position.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleReviewClick} sx={{ px: "0.25rem!important" }}>
          Review
        </MenuItem>
      </Menu>
      <ReviewForm
        open={showReviewForm}
        onClose={() => setShowReviewForm(false)}
        fields={fields}
        quote={quote}
        repo={repo}
        authentication={authentication}
        preppend={preppend}
      />
    </>
  );
}