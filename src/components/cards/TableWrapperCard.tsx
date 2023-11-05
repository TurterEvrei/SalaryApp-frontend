import React, {JSX} from 'react';
import {Card, CardBody, CardHeader, Heading} from "@chakra-ui/react";

const TableWrapperCard = (
    {
        children,
        title,
    }: {
        children: JSX.Element
        title: string,
    }
) => {
    return (
        <Card mt={8}>
            <CardHeader bg='primary.100'
                        mx={20}
                        position="relative"
                        top={-8}
                        pt={3}
                        pb={2}
            >
                <Heading size="md"
                         color="dark.100"
                         textTransform="uppercase"
                         letterSpacing={2}
                         textAlign="center"
                >
                    {title}
                </Heading>
            </CardHeader>
            <CardBody top={-2}
                      position="relative"
            >
                {children}
            </CardBody>
        </Card>
    );
};

export default TableWrapperCard;