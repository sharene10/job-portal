import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";

const ProfileForm = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    degree: "",
    university: "",
    experience: "",
    resume: null,
  });

  // Responsive width for Modal
  const modalSize = useBreakpointValue({ base: "xs", md: "md", lg: "lg" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = () => {
    if (
      formData.fullName &&
      formData.degree &&
      formData.university &&
      formData.experience &&
      formData.resume
    ) {
      // Simulate form submission
      toast({
        title: "Profile updated.",
        description: "Your profile details have been submitted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose(); // Close the modal
    } else {
      toast({
        title: "Error",
        description: "Please fill out all fields and upload your resume.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired mb={4}>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Degree</FormLabel>
            <Input
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
              placeholder="Enter your degree"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>University</FormLabel>
            <Input
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              placeholder="Enter your university"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Experience</FormLabel>
            <Textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Briefly describe your experience"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel>Resume</FormLabel>
            <Input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" ml={3} onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileForm;
