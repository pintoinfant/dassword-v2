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
  useColorModeValue,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  useSafeLayoutEffect

} from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import { useAccount } from "wagmi"
import Lit from "../../components/LitProtocol"

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}


export default function Application() {
  const { address } = useAccount()
  const [credType, setCredType] = useState("")
  const [webPassword, setWebPassword] = useState({
    site: "",
    username: "",
    password: ""
  })
  const [appPassword, setAppPassword] = useState({
    appName: "",
    username: "",
    password: ""
  })
  const [serverCredential, setServerCredential] = useState({
    host: "",
    username: "",
    password: "",
    port: ""
  })
  const [databaseCredential, setDatabaseCredential] = useState({
    type: "",
    host: "",
    username: "",
    password: "",
    port: "",
    database: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [data, setData] = useState([])

  const lit = new Lit()

  const handleSubmit = async (credential: any) => {
    onClose()
    const encrypted = await lit.encryptText(JSON.stringify(credential), address)
    console.log(encrypted)
    setCredType("")
    const decrypted = await lit.decryptText(encrypted.encryptedString, encrypted.encryptedSymmetricKey, address)
    console.log(JSON.parse(decrypted))
  }

  return (
    <Box>
      <Flex
        as="header"
        width="full"
        align="center"
        alignSelf="flex-start"
        justifyContent="center"
        gridGap={2}
      >
        <Box marginLeft="auto">
          <Button onClick={onOpen}>Add New Password</Button>
        </Box>
      </Flex>
      <Box minH={'60vh'}>
        {data.length > 0 ? (
          <Heading>My <Text as={'span'} color={'green.400'}
            textTransform={'capitalize'}
          >
            Passwords
          </Text></Heading>
        ) : (
          <Heading><Text as={'span'} color={'green.400'}
            textTransform={'capitalize'}
          >
            No Password {" "}
          </Text>
            Created</Heading>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select placeholder='Select a type' size={'md'} variant={'filled'} onChange={(e) => setCredType(e.target.value)}>
              <option value='app-password'>App Password</option>
              <option value='web-password'>Web Password</option>
              <option value='server-credential'>Server Credential</option>
              <option value='database-credential'>Database Credential</option>
            </Select>
            <Stack spacing={4} marginTop={4}>
              {
                credType === "web-password" && (
                  <>
                    <FormControl id="site" isRequired>
                      <FormLabel>Enter Website</FormLabel>
                      <Input type="url" onChange={(e) => setWebPassword({ ...webPassword, site: e.target.value })} />
                    </FormControl>
                    <HStack>
                      <Box>
                        <FormControl id="username" isRequired>
                          <FormLabel>Username</FormLabel>
                          <Input type="text" onChange={(e) => setWebPassword({ ...webPassword, username: e.target.value })} />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="password" isRequired>
                          <FormLabel>Password</FormLabel>
                          <Input type="password" onChange={(e) => setWebPassword({ ...webPassword, password: e.target.value })} />
                        </FormControl>
                      </Box>
                    </HStack>
                    <Button colorScheme={'green'}
                      bg={'green.400'}
                      px={6}
                      _hover={{
                        bg: 'green.500',
                      }} mr={3} onClick={(e: any) => handleSubmit(webPassword)}>
                      Submit
                    </Button>
                  </>
                )
              }
              {
                credType === "app-password" && (
                  <>
                    <FormControl id="site" isRequired>
                      <FormLabel>Enter App Name</FormLabel>
                      <Input type="url" onChange={(e) => setAppPassword({ ...appPassword, appName: e.target.value })} />
                    </FormControl>
                    <HStack>
                      <Box>
                        <FormControl id="username" isRequired>
                          <FormLabel>Username</FormLabel>
                          <Input type="text" onChange={(e) => setAppPassword({ ...appPassword, username: e.target.value })} />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="password" isRequired>
                          <FormLabel>Password</FormLabel>
                          <Input type="password" onChange={(e) => setAppPassword({ ...appPassword, password: e.target.value })} />
                        </FormControl>
                      </Box>
                    </HStack>
                    <Button colorScheme={'green'}
                      bg={'green.400'}
                      px={6}
                      _hover={{
                        bg: 'green.500',
                      }} mr={3} onClick={(e: any) => handleSubmit(appPassword)}>
                      Submit
                    </Button></>
                )
              }
              {
                credType === "server-credential" && (
                  <>
                    <FormControl id="host" isRequired>
                      <FormLabel>Enter Host</FormLabel>
                      <Input type="text" onChange={(e) => setServerCredential({ ...serverCredential, host: e.target.value })} />
                    </FormControl>
                    <HStack>
                      <Box>
                        <FormControl id="username" isRequired>
                          <FormLabel>Username</FormLabel>
                          <Input type="text" onChange={(e) => setServerCredential({ ...serverCredential, username: e.target.value })} />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="password" isRequired>
                          <FormLabel>Password</FormLabel>
                          <Input type="password" onChange={(e) => setServerCredential({ ...serverCredential, password: e.target.value })} />
                        </FormControl>
                      </Box>
                    </HStack>
                    <FormControl id="port" isRequired>
                      <FormLabel>Enter Port Number</FormLabel>
                      <Input type="text" onChange={(e) => setServerCredential({ ...serverCredential, port: e.target.value })} />
                    </FormControl>
                    <Button colorScheme={'green'}
                      bg={'green.400'}
                      px={6}
                      _hover={{
                        bg: 'green.500',
                      }} mr={3} onClick={(e: any) => handleSubmit(serverCredential)}>
                      Submit
                    </Button></>
                )
              }
              {
                credType === "database-credential" && (
                  <>
                    <FormControl id="host" isRequired>
                      <FormLabel>Enter Host</FormLabel>
                      <Input type="text" onChange={(e) => setDatabaseCredential({ ...databaseCredential, host: e.target.value })} />
                    </FormControl>
                    <HStack>
                      <Box>
                        <FormControl id="username" isRequired>
                          <FormLabel>Username</FormLabel>
                          <Input type="text" onChange={(e) => setDatabaseCredential({ ...databaseCredential, username: e.target.value })} />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="password" isRequired>
                          <FormLabel>Password</FormLabel>
                          <Input type="password" onChange={(e) => setDatabaseCredential({ ...databaseCredential, password: e.target.value })} />
                        </FormControl>
                      </Box>
                    </HStack>
                    <HStack>
                      <Box>
                        <FormControl id="port" isRequired>
                          <FormLabel>Enter Port Number</FormLabel>
                          <Input type="text" onChange={(e) => setDatabaseCredential({ ...databaseCredential, port: e.target.value })} />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="name" isRequired>
                          <FormLabel>Database</FormLabel>
                          <Input type="password" onChange={(e) => setDatabaseCredential({ ...databaseCredential, database: e.target.value })} />
                        </FormControl>
                      </Box>
                    </HStack>
                    <FormControl id="type" isRequired>
                      <FormLabel>Database Type</FormLabel>
                      <Input type="text" onChange={(e) => setDatabaseCredential({ ...databaseCredential, type: e.target.value })} />
                    </FormControl>
                    <Button colorScheme={'green'}
                      bg={'green.400'}
                      px={6}
                      _hover={{
                        bg: 'green.500',
                      }} mr={3} onClick={(e: any) => handleSubmit(databaseCredential)}>
                      Submit
                    </Button></>
                )
              }
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={'green'}
              bg={'green.400'}
              px={6}
              _hover={{
                bg: 'green.500',
              }} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}