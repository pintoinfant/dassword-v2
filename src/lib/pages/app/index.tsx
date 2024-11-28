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
  Card, CardHeader, CardBody, CardFooter, Wrap, WrapItem,
  Grid, GridItem
} from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react';
import { useAccount } from "wagmi"
import Lit from "../../components/LitProtocol"
// import { supabase } from "../../helpers/supbaseClient"
import Loader from '../../components/Loader';


interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}


export default function Application() {
  const { address } = useAccount()
  const [webPassword, setWebPassword] = useState({
    site: "",
    username: "",
    password: ""
  })

  const [decryptedPassword, setDecryptedPassword] = useState<any>({
    site: "",
    username: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<any>([])
  const lit = new Lit()

  const blobToBase64 = (blob: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const convertToBlob = async (base64: any) => {
    const res = await fetch(base64)
    const blob = await res.blob()
    return blob
  }

  const handleDecrypt = async (encrypted_string: any, encrypted_key: any) => {
    setLoading(true)
    const blob = await convertToBlob(encrypted_string)
    console.log(blob)
    const decrypted = await lit.decryptText(blob, encrypted_key, address)
    const jsonData = (JSON.parse(decrypted))
    console.log(jsonData)
    // setDecryptedPassword(jsonData)
    // setLoading(false)
  }

  const handleSubmit = () => {
    onClose()
    setLoading(true)
    lit.encryptText(JSON.stringify(webPassword), address).then((encrypted) => {
      blobToBase64(encrypted.encryptedString).then(res => {
        console.log( {
              address,
              site: webPassword.site,
              encrypted_string: res,
              encrypted_key: encrypted.encryptedSymmetricKey
        })
        handleDecrypt(res,encrypted.encryptedSymmetricKey)
        // supabase.from('details').insert([
        //   {
        //     address,
        //     site: webPassword.site,
        //     encrypted_string: res,
        //     encrypted_key: encrypted.encryptedSymmetricKey
        //   }
        // ]).then(() => {
        //   supabase.from('details').select('*').eq('address', address).then((data) => {
        //     if (data) {
        //       setData(data.data)
        //     }
        //   })
        // })
      })
    }).then(
      () => {setLoading(false)
      })
      // .then(() => setLoading(false))
      .then(() => { renderData() })
    // .then(() => setLoading())
    // setLoading(false)

  }

  const renderData = async () => {
    setLoading(true)
    // const { data, error }: { data: any, error: any } = await supabase
    //   .from('details')
    //   .select('*')
    //   .eq('address', address)
    // if (data) {
    //   setData(data)
    // }
    setLoading(false)
  }

  const deleteCredential = async (id: any) => {
    setLoading(true)
    // console.log(id)
    // const { data, error } = await supabase
    //   .from('details')
    //   .delete()
    //   .eq('id', id)
    // console.log(data)
    // setLoading(false)
    await renderData()
  }


  useEffect(() => {
    renderData()
  }, [])

  if (loading) {
    return <Loader />
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
        <Box>
          <Button onClick={onOpen}>Add New Password</Button>
        </Box>
      </Flex>
      <Box minH={'60vh'} marginY={5}>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={2}>
          {data.map((item: any, index: any) => {
            // console.log(item)
            return (
              <>
                <GridItem key={index}>
                  <Card maxW={{ base: '100vw', md: '50vw', lg: '25vw' }} key={index}>
                    <CardBody>
                      <Stack spacing={4} marginTop={4}>
                        <FormControl id="site" isRequired isReadOnly>
                          <FormLabel>Website / App Name</FormLabel>
                          <Input type="url" defaultValue={item.site} />
                        </FormControl>
                        <HStack>
                          <Box>
                            <FormControl id="username" isRequired isReadOnly>
                              <FormLabel>Username</FormLabel>
                              <Input type="text" defaultValue={(item.site === decryptedPassword.site) ? decryptedPassword.username : ''} />
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl id="password" isRequired isReadOnly>
                              <FormLabel>Password</FormLabel>
                              <Input type="text" defaultValue={(item.site === decryptedPassword.site) ? decryptedPassword.password : ''} />
                            </FormControl>
                          </Box>
                        </HStack>
                        <Stack direction={{ base: 'column', md: 'row' }}>
                          <Button colorScheme={'green'}
                            bg={'green.400'}
                            px={6}
                            _hover={{
                              bg: 'green.500',
                            }} onClick={(e: any) => handleDecrypt(item.encrypted_string, item.encrypted_key)}>
                            Decrypt Credential
                          </Button>
                          <Button colorScheme={'red'} px={6} mr={3} onClick={(e: any) => deleteCredential(item.id)}>
                            Delete Credential
                          </Button>
                        </Stack>
                      </Stack>                    </CardBody>
                  </Card>
                </GridItem>
              </>
            )
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
              <FormControl id="site" isRequired>
                <FormLabel>Enter Website / App Name</FormLabel>
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
                }} mr={3} onClick={(e: any) => handleSubmit()}>
                Submit
              </Button>
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
    </Box >
  );
}