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
  useDisclosure
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
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    // <Container maxW={'5xl'} py={12}>
    //   <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
    //     <Stack spacing={4}>
    //       <Text
    //         textTransform={'uppercase'}
    //         color={'blue.400'}
    //         fontWeight={600}
    //         fontSize={'sm'}
    //         bg={useColorModeValue('blue.50', 'blue.900')}
    //         p={2}
    //         alignSelf={'flex-start'}
    //         rounded={'md'}>
    //         Our Story
    //       </Text>
    //       <Heading></Heading>
    //       <Text color={'gray.500'} fontSize={'lg'}>
    //         Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    //         nonumy eirmod tempor invidunt ut labore
    //       </Text>
    //       <Stack
    //         spacing={4}
    //         divider={
    //           <StackDivider
    //             borderColor={useColorModeValue('gray.100', 'gray.700')}
    //           />
    //         }>
    //         <Feature
    //           // icon={
    //           //   // <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
    //           // }
    //           iconBg={useColorModeValue('yellow.100', 'yellow.900')}
    //           text={'Business Planning'}
    //         />
    //         <Feature
    //           // icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
    //           iconBg={useColorModeValue('green.100', 'green.900')}
    //           text={'Financial Planning'}
    //         />
    //         <Feature
    //           // icon={
    //           //   <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
    //           // }
    //           iconBg={useColorModeValue('purple.100', 'purple.900')}
    //           text={'Market Analysis'}
    //         />
    //       </Stack>
    //     </Stack>
    //     <Flex>
    //       <Image
    //         rounded={'md'}
    //         alt={'feature image'}
    //         src={
    //           'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    //         }
    //         objectFit={'cover'}
    //       />
    //     </Flex>
    //   </SimpleGrid>
    // </Container>
    <Box>
      <Flex>
        <Button onClick={onOpen}>Add New Password</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
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
                      {/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
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