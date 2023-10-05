import React, {JSX} from 'react';
import {Card, CardBody, CardHeader, Heading} from "@chakra-ui/react";

const TableWrapperCard = (
    {
        children
    }: {
        children: JSX.Element
    }
) => {
    return (
        <Card mt={8}>
            <CardHeader bg='primary.100'
                        mx={14}
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
                    Таблица пользователей
                </Heading>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    );
};

export default TableWrapperCard;