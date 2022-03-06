import React, { memo, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Chip from "@mui/material/Chip";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ClearIcon from "@mui/icons-material/Clear";
import BackendApi from "../BackendApi";

const ImageCard = memo(({ image }) => {
  const [currentImage, setImage] = useState(image);
  const CLASSIFICATION = {
    null: { label: "Unclassified", color: "default" },
    true: { label: "Foaming", color: "warning" },
    false: { label: "Not Foaming", color: "primary" },
  };

  return (
    <Card
      sx={{ minWidth: 275, display: "flex", justifyContent: "space-between" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Chip
            label={CLASSIFICATION[image.isFoaming].label}
            color={CLASSIFICATION[image.isFoaming].color}
          />
          <br />
          <Typography variant="caption">{`Date Created: ${image.dateCreated}`}</Typography>{" "}
          <br />
          <Typography variant="caption">{`Last Modified: ${image.lastModified}`}</Typography>
        </CardContent>
      </Box>
      <Box>
        <IconButton
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            BackendApi.classify(image.id, true);
            setImage({ ...image, isFoaming: true });
            image.isFoaming = true;
          }}
        >
          <Tooltip title="Is Foaming">
            <ThumbUpIcon
              color={
                image.isFoaming
                  ? CLASSIFICATION[image.isFoaming].color
                  : "default"
              }
            />
          </Tooltip>
        </IconButton>
        <IconButton
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            BackendApi.classify(image.id, false);
            setImage({ ...currentImage, isFoaming: false });
            image.isFoaming = false;
          }}
        >
          <Tooltip title="Not Foaming">
            <ThumbDownIcon
              color={
                !image.isFoaming
                  ? CLASSIFICATION[image.isFoaming].color
                  : "default"
              }
            />
          </Tooltip>
        </IconButton>
        <IconButton
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            BackendApi.classify(image.id, null);
            setImage({ ...image, isFoaming: null });
            image.isFoaming = null;
          }}
        >
          <Tooltip title="Clear">
            <ClearIcon color="default" />
          </Tooltip>
        </IconButton>

        {image.url && (
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              width: "7em",
              display: { sm: "block" },
              mr: 2,
            }}
            image={image.url}
            alt={`image created at ${image.dateCreated}`}
          />
        )}
      </Box>
    </Card>
  );
});
export default ImageCard;
