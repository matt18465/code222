import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { useMatch, useParams } from "react-router-dom";
import { useTabsStore } from "../../../../store/tabsStore";
type RemoveDialogProps = {
  currentEditedTab: any; // to be evaulated
  confirmDialogOpen: boolean;
  setConfirmDialogOpen: (open: boolean) => void;
  setActionMessage: (message: string) => void;
  setSnackbarOpen: (open: boolean) => void;
  setTabData: (location: string, page: string) => void;
};

const RemoveDialog = ({
  currentEditedTab,
  confirmDialogOpen,
  setConfirmDialogOpen,
  setActionMessage,
  setSnackbarOpen,
  setTabData,
}: RemoveDialogProps) => {
  const { removeTab } = useTabsStore((state) => ({
    removeTab: state.removeTab,
  }));
  let { locationId } = useParams();
  const match = useMatch(`/locations/${locationId}/:currentPageSlug`);
  const pathName = match?.params?.currentPageSlug;
  const handleRemoveTab = async (id: string) => {
    const docRef = doc(
      db,
      "locations",
      `${locationId}`,
      "pages",
      `${pathName}`,
      "tabs",
      id
    );

    try {
      await deleteDoc(docRef);
      removeTab(id);
      await setTabData(locationId!, pathName!);
      setActionMessage(`Tab ${currentEditedTab?.title} removed succesfully`);
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={confirmDialogOpen}
      onClose={() => setConfirmDialogOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          width: 500,
          maxWidth: 500,
          p: 3,
        },
      }}
    >
      <Box>
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this tab?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to remove{" "}
            <Typography
              component={"span"}
              sx={{
                color: "red",
                fontWeight: 700,
              }}
            >
              {currentEditedTab?.title}
            </Typography>
            {". "}
            If you remove this tab, it cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleRemoveTab(currentEditedTab?.id);
              setConfirmDialogOpen(false);
            }}
            autoFocus
            sx={{
              color: "red",
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default RemoveDialog;
