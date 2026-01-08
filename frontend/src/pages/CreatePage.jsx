import {
  Container,
  VStack,
  Heading,
  useColorModeValue,
  Box,
  Input,
  Button,
  useToast,
  Text,
  Link,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskTodos } from "../todos/task";

const CreatePage = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    image: "",
  });

  const { createTask } = useTaskTodos();
  const toast = useToast();
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    const { success, message } = await createTask(newTask);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    } else {
      navigate("/");
      console.log("something");
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Container maxW="container.sm" py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
          >
            ✍ Create New Task
          </Text>
          <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            rounded={"lg"}
            shadow={"md"}
          >
            <VStack spacing={4}>
              <Input
                placeholder="Title"
                name="title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                name="description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newTask.image}
                onChange={(e) =>
                  setNewTask({ ...newTask, image: e.target.value })
                }
              />
              <Text fontSize="sm" color="gray.500">
                Visit{" "}
                <Link href="https://unsplash.com/" isExternal color="blue.500">
                  Unsplash
                </Link>
                , right-click an image and select "Copy Image Address".
              </Text>
              {newTask.image && newTask.image.includes("unsplash.com/photos/") && (
                <Text fontSize="xs" color="red.500">
                  Warning: This looks like a page URL, not an image URL.
                </Text>
              )}
              {newTask.image && newTask.image.startsWith("http") && (
                <Image
                  src={newTask.image}
                  alt="Preview"
                  borderRadius="md"
                  objectFit="cover"
                  maxH="200px"
                  w="full"
                  fallbackSrc="https://via.placeholder.com/150"
                />
              )}
              <Button colorScheme="blue" onClick={handleAddProduct} w="full">
                Add Task
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default CreatePage;
