import { EmailIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import UnderlineHeader from "../UnderlineHeader";

interface Fields {
	name: string;
	email: string;
	message: string;
}

export default function Contact() {
	const { handleSubmit, register, formState } = useForm<Fields>();

	function onSubmit(fields: Fields) {
		return fetch("/api/v1/contact-submit", { method: "POST", body: JSON.stringify(fields) });
	}

	return (
		<Box as="section" py="5rem" bgColor="gray.700" onSubmit={handleSubmit(onSubmit)}>
			<Container maxW="container.xl" as="form">
				<UnderlineHeader label="Contact" />
				<Flex gap={20}>
					<FormControl isInvalid={Boolean(formState.errors.name)}>
						<FormLabel htmlFor="name">Name</FormLabel>
						<Input
							size="lg"
							isRequired
							variant="filled"
							id="name"
							placeholder="Obi-Wan Kenobi"
							{...register("name", {
								required: {
									message: "Name is required.",
									value: true,
								},
								maxLength: {
									message: "Max length is 100 characters.",
									value: 100,
								},
							})}
						/>
						<FormErrorMessage color="red.400">{formState.errors.name?.message}</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={Boolean(formState.errors.email)}>
						<FormLabel htmlFor="email">Email address</FormLabel>
						<Input
							size="lg"
							isRequired
							variant="filled"
							type="email"
							id="email"
							placeholder="obi-wan.kenobi@republic.com"
							{...register("email", {
								required: {
									message: "Email is required.",
									value: true,
								},
								maxLength: {
									message: "Max length is 100 characters.",
									value: 100,
								},
							})}
						/>
						<FormErrorMessage color="red.400">{formState.errors.email?.message}</FormErrorMessage>
					</FormControl>
				</Flex>
				<FormControl mt={8} isInvalid={Boolean(formState.errors.message)}>
					<FormLabel htmlFor="message">Message</FormLabel>
					<Textarea
						rows={10}
						isRequired
						variant="filled"
						id="message"
						placeholder="Hello there"
						resize="vertical"
						{...register("message", {
							required: {
								message: "Message is required.",
								value: true,
							},
							maxLength: {
								message: "Max length is 500 characters.",
								value: 500,
							},
						})}
					/>
					<FormErrorMessage color="red.400">{formState.errors.message?.message}</FormErrorMessage>
				</FormControl>
				<Button type="submit" variant="primary-icon" mt={8} isLoading={formState.isSubmitting}>
					<EmailIcon mr={3} fontSize="xl" />
					Send
				</Button>
			</Container>
		</Box>
	);
}
