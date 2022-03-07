import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import BackendApi from "../BackendApi";
import { CLASSIFICATION } from "../constants";
import Chip from "@mui/material/Chip";
import CardMedia from "@mui/material/CardMedia";

const ImageModal = ({
  image,
  imageModalOpen,
  handleImageModalClose,
  setSelectedImage,
  setImages,
  images,
}) => {
  const handleClassifyImage = async (image, isFoaming) => {
    await BackendApi.classify(image.id, isFoaming);
    setSelectedImage(null);
    image.isFoaming = isFoaming;
    handleImageModalClose();
  };

  return (
    <div>
      <Dialog
        open={imageModalOpen}
        onClose={handleImageModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
          <Chip
            label={CLASSIFICATION[image.isFoaming].label}
            color={CLASSIFICATION[image.isFoaming].color}
          />
        </DialogTitle>

        <DialogContent>
          <DialogContentText variant="h6">
            Date Created:
            {image.dateCreated}
          </DialogContentText>
          <DialogContentText variant="h6">
            Last Modified:
            {image.lastModified}
          </DialogContentText>
        </DialogContent>

        <DialogContent>
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              width: "100%",
              display: { sm: "block" },
            }}
            image={image.url}
            alt={`image created at ${image.dateCreated}`}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClassifyImage(image, true)}>
            Is Foaming
          </Button>
          <Button onClick={() => handleClassifyImage(image, false)}>
            Not Foaming
          </Button>
          <Button onClick={() => handleClassifyImage(image, null)} autoFocus>
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageModal;
