import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginInAction } from "../Redux/Actions/userActions";

const intState = {
  email: "",
  password: "",
};

// Updated background image
let bgImg = "https://images.pexels.com/photos/3184421/pexels-photo-3184421.jpeg";

const LoginPage = () => {
  const [formData, setFormData] = useState(intState);
  const [showPassword, setShowPassword] = useState(false);
  const { loginStatus, token, loading } = useSelector((state) => state.UserLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { email, password } = formData;
  let isEmpty = Boolean(email) && Boolean(password);

  const Toaster = (title, message, status) => {
    toast({
      title: title,
      position: "top",
      description: message,
      status: status,
      duration: 1500,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (loginStatus && isEmpty) {
      if (token.role === "admin") {
        setTimeout(() => {
          navigate("/adminjobform");
        }, 1600);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1600);
      }
    }
  }, [loginStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoginInAction(email, password, Toaster));
  };

  return (
    <Flex
      justify={"center"}
      align={"center"}
      h={"100vh"}
      bgImage={bgImg}
      bgSize="cover"
      bgPosition="center"
      position="relative"
      py={4}
    >
      {/* Gradient overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bgGradient="linear(to-t, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"
        zIndex="0"
      />

      <Stack
        spacing={6}
        mx={"auto"}
        maxW={"lg"}
        px={6}
        py={8}
        position="relative"
        zIndex="1"
        bg="white"
        boxShadow="xl"
        borderRadius="md"
        p={8}
        borderWidth="1px"
      >
        <Stack align={"center"} mb={6}>
          <Heading
            fontSize={"2xl"}
            color={"gray.800"}
            textAlign={"center"}
            mb={2}
          >
            Login to Your Account
          </Heading>
          <Text fontSize={"md"} color={"gray.600"}>
            Please enter your credentials to access your account.
          </Text>
        </Stack>
        <Box>
          <Stack spacing={5}>
            <FormControl id="email" isRequired>
              <FormLabel fontWeight={"medium"} color="teal.600">Email Address</FormLabel>
              <Input 
                type="email" 
                name="email" 
                value={email} 
                onChange={handleChange} 
                isRequired 
                focusBorderColor="teal.500"
                variant="outline"
                bg="white"
                borderColor="teal.300"
                _placeholder={{ color: "teal.400" }}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel fontWeight={"medium"} color="teal.600">Password</FormLabel>
              <InputGroup>
                <Input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  value={password} 
                  onChange={handleChange} 
                  isRequired 
                  focusBorderColor="teal.500"
                  variant="outline"
                  bg="white"
                  borderColor="teal.300"
                  _placeholder={{ color: "teal.400" }}
                  placeholder="Enter your password"
                  color="gray.800" // Text color of the input
                  _hover={{ borderColor: "teal.400" }} // Border color on hover
                />
                <InputRightElement h={"full"}>
                  <Button 
                    variant={"link"} 
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                    color={"teal.500"}
                    fontSize={"sm"}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6} pt={4}>
              <Button
                isLoading={loading}
                loadingText="Submitting"
                size="lg"
                bg={"teal.500"}
                color={"white"}
                _hover={{
                  bg: "teal.600",
                }}
                onClick={handleSubmit}
                borderRadius="md"
                boxShadow="md"
              >
                Sign In
              </Button>
            </Stack>
            <Stack pt={4} textAlign={"center"}>
              <Text fontSize={"sm"} color={"gray.600"}>
                Not Registered Yet?{" "}
                <Link to={"/Signup"} style={{ color: "teal", fontWeight: "bold" }}>
                  Signup
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
