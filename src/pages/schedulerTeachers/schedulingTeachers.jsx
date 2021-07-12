import React from 'react';
import Table from '../../components/common/Tables/userTable'
import classes from './schedulingTeachers.module.css';

const SchedulingTeachers = () => {
    const data = React.useMemo(
        () => [
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Column 2',
                accessor: 'col2',
            },
        ],
        []
    )

    const onViewSheetHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={onViewSheetHandler}>
            <div className={classes.header}>
                <h1>Tabulation Sheet Of School</h1>
                <div className={classes.sectionTabulation}>
                    <div className={classes.section}>Level</div>
                    <select required className={classes.selectOptionClasses}>
                        <option></option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="E">E</option>
                    </select>
                    <div className={classes.section}>Class</div>
                    <select required className={classes.selectOptionClasses}>
                        <option></option>
                        <option value="1st">1st</option>
                        <option value="2st">2st</option>
                        <option value="3st">3st</option>
                        <option value="4st">4st</option>
                    </select>
                    <div className={classes.section}>Section</div>
                    <select required className={classes.selectOptionClasses}>
                        <option></option>
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Math">Math</option>
                        <option value="Pieology">Pieology</option>
                    </select>
                    <div className={classes.actions}>
                        <button className={classes.buttonViewSheet}>View Sheet</button>
                    </div>
                </div>
            </div>
            <div className={classes.headerTabulationSheets}>
                <h1>Tabulation Sheets</h1>
                <Table columns={columns} data={data} />
            </div>
        </form>
    );
};

export default SchedulingTeachers;