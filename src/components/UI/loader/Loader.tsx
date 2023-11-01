import React from 'react';
import {Center, Spinner} from "@chakra-ui/react";

const Loader = () => {
    return (
        <Center w={'100%'} h={'100vh'}>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="dark.300"
                color="primary.100"
                size="xl"
            />
        </Center>
    );
};

export default Loader;