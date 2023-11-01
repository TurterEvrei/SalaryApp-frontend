import React, {SetStateAction, useContext, useState} from 'react';
import cl from "../Calculator.module.css";
import {IDepartment} from "../../../models/dto/IDepartment";
import {Context} from "../../../index";
import {toJS} from "mobx";
import TableWrapperCard from "../../cards/TableWrapperCard";
import {Button} from "@chakra-ui/react";

const SwitchDepartment = (
    {
        departments,
        setDepartment,
        setShowSwitchingDepartments,
    }: {
        departments: IDepartment[],
        setDepartment: React.Dispatch<SetStateAction<IDepartment>>,
        setShowSwitchingDepartments: React.Dispatch<SetStateAction<boolean>>
    }
) => {
    return (

        // <TableWrapperCard title={'Предприятия'}>
        //     <>
        //     {departments.map(dep =>
        //         <Button onClick={() => {
        //                     setDepartment(dep)
        //                     setShowSwitchingDepartments(false)
        //                 }}
        //         >
        //             {dep.name}
        //         </Button>
        //     )}
        //     </>
        // </TableWrapperCard>

        <>
            <div className={cl.header}>
                Предприятия
            </div>
            <div className={cl.data}>
                {
                    departments.map(dep =>
                    <Button className={cl.choiceBtn}
                            onClick={() => {
                                setDepartment(dep)
                                setShowSwitchingDepartments(false)
                            }}
                            key={dep.id}
                            // colorScheme={'primary'}
                            // variant={'solid'}
                    >
                        {dep.name}
                    </Button>
                )}
            </div>
        </>
    );
};

export default SwitchDepartment;