import React, {SetStateAction, useState} from 'react';
import {
    Box,
    Button,
    Grid,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack
} from "@chakra-ui/react";
import FloatingInput from "../UI/inputs/FloatingInput";
import {IUser} from "../../models/user/IUser";
import {Role} from "../../models/user/Role";
import CheckboxToggleWithLabel from "../UI/checkbox/CheckboxToggleWithLabel";
import UserService from "../../services/UserService";

const defaultUser: IUser = {
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    active: true,
    roles: [Role.USER],
}

const NewUserModal = (
    {
        isOpen,
        onClose,
        setUsers,
    }: {
        isOpen: boolean,
        onClose: () => void,
        setUsers: React.Dispatch<SetStateAction<IUser[]>>,
    }
) => {

    const [newUser, setNewUser] = useState<IUser>(defaultUser)

    const isValidNewUser = (): boolean => {
        return !!(newUser.email && newUser.password && newUser.name && newUser.phoneNumber)
    }

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    function roleToggleHandler(e: React.ChangeEvent<HTMLInputElement>, role: Role) {
        setNewUser({
            ...newUser,
            roles: e.target.checked
                ? [...newUser.roles, role]
                : newUser.roles.filter(r => r !== role)
        })
    }

    async function createNewUser() {
        const response = await UserService.createUser(newUser)
        setUsers(prev => [...prev, response.data])
        onClose()
        setNewUser(defaultUser)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Новый пользователь</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <VStack spacing={3}>
                        <FloatingInput label="Email"
                                       type="email"
                                       inputName="email"
                                       onChange={inputHandler}
                                       value={newUser.email}
                        />
                        <FloatingInput label="Пароль"
                                       type="password"
                                       inputName="password"
                                       onChange={inputHandler}
                                       value={newUser.password}
                        />
                        <FloatingInput label="Имя"
                                       type="text"
                                       inputName="name"
                                       onChange={inputHandler}
                                       value={newUser.name}
                        />
                        <FloatingInput label="Телефон"
                                       type="text"
                                       inputName="phoneNumber"
                                       onChange={inputHandler}
                                       value={newUser.phoneNumber}
                        />
                        <Grid templateColumns="1fr 1fr"
                              gap={2}
                              w="100%"
                        >
                            {Object.values(Role).map(role =>
                                <Box justifyContent="center"
                                     key={role}
                                >
                                    <CheckboxToggleWithLabel onChange={e =>
                                                                 roleToggleHandler(e, role)
                                                             }
                                                             //@ts-ignore
                                                             label={role}
                                                             checked={newUser.roles?.some(r => r === role)}
                                    />
                                </Box>
                            )}
                        </Grid>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button colorScheme="primary"
                            isDisabled={!isValidNewUser()}
                            onClick={createNewUser}
                    >
                        Создать
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NewUserModal;