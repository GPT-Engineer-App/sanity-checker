import React, { useState, useEffect } from 'react';
import { Container, VStack, Heading, Text, Box, Spinner, Table, Thead, Tbody, Tr, Th, Td, Alert, AlertIcon } from "@chakra-ui/react";

const Index = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch documents from Sanity API
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/sanity-documents'); // Replace with actual Sanity API endpoint
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const identifyMissingFields = (document) => {
    const missingFields = [];
    // Add logic to identify missing fields in the document
    // Example: if (!document.title) missingFields.push('title');
    return missingFields;
  };

  return (
    <Container centerContent maxW="container.lg" py={10}>
      <VStack spacing={6} width="100%">
        <Heading as="h1" size="xl">Sanity Management Tool</Heading>
        <Text fontSize="lg">Check all documents in your Sanity application and identify missing fields.</Text>
        {loading && <Spinner size="xl" />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {!loading && !error && (
          <Box width="100%" overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Document ID</Th>
                  <Th>Document Type</Th>
                  <Th>Missing Fields</Th>
                </Tr>
              </Thead>
              <Tbody>
                {documents.map((doc) => (
                  <Tr key={doc._id}>
                    <Td>{doc._id}</Td>
                    <Td>{doc._type}</Td>
                    <Td>{identifyMissingFields(doc).join(', ') || 'None'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;