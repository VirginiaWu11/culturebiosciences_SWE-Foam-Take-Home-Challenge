import { useEffect, useState, useCallback } from "react";
import BackendApi from "../BackendApi";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ImageCard from "./ImageCard";

const ImagesList = () => {
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [isFoaming, setIsFoaming] = useState("null");
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [page, setPage] = useState(1);

  const getImages = useCallback(async (page, itemsPerPage, isFoaming) => {
    let response = await BackendApi.getImages(page, itemsPerPage, isFoaming);
    setImages(response.images);
    setTotalPages(response.totalPages);
  }, []);

  useEffect(() => {
    getImages(page, itemsPerPage, isFoaming);
  }, [getImages, page, itemsPerPage, isFoaming]);

  const FilterToggleButtons = () => {
    const handleChange = useCallback((event, nextView) => {
      setIsFoaming(nextView);
      setPage(1);
    }, []);

    return (
      <ToggleButtonGroup
        value={isFoaming}
        exclusive
        onChange={handleChange}
        sx={{ ml: 2, mt: 2 }}
      >
        <ToggleButton value="null" aria-label="unclassified">
          Unclassified
        </ToggleButton>
        <ToggleButton value="true" aria-label="foaming">
          Foaming
        </ToggleButton>
        <ToggleButton value="false" aria-label="not foaming">
          Not Foaming
        </ToggleButton>
        <ToggleButton value="all" aria-label="all images">
          All
        </ToggleButton>
      </ToggleButtonGroup>
    );
  };

  const NumberOfItemsSelect = () => {
    const handleChange = (event) => {
      setItemsPerPage(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 150, mx: 2, mb: 1 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="items-per-page">Items Per Page</InputLabel>
          <Select
            labelId="items-per-page"
            id="items-per-page"
            value={itemsPerPage}
            label="items per page"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={16}>Sixteen</MenuItem>
            <MenuItem value={24}>TwentyFour</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  const PaginationOutlined = ({ totalPages }) => {
    const handleChange = useCallback((event, value) => {
      setPage(value);
    }, []);
    return (
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </Stack>
    );
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FilterToggleButtons />
        </Box>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
          justifyContent="center"
          p={2}
        >
          {images.map((image) => (
            <Grid key={image.id} item xs={3} sm={3} md={3} lg={3}>
              <ImageCard key={image.id} image={image} />{" "}
            </Grid>
          ))}{" "}
        </Grid>

        <Grid container spacing={1} justifyContent="center" pt={2}>
          <NumberOfItemsSelect />
          <PaginationOutlined totalPages={totalPages} />
        </Grid>
      </Container>
    </div>
  );
};

export default ImagesList;
