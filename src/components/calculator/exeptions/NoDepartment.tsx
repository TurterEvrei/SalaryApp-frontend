import React, {useState} from 'react';
import {Box, Center, Text, VStack} from "@chakra-ui/react";
import TableWrapperCard from "../../cards/TableWrapperCard";
import SwitchForms from "../transitions/SwitchForms";
import {CSSTransition} from "react-transition-group";
import cl from "../Calculator.module.css";
import './Exeption.module.css'


const NoDepartment = () => {

    return (
        <CSSTransition
            in={true}
            appear
            timeout={300}
            classNames={'page'}
            unmountOnExit
        >
        <Center h={'100%'} className={'page'}>
            <Box>
                <TableWrapperCard title={'Ошибка'}>
                    <Center fontSize={22}
                            color={'gray.300'}
                            position={'relative'}
                            top={-2}
                    >
                        <VStack>
                            <Text>
                                Ваш аккаунт не привязан к предприятию.
                            </Text>
                            <Text>
                                Обратитесь к администратору.
                            </Text>
                        </VStack>
                    </Center>
                </TableWrapperCard>
            </Box>
        </Center>
        </CSSTransition>
    );
};

export default NoDepartment;