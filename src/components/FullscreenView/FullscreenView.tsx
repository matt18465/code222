import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import {
  ButtonProps,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";

interface FullscreenViewProps {
  title?: string;
  btnProps?: ButtonProps;
  children: React.ReactNode;
}

export const FullscreenView = ({
  title,
  btnProps,
  children,
}: FullscreenViewProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        {...(btnProps || {})}
        title="Full Screen"
      >
        <FullscreenIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ ".MuiPaper-root": { minHeight: "95vh", minWidth: "90vw" } }}
      >
        {
          <DialogTitle>
            {title}
            <IconButton
              aria-label="close"
              title="Close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        }
        <DialogContent
          sx={{
            p: 5,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};
