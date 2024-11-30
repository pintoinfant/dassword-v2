import { Box, Flex, Button, Wrap, WrapItem } from "@chakra-ui/react";
import { useAccount, useDisconnect } from "wagmi";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Box marginLeft="auto">
        <Wrap direction={"row"} maxW={"80vw"} justify={"center"}>
          <WrapItem>
            <ThemeToggle />
          </WrapItem>
          {isConnected && (
            <>
              <WrapItem>
                <Button borderRadius="full" onClick={() => disconnect()}>
                  Disconnect
                </Button>
              </WrapItem>
            </>
          )}
        </Wrap>
      </Box>
    </Flex>
  );
};

export default Header;
