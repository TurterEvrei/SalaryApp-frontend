import {CreateToastFnReturn} from "@chakra-ui/react";

export function successSaveToast(toast: CreateToastFnReturn) {
    return toast({
        title: 'Успешно',
        description: 'Сохранение без ошибок',
        status: 'success',
        duration: 2000,
        isClosable: true,
    })
}

export function errorSaveToast(toast: CreateToastFnReturn) {
    return toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить',
        status: 'error',
        duration: 2000,
        isClosable: true,
    })
}

export function successDeleteToast(toast: CreateToastFnReturn) {
    return toast({
        title: 'Успешно',
        description: 'Удаление без ошибок',
        status: 'success',
        duration: 2000,
        isClosable: true,
    })
}

export function errorDeleteToast(toast: CreateToastFnReturn) {
    return toast({
        title: 'Ошибка',
        description: 'Не удалось удалить',
        status: 'error',
        duration: 2000,
        isClosable: true,
    })
}

export function successLoginToast(toast: CreateToastFnReturn) {
    return toast({
        title: 'Добро пожаловать, да благословит тебя Аллах',
        status: 'success',
        duration: 2000,
        isClosable: true,
    })
}

export function warningLoginToast(toast: CreateToastFnReturn) {
    return toast({
        title: 'Подумай головой',
        description: 'Укажите все необходимые поля',
        status: 'warning',
        duration: 2000,
        isClosable: true,
    })
}

export function errorLoginToast(toast: CreateToastFnReturn) {
    return toast({
        title: 'Головой подумай',
        description: 'Неверные данные',
        status: 'error',
        duration: 2000,
        isClosable: true,
    })
}

export function successLogoutToast(toast: CreateToastFnReturn) {
    return toast({
        title: 'Вы успешно вышли из системы',
        description: 'Прощай, вафакак Аллах',
        status: 'success',
        duration: 2000,
        isClosable: true,
    })
}

export function errorLogoutToast(toast: CreateToastFnReturn) {
    return toast({
        title: 'Ошибка выхода',
        description: 'Я не знаю каким чудом ты вообще смог получить эту ошибку',
        status: 'error',
        duration: 2000,
        isClosable: true,
    })
}