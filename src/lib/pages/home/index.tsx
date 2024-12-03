import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect } from "react";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const Home = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const navigate = useNavigate();
  // const handleToLogin = () => navigate("/login");

  useEffect(() => {
    if (isConnected) {
      localStorage.setItem("address", address as string);
      navigate("/app");
    }
  }, [isConnected]);

  return (
    <>
      <Box minH={"50vh"}>
        <Stack as={Box} textAlign={"center"} spacing={{ base: 8, md: 14 }}>
          <Heading
            fontWeight={600}
            textTransform={"capitalize"}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Keep your password safe <br />
            <Text as={"span"} color={"blue.400"} textTransform={"capitalize"}>
              “Really Safe”
            </Text>
          </Heading>
          <Text>
            Our advanced technology ensures protection against password breaches
            and unauthorized access. Choose our ultimate decentralized password
            manager for secure storage and encryption of your passwords. Rest
            easy with peace of mind and trust in our commitment to safeguard
            your online life.
          </Text>
          <Stack
            direction={"row"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"blue"}
              bg={"blue.400"}
              px={6}
              _hover={{
                bg: "blue.500",
              }}
              borderRadius="full"
              onClick={() => connect()}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
