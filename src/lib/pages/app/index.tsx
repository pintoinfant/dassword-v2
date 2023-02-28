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
  Select

} from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import { useAccount } from "wagmi"

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}


export default function Application() {
  const { address } = useAccount()
  const [credType, setCredType] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select placeholder='Select a type' size={'md'} variant={'filled'} onChange={(e) => setCredType(e.target.value)}>
              <option value='app-pass'>App Password</option>
              <option value='web-pass'>Web Password</option>
              <option value='server-cred'>Server Credential</option>
              <option value='database-cred'>Database Credential</option>
            </Select>
            {/* <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack> */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}