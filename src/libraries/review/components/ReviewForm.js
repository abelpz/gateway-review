import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

import useIssues from "@hooks/api/issues/useIssues";

export default function ReviewForm({
  fields,
  repo,
  quote,
  open,
  onClose,
  authentication,
  preppend,
  addQueries,
  queryParams = ["check","hint"]
}) {
  const [formData, setFormData] = useState({
    ...fields,
    ...quote,
    title: "",
    comment: "",
  });

  const { setIssue } = useIssues({ token: authentication.sha1 });

  const sendIssue = async () => {
    if (formData.title !== "") {
      const link = formData.quote && formData.link;
      const metaData = !link
        ? { ...formData }
        : {
            ...formData,
            link: encodeURI(
              link +
                (link?.includes("?") ? "&" : "?") +
                `check=${formData.quote}&hint=${formData.title}`
            ),
          };
      console.log({ metaData });

      const body = Object.keys(metaData).reduce((prev, current) => {
        if (current === "title") return prev;
        const title = current.charAt(0).toUpperCase() + current.slice(1);
        return prev + `**${title}:**\n${metaData[current]}\n`;
      }, `### ${metaData.title}\n\n`);
      console.log({ body });

      const newIssue = await setIssue({
        title: metaData.title,
        owner: repo.owner.username,
        repo: repo.name,
        body,
      });
      console.log({ newIssue });
      if (newIssue.id) onClose();
    }
  };
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the form to give details about this report.
          </DialogContentText>
          <Grid container spacing="2">
            {Object.keys(fields).map((fieldKey, index) => {
              return (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    md={5}
                    key={index}
                    value={fields[fieldKey]}
                    margin="dense"
                    id={fieldKey}
                    label={fieldKey}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setFormData({ ...formData, [fieldKey]: e.target.value });
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <TextField
            margin="dense"
            label={"Quote"}
            value={quote.quote}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setFormData({ ...formData, quote: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            label={"Occurrence"}
            value={quote.occurrence}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setFormData({ ...formData, occurrence: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label={"Title"}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setFormData({
                ...formData,
                title:
                  preppend !== ""
                    ? `${preppend}:${e.target.value}`
                    : e.target.value,
              });
            }}
          />
          <TextField
            multiline
            rows={4}
            margin="dense"
            label={"Comment"}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setFormData({ ...formData, comment: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={sendIssue}>Send</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}