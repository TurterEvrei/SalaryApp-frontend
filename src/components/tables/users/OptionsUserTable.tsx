import React, {SetStateAction, useState} from 'react';
import {
    Box,
    Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, HStack,
    Input,
    InputGroup,
    InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Popover,
    PopoverArrow, PopoverBody, PopoverCloseButton,
    PopoverContent, PopoverHeader,
    PopoverTrigger, Spacer, useDisclosure, VStack
} from "@chakra-ui/react";
import {AddIcon, CheckIcon, DragHandleIcon, SearchIcon} from "@chakra-ui/icons";
import CheckboxToggleWithLabel from "../../UI/checkbox/CheckboxToggleWithLabel";
import {IUser} from "../../../models/user/IUser";
import {ColumnFilter, Table} from "@tanstack/react-table";
import FloatingInput from "../../UI/inputs/FloatingInput";
import FlushedFloatingInput from "../../UI/inputs/FlushedFloatingInput";
import NewUserModal from "../../modals/NewUserModal";
import UserService from "../../../services/UserService";
import ColumnVisiblityPopover from "../addons/ColumnVisiblityPopover";

const OptionsUserTable = (
    {
        table,
        columnFilters,
        setColumnFilters,
        setUsers,
        users,
        changingIds,
        setChangingIds,
    }: {
        table: Table<IUser>,
        columnFilters: ColumnFilter[],
        setColumnFilters: React.Dispatch<SetStateAction<ColumnFilter[]>>,
        setUsers: React.Dispatch<SetStateAction<IUser[]>>,
        users: IUser[],
        changingIds: number[],
        setChangingIds: React.Dispatch<SetStateAction<number[]>>,
    }
) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const emailValue = columnFilters.find(f => f.id === 'email')?.value || ""

    function onFilterChange(id: string, value: string) {
        setColumnFilters([
            ...columnFilters.filter(f => f.id !== id),
            {
                id: id,
                value: value,
            }
        ])
    }

    async function saveAllChanges() {
        const changes: IUser[] = users.filter(u => u.id ? changingIds.includes(u.id) : false)
        const response = await UserService.editUsers(changes)
        response.data
            ? setChangingIds([])
            : console.log('Error while editing users')
    }

    return (
        <HStack mb={4}
                spacing={3}
                position={'relative'}
                top={-4}
        >
            <InputGroup w="auto">
                <InputLeftElement>
                    <SearchIcon/>
                </InputLeftElement>
                <Input onChange={e => onFilterChange("email", e.target.value)}
                       //@ts-ignore
                       value={emailValue}
                       placeholder="Email"
                />
            </InputGroup>
            <ColumnVisiblityPopover table={table}/>
            <Spacer/>
            <Button letterSpacing={1}
                    size="sm"
                    colorScheme="primary"
                    justifySelf="self-end"
                    onClick={saveAllChanges}
                    isDisabled={!changingIds.length}
            >
                <CheckIcon/>
            </Button>
            <Button letterSpacing={1}
                    size="sm"
                    colorScheme="primary"
                    justifySelf="flex-end"
                    onClick={onOpen}
            >
                <AddIcon/>
            </Button>
            <NewUserModal isOpen={isOpen}
                          onClose={onClose}
                          setUsers={setUsers}
            />
        </HStack>
    );
};

export default OptionsUserTable;