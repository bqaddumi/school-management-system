import React, { useState } from 'react';
import Table from '../../components/common/Tables/userTable'
import classes from './schedulingTeachers.module.css';

const SchedulingTeachers = () => {
    const [changeSheetLevelHandler, setChangeSheetLevelHandler] = useState();
    const [changeSheetClassHandler, setChangeSheetClassHandler] = useState();
    const [changeSheetSectionHandler, setChangeSheetSectionHandler] = useState();
    const [viewSheet, setViewSheet] = useState();

    const data = React.useMemo(
        () => [
            {
                col1: 'Hello',
                col2: 'World',
                col3: 'World',
                col4: 'World',
                col5: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
                col3: 'World',
                col4: 'World',
                col5: 'World',
            },
            {
                col1: 'whatever',
                col2: 'you want',
                col3: 'World',
                col4: 'World',
                col5: 'World',
            },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Sunday',
                accessor: 'col1',
            },
            {
                Header: 'Monday',
                accessor: 'col2',
            },
            {
                Header: 'Tuesday',
                accessor: 'col3',
            },
            {
                Header: 'Wednesday',
                accessor: 'col4',
            },
            {
                Header: 'Thursday',
                accessor: 'col5',
            },
        ],
        []
    )

    const onViewSheetHandler = (event) => {
        event.preventDefault();
        setViewSheet(!viewSheet);
    };

    const onChangeSheetLevelHandler = (event) => {
        setChangeSheetLevelHandler(event.target.value)
    };

    const onChangeSheetClassHandler = (event) => {
        setChangeSheetClassHandler(event.target.value)
    };

    const onChangeSheetSectionHandler = (event) => {
        setChangeSheetSectionHandler(event.target.value)
    };

    return (
        <form onSubmit={onViewSheetHandler}>
            <div className={classes.header}>
                <h1>Tabulation Sheet Of School</h1>
                <div className={classes.sectionTabulation}>
                    <div className={classes.section}>Level</div>
                    <select required className={classes.selectOptionClassTabulation} onChange={onChangeSheetLevelHandler}>
                        <option></option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="E">E</option>
                    </select>
                    <div className={classes.section}>Class</div>
                    <select required className={classes.selectOptionClassTabulation} onChange={onChangeSheetClassHandler}>
                        <option></option>
                        <option value="1st">1st</option>
                        <option value="2st">2st</option>
                        <option value="3st">3st</option>
                        <option value="4st">4st</option>
                    </select>
                    <div className={classes.section}>Section</div>
                    <select required className={classes.selectOptionClassTabulation} onChange={onChangeSheetSectionHandler}>
                        <option></option>
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Math">Math</option>
                        <option value="Pieology">Pieology</option>
                    </select>
                    <div className={classes.actions}>
                        <button className={classes.buttonViewSheet}>
                            {!viewSheet ? 'View Sheet' : 'Hide Sheet'}</button>
                    </div>
                </div>
            </div>
            {viewSheet &&
                <div className={classes.headerTabulationSheets}>
                    <h1>Tabulation Sheets</h1>
                    <Table columns={columns} data={data} />
                </div>
            }
        </form>
    );
};

export default SchedulingTeachers;