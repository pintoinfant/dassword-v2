import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
  useColorMode,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Lit from "../../components/LitProtocol";
// import { supabase } from "../../helpers/supbaseClient"
import Loader from "../../components/Loader";
import { pocketbase } from "../../helpers/pocketbase"

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

export default function Application() {
  const { colorMode } = useColorMode();
  const { address } = useAccount();
  const [webPassword, setWebPassword] = useState({
    service: "",
    username: "",
    password: "",
  });

  const [decryptedPassword, setDecryptedPassword] = useState<any>({
    service: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<any>([]);
  const lit = new Lit();

  const blobToBase64 = (blob: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const convertToBlob = async (base64: any) => {
    const res = await fetch(base64);
    const blob = await res.blob();
    return blob;
  };

  const handleDecrypt = async (encrypted_string: any, encrypted_key: any) => {
    setLoading(true);
    const blob = await convertToBlob(encrypted_string);
    const decrypted = await lit.decryptText(blob, encrypted_key, address);
    const jsonData = JSON.parse(decrypted);
    setDecryptedPassword(jsonData);
    setLoading(false);
  };

  const handleSubmit = () => {
    onClose();
    setLoading(true);
    lit
      .encryptText(JSON.stringify(webPassword), address)
      .then((encrypted) => {
        blobToBase64(encrypted.encryptedString).then((res) => {
          pocketbase.collection("passwords").create({
            address,
            service: webPassword.service,
            encrypted_string: res,
            key: encrypted.encryptedSymmetricKey,
          })
        });
      }).then(() => {
        renderData();
      })
  };

  const renderData = async () => {
    setLoading(true);
    const data = await pocketbase.collection("passwords").getFullList({
      address
    })
    setData(data)
    setLoading(false);
  };

  const deleteCredential = async (id: any) => {
    setLoading(true);
    await pocketbase.collection("passwords").delete(id)
    await renderData();
  };

  useEffect(() => {
    renderData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <Flex
        as="header"
        width="full"
        align="center"
        // alignSelf="flex-start"
        justifyContent="space-between"
        gridGap={2}
        marginRight={4}
      >
        <Box>
          {data.length > 0 ? (
            <Heading>
              My{" "}
              <Text as={"span"} color={"blue.400"} textTransform={"capitalize"}>
                Passwords
              </Text>
            </Heading>
          ) : (
            <Heading>
              <Text as={"span"} color={"blue.400"} textTransform={"capitalize"}>
                No Password{" "}
              </Text>
              Created
            </Heading>
          )}
        </Box>
        <Box>
          <Button borderRadius="full" onClick={onOpen}>
            Add New Password
          </Button>
        </Box>
      </Flex>
      <Box minH={"60vh"} marginY={5}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={2}
        >
          {data.map((item: any, index: any) => {
            // console.log(item)
            return (
              <>
                <GridItem key={index}>
                  <Card
                    key={index}
                  >
                    <CardBody>
                      <Stack spacing={4} marginTop={4}>
                        <FormControl id="service" isRequired isReadOnly>
                          <FormLabel>Service Name</FormLabel>
                          <Input type="url" defaultValue={item.service} />
                        </FormControl>
                        <HStack>
                          <Box>
                            <FormControl id="username" isRequired isReadOnly>
                              <FormLabel>Username</FormLabel>
                              <Input
                                type="text"
                                defaultValue={
                                  item.service === decryptedPassword.service
                                    ? decryptedPassword.username
                                    : ""
                                }
                              />
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl id="password" isRequired isReadOnly>
                              <FormLabel>Password</FormLabel>
                              <Input
                                type="text"
                                defaultValue={
                                  item.service === decryptedPassword.service
                                    ? decryptedPassword.password
                                    : ""
                                }
                              />
                            </FormControl>
                          </Box>
                        </HStack>
                        <Stack direction={{ base: "column", md: "row" }}>
                          <Button
                            colorScheme={"blue"}
                            bg={"blue.400"}
                            px={6}
                            _hover={{
                              bg: "blue.500",
                            }}
                            onClick={(e: any) =>
                              handleDecrypt(
                                item.encrypted_string,
                                item.encrypted_key,
                              )
                            }
                          >
                            Decrypt Credential
                          </Button>
                          <Button
                            colorScheme={"red"}
                            px={6}
                            mr={3}
                            onClick={(e: any) => deleteCredential(item.id)}
                          >
                            Delete Credential
                          </Button>
                        </Stack>
                      </Stack>{" "}
                    </CardBody>
                  </Card>
                </GridItem>
              </>
            );
          })}
        </Grid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} marginTop={4}>
              <FormControl id="service" isRequired>
                <FormLabel>Service Name</FormLabel>
                <Input
                  borderRadius="full"
                  focusBorderColor={
                    colorMode == "dark" ? "gray.300" : "gray.700"
                  }
                  type="url"
                  onChange={(e) =>
                    setWebPassword({ ...webPassword, service: e.target.value })
                  }
                />
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      borderRadius="full"
                      focusBorderColor={
                        colorMode == "dark" ? "gray.300" : "gray.700"
                      }
                      type="text"
                      onChange={(e) =>
                        setWebPassword({
                          ...webPassword,
                          username: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      borderRadius="full"
                      focusBorderColor={
                        colorMode == "dark" ? "gray.300" : "gray.700"
                      }
                      type="password"
                      onChange={(e) =>
                        setWebPassword({
                          ...webPassword,
                          password: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </Box>
              </HStack>
              <Button
                colorScheme={"blue"}
                bg={"blue.400"}
                px={6}
                borderRadius="full"
                _hover={{
                  bg: "blue.500",
                }}
                mr={3}
                onClick={(e: any) => handleSubmit()}
              >
                Submit
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"blue"}
              bg={"blue.400"}
              px={6}
              borderRadius="full"
              _hover={{
                bg: "blue.500",
              }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
