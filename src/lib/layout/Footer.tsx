import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
    >
      <Text fontSize="xs">
        Made with ❤️ by{" "} Team Silly Server's
      </Text>
    </Flex>
  );
};

export default Footer;
