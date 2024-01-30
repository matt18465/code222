import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { DragEvent, useRef, useState } from "react";
import { UploadIcon } from "../../../../assets/icons/customIcons";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
type UploadModalProps = {
  setIsCreatingNewTab: (isCreating: boolean) => void;
  setImageUpload: (file: File | null) => void;
  setIsModalOpen: (open: boolean) => void;
  isModalOpen: boolean;
  imageUpload: File | null;
};

const UploadModal = ({
  setIsCreatingNewTab,
  setImageUpload,
  setIsModalOpen,
  isModalOpen,
  imageUpload,
}: UploadModalProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleClose = () => setIsModalOpen(false);

  const [dragActive, setDragActive] = useState(false);
  const [msg, setMsg] = useState("");

  const checkFileType = (e: DragEvent, eventType?: string) => {
    let extension;
    const target = e.target as HTMLInputElement;

    if (eventType === "drop") {
      const dataT: DataTransfer = e.dataTransfer;
      if (!dataT?.files?.length) {
        return;
      }
      extension = dataT.files[0].name.match(/\.([^.]+)$/)![1];
    } else {
      extension = target.value.match(/\.([^.]+)$/)![1];
    }

    switch (extension) {
      case "svg":
        eventType !== "drop"
          ? setImageUpload(target.files![0])
          : setImageUpload(e.dataTransfer.files[0]);
        setMsg("");
        break;
      default:
        setImageUpload(null);
        setMsg(`.${extension} format is not supported.`);
    }
  };

  const checkSize = (e: DragEvent, eventType?: string) => {
    let size;
    const target = e.target as HTMLInputElement;

    if (eventType === "drop") {
      size = e.dataTransfer.files[0].size / 8;
    } else {
      size = target.files![0].size / 8;
    }

    if (size <= 51200) {
      checkFileType(e, eventType);
    } else {
      setMsg("Size should be less than 50KB");
    }
  };

  const chooseFile = (e: DragEvent) => {
    const target = e.target as HTMLInputElement;

    if (target.files && target.files![0]) {
      checkSize(e);
      checkFileType(e);
    }
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      checkSize(e, "drop");
      checkFileType(e, "drop");
    }
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => {
          handleClose();
          setImageUpload(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{}}
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <IconButton
            onClick={() => {
              handleClose();
              setImageUpload(null);
            }}
            sx={{
              position: "absolute",
              top: ".5rem",
              right: ".5rem",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              color: "text.primary",
              textAlign: "center",
            }}
          >
            Choose file to upload
          </Typography>

          <FormControl
            sx={{
              "& svg": {
                fill: (theme) => theme.palette.text.secondary,
                stroke: (theme) => theme.palette.text.secondary,
              },
              padding: "2em",
              border: "2px dashed #7866e3",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "text.primary",
            }}
            className="uploadBox"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onSubmit={(e) => e.preventDefault()}
          >
            {imageUpload !== null ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant={"body2"}
                  sx={{
                    color: "text.primary",
                  }}
                  className="filename"
                >
                  {imageUpload.name}
                </Typography>
                <IconButton
                  onClick={() => imageUpload && setImageUpload(null)}
                  sx={{
                    ml: 1,
                  }}
                >
                  <CloseIcon
                    sx={{
                      color: "red",
                      fontSize: "1rem",
                    }}
                  />
                </IconButton>
              </Box>
            ) : msg !== "" ? (
              msg
            ) : (
              <UploadIcon width="20px" height="20px" />
            )}
            <Typography
              variant={"body2"}
              sx={{
                color: "text.primary",
                pt: 1,
                pb: 2,
              }}
              className="filename"
            >
              Drop your file here or
            </Typography>

            <MenuItem
              sx={{
                color: "text.primary",
                borderRadius: 6,
                transition: ".3s all",
                borderStyle: "solid",
              }}
              onClick={() => {
                setIsCreatingNewTab(true);
                inputFileRef?.current?.click();
              }}
            >
              <Box className="browse">
                Browse
                <input
                  type="file"
                  ref={inputFileRef}
                  style={{ display: "none" }}
                  accept=".svg"
                  data-max-size="2048"
                  id="getFile"
                  className="fileIcon"
                  onChange={(e: any) => chooseFile(e)}
                />
              </Box>
            </MenuItem>
            <Typography variant={"body2"} sx={{ mt: 2, color: "text.primary" }}>
              Supported files: SVG
            </Typography>
          </FormControl>
          {imageUpload !== null ? (
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                maxWidth: "7rem",
                mx: "auto",
              }}
            >
              Accept
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Modal>
    </>
  );
};

export default UploadModal;
