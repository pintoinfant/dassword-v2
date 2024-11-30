import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => navigate("/");

  return (
    <Grid gap={4} textAlign="center" minH={"50vh"}>
      <Heading>Page not Found</Heading>
      <Box>
        <Button onClick={handleBackToHome} size={"sm"}>
          Let&apos;s Head Back
        </Button>
      </Box>
    </Grid>
  );
};

export default Page404;
