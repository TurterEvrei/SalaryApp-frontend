import React from 'react';
import {IPayment} from "../../../models/dto/IPayment";
import {Box, Flex, HStack, Spacer} from "@chakra-ui/react";

const PaymentsCell = (
    {
        getValue,
    }: {
        getValue: () => any,
    }
) => {

    const payments: IPayment[] = getValue()

    return (
        <div>
            {payments.map(payment =>
                <Flex my={1}
                      key={payment.id}
                >
                    {payment.employeeName}
                    <Spacer/>
                    {payment.totalPayment}
                </Flex>
            )}
        </div>
    );
};

export default PaymentsCell;