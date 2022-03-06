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
import { CLASSIFICATION } from "../constants";

const ImageCard = memo(({ image }) => {
  const [currentImage, setImage] = useState(image);

  const handleClassifyImage = (id, isFoaming) => {
    BackendApi.classify(id, isFoaming);
    setImage({ ...currentImage, isFoaming: isFoaming });
    image.isFoaming = isFoaming;
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
            handleClassifyImage(currentImage.id, true);
          }}
        >
          <Tooltip title="Is Foaming">
            <ThumbUpIcon
              fontSize="small"
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
            handleClassifyImage(currentImage.id, false);
          }}
        >
          <Tooltip title="Not Foaming">
            <ThumbDownIcon
              fontSize="small"
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
            handleClassifyImage(currentImage.id, null);
          }}
        >
          <Tooltip title="Clear">
            <ClearIcon fontSize="small" color="default" />
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
            alt={`created at ${image.dateCreated}`}
          />
        )}
      </Box>
    </Card>
  );
});
export default ImageCard;
