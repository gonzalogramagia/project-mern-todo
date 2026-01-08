import { Container, SimpleGrid, Text, VStack, Spinner, Button, useToast, Box, CloseButton } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTaskTodos } from "../todos/task";
import TaskCard from "../components/TaskCard";
import { AddIcon } from "@chakra-ui/icons";

const HomePage = () => {
  const { fetchTasks, tasks, loading } = useTaskTodos();

  const toast = useToast();

  const progressAnimation = keyframes`
    from { width: 100%; }
    to { width: 0%; }
  `;

  useEffect(() => {
    fetchTasks();

    toast.closeAll();
    toast({
      id: "responsibility-toast",
      position: "top",
      duration: 3300,
      render: ({ onClose }) => (
        <Box
          mt={8}
          color="black"
          p={3}
          bg="yellow.400"
          borderRadius="md"
          boxShadow="lg"
          position="relative"
          overflow="hidden"
          pr={8}
        >
          <Text fontWeight="bold" mb={2}>
            Be responsible
          </Text>
          <Text fontSize="sm">
            This application is public. Please be responsible when testing.
          </Text>
          <CloseButton
            position="absolute"
            right={1}
            top={1}
            onClick={onClose}
            size="sm"
            color="black"
            zIndex={10}
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            h="4px"
            bg="black"
            animation={`${progressAnimation} 4s linear`}
          />
        </Box>
      ),
    });

    // If you need to close it manually later, you can use toast.close(toastId);
    // For this specific toast, the duration handles auto-closing.
  }, [fetchTasks, toast]);
  console.log("tasks:", tasks);

  return (
    <Container maxW="1140px" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          📌 Current Tasks
        </Text>

        {loading && <Spinner size={"xl"} />}

        {!loading && (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </SimpleGrid>
        )}

        {!loading && tasks.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No task found → {" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a task
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;
