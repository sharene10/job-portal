import React from 'react';
import {
  Box,
  Input,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  useToast
} from '@chakra-ui/react';

const ProfileForm = ({ isOpen, onClose }) => {
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Box mb={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter your name"
                  variant="outline"
                  _placeholder={{ color: 'gray.500' }}
                  mb={3}
                />
              </FormControl>
              <FormControl id="age" isRequired>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your age"
                  variant="outline"
                  _placeholder={{ color: 'gray.500' }}
                  mb={3}
                />
              </FormControl>
              <FormControl id="degree" isRequired>
                <FormLabel>Degree</FormLabel>
                <Input
                  placeholder="Enter your degree"
                  variant="outline"
                  _placeholder={{ color: 'gray.500' }}
                  mb={3}
                />
              </FormControl>
              <FormControl id="university" isRequired>
                <FormLabel>University</FormLabel>
                <Input
                  placeholder="Enter your university"
                  variant="outline"
                  _placeholder={{ color: 'gray.500' }}
                  mb={3}
                />
              </FormControl>
              <FormControl id="dob" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  placeholder="Select your date of birth"
                  variant="outline"
                  mb={3}
                />
              </FormControl>
              <FormControl id="hobby">
                <FormLabel>Hobby</FormLabel>
                <Input
                  placeholder="Enter your hobby"
                  variant="outline"
                  _placeholder={{ color: 'gray.500' }}
                  mb={3}
                />
              </FormControl>
              <FormControl id="skills" isRequired>
                <FormLabel>Skills</FormLabel>
                <Textarea
                  placeholder="Describe your skills"
                  variant="outline"
                  _placeholder={{ color: 'gray.500' }}
                  mb={3}
                />
              </FormControl>
              <FormControl id="profile-picture">
                <FormLabel>Profile Picture</FormLabel>
                <Input
                  type="file"
                  mb={3}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="full"
                mt={4}
                _hover={{ bg: 'blue.600' }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfileForm;
