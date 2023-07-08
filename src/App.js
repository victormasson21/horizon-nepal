import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Link,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Modal } from "@mui/base";
import { Menu as MenuIcon } from "@mui/icons-material";
import { content, menuContent } from "./content";

import contour from "./assets/contour.svg";
import menuicon from "./assets/menuicon.png";
import menubackground from "./assets/menubackground.png";
import mountains from "./assets/mountains.png";
import contactBackground from "./assets/contactBackground.png";

import chitwan_1 from "./gallery/chitwan_1.png";
import chitwan_2 from "./gallery/chitwan_2.png";
import chitwan_3 from "./gallery/chitwan_3.png";
import chitwan_4 from "./gallery/chitwan_4.png";
import chitwan_5 from "./gallery/chitwan_5.png";

const Background = () => (
  <Box
    sx={{
      zIndex: -1,
      position: "fixed",
      inset: 0,
      background: `url(${contour})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      opacity: 0.6,
    }}
  ></Box>
);

const border = "2px solid #722b3f";
const borderRadius = 3;

const menuAnchorSize = "100px";

const blockStyling = {
  background: "#fff",
  padding: 2,
  borderRadius,
  border,
};

const titleStyling = {
  color: "#fff",
  background: "#722b3f",
  width: "fit-content",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontFamily: "Helvetica Neue, sans-serif",
  px: 2,
};

const MenuAnchor = ({ openMenu, setOpenMenu }) => (
  <Stack
    onClick={() => setOpenMenu(!openMenu)}
    justifyContent="center"
    alignItems="center"
    sx={{
      position: "fixed",
      top: "30px",
      zIndex: 1000,
      right: "30px",
      width: menuAnchorSize,
      height: menuAnchorSize,
      cursor: "pointer",
      background: `url(${menuicon})`,
      backgroundSize: `${menuAnchorSize} ${menuAnchorSize}`,
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.1)",
      },
    }}
  >
    <MenuIcon sx={{ color: "#722b3f", fontSize: 32 }} />
  </Stack>
);

const MenuContent = ({ openMenu, setOpenMenu }) => (
  <Modal open={openMenu} onClose={() => setOpenMenu(false)}>
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "400px",
        height: "600px",
        margin: "0 auto",
        background: `url(${menubackground}) no-repeat center center`,
        backgroundSize: "100%",
      }}
    >
      {menuContent.map(({ title, id }) => (
        <MenuItem
          onClick={() => setOpenMenu(false)}
          sx={{
            ml: -5,
            mb: 1,
            transition: "transform 0.3s",
            "&:hover": { backgroundColor: "unset", transform: "scale(1.1)" },
          }}
        >
          <Link
            underline="none"
            sx={{ ...titleStyling, fontSize: "1.5rem" }}
            href={`#${id}`}
          >
            {title}
          </Link>
        </MenuItem>
      ))}
    </Stack>
  </Modal>
);

const Title = ({ text }) => (
  <Typography
    variant="subtitle1"
    sx={{ ...titleStyling, fontSize: "2rem" }}
    mt={4}
    mb={2}
    px={2}
  >
    {text}
  </Typography>
);

const Mountains = () => (
  <Box
    component="img"
    src={mountains}
    alt="Mountains, Gandalf"
    sx={{ maxWidth: "250px" }}
  />
);

const Intro = ({ content }) => {
  return (
    <Stack id="intro" sx={{ ...blockStyling, mb: 5, alignItems: "center" }}>
      <Mountains />
      <Typography sx={{ ...titleStyling, fontSize: "2rem", my: 1 }}>
        {content.title}
      </Typography>
      {content.text.map((paragraph, index) => (
        <Typography my={2} key={index}>
          {paragraph}
        </Typography>
      ))}
    </Stack>
  );
};

const Actions = ({ section }) => (
  <Stack id="actions" alignItems="center">
    <Title text={section.title} />
    <Stack
      spacing={3}
      sx={{
        ...blockStyling,
        mb: 5,
      }}
    >
      {section.content.map((subsection) => (
        <Block
          key={subsection.title}
          title={subsection.title}
          text={subsection.text}
        />
      ))}
    </Stack>
  </Stack>
);

const Block = ({ title, text }) => (
  <Stack spacing={3}>
    <Typography variant="h6" sx={{ color: "#722b3f" }}>
      {title}
    </Typography>
    {text.map((paragraph, index) => (
      <Typography my={2} key={index}>
        {paragraph}
      </Typography>
    ))}
  </Stack>
);

const Gallery = () => {
  const images = [chitwan_1, chitwan_2, chitwan_3, chitwan_4, chitwan_5];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      currentImage === images.length - 1
        ? setCurrentImage(0)
        : setCurrentImage(currentImage + 1);
      console.log({ currentImage });
    }, 4000);
  }, [currentImage, images.length]);

  return (
    <Box
      id="gallery"
      component="img"
      sx={{ borderRadius, border, width: "100%" }}
      src={images[currentImage]}
    />
  );
};

const History = ({ content }) => {
  return (
    <Stack id="history" alignItems="center">
      <Title text="Histoire" />
      <Stack sx={{ ...blockStyling, pb: 5 }}>
        {content.map(({ title, text }) => (
          <Accordion
            elevation={0}
            sx={{ "&:before": { backgroundColor: "unset" } }}
          >
            <AccordionSummary sx={{ borderBottom: border }}>
              <Typography variant="h6" sx={{ color: "#722b3f" }}>
                {title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{text}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Stack>
  );
};

const Contact = () => {
  const { breakpoints } = useTheme();
  return (
    <Stack
      id="contact"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "relative",
        py: 10,
        overflow: "visible",
      }}
    >
      <Box
        component="img"
        src={contactBackground}
        alt="abstract-background"
        sx={{
          width: "80%",

          position: "absolute",
          [breakpoints.down("sm")]: { width: "100%", height: "120px" },
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: "#722b3f",
          position: "absolute",
          mt: -3.5,
          fontSize: "1rem",
        }}
      >
        horizons.nepal34@gmail.com
      </Typography>
      {/* <Typography
        sx={{
          position: "absolute",
          mt: -3.5,
          ...titleStyling,
          textTransform: "unset",
          fontSize: "0.9rem",
        }}
      ></Typography> */}
    </Stack>
  );
};

const App = () => {
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    console.log({ openMenu });
  }, [openMenu]);

  return (
    <Container>
      <Background />
      <MenuContent openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <MenuAnchor openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Stack
        sx={{
          alignItems: "flex-start",
          maxWidth: 700,
          margin: "0 auto",
          pt: menuAnchorSize,
        }}
      >
        <Stack
          sx={{
            display: openMenu ? "none" : "unset",
            pt: 3,
            pb: 10,
          }}
          spacing={15}
        >
          <Intro content={content.intro} />

          <Actions section={content.actions} />

          <Gallery />

          <History content={content.histoire.content} />

          <Contact />
        </Stack>
      </Stack>
    </Container>
  );
};

export default App;
