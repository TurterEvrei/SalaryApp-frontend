import React, {useEffect, useState} from 'react';
import TableWrapperCard from "../components/cards/TableWrapperCard";
import {Box, Button, HStack, Spacer, useToast, VStack} from "@chakra-ui/react";
import {IUser} from "../models/user/IUser";
import {IEmployee} from "../models/dto/IEmployee";
import UserService from "../services/UserService";
import FloatingInput from "../components/UI/inputs/FloatingInput";
import FlushedFloatingInput from "../components/UI/inputs/FlushedFloatingInput";
import {errorSaveToast, successSaveToast} from "../components/toast/Toasts";

const Profile = () => {

    const [user, setUser] = useState<IUser>({} as IUser)
    const [employee, setEmployee] = useState<IEmployee>({} as IEmployee)
    const [password, setPassword] = useState<string>('')

    const toast = useToast()

    useEffect(() => {
        fetchProfile()
        fetchEmployee()
    }, [])

    async function fetchProfile() {
        const {data} = await UserService.fetchProfile();
        setUser(data)
    }

    async function fetchEmployee() {
        const {data} = await  UserService.fetchUserEmployee();
        setEmployee(data)
    }

    async function editPassword() {
        try {
            if (password?.length > 0) {
                const {data} = await UserService.changeUserPassword(password)
                data ? successSaveToast(toast) : errorSaveToast(toast)
            }
        } catch (e) {
            errorSaveToast(toast)
            console.log(e)
        }
    }

    return (
        <Box mx={5} py={5}>
            <TableWrapperCard title={'Профиль'}>
                <HStack w={'auto'} mx={10}>
                    <VStack alignItems={'start'}>
                        <Box>
                            Email: {user.email}
                        </Box>
                        <Box>
                            Имя: {user.name}
                        </Box>
                        <Box>
                            Телефон: {user.phoneNumber}
                        </Box>
                        <Box>
                            Роли: {user?.roles?.join(', ') || ''}
                        </Box>
                        <Box>
                            Работник: {employee?.name || 'Нет'}
                        </Box>
                    </VStack>
                    <Spacer/>
                    <HStack w={'auto'}>
                        <FlushedFloatingInput name={'Пароль'}
                                              type={'password'}
                                              onChange={e => setPassword(e.target.value)}
                                              value={password}
                        />
                        <Button w={'150px'}
                                colorScheme={'primary'}
                                isDisabled={password.length === 0}
                                onClick={editPassword}
                        >
                            Изменить
                        </Button>
                    </HStack>
                </HStack>
            </TableWrapperCard>
        </Box>
    );
};

export default Profile;