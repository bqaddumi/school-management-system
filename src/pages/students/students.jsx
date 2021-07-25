import React from "react";
import Table from "../../components/common/Tables/table";
import BackgroundLogo from "../../components/common/backgroundLogo/backgroundLogo";
import Footer from "../../components/common/footer/footer";
import classes from "./studentsPage.module.scss";

const Students = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: "ClassRoom",
                accessor: "class",
                Cell: ({ cell: { value } }) => value || "-",
            },
            {
                Header: "Days",
                accessor: "day",
                Cell: ({ cell: { value } }) => value || "-",
            },
            {
                Header: "Start it time",
                accessor: "timeFrom",
                Cell: ({ cell: { value } }) => value || "-",
            },
            {
                Header: "End it time",
                accessor: "timeTo",
                Cell: ({ cell: { value } }) => value || "-",
            },
            {
                Header: "E-mail Teacher",
                accessor: "uid",
                Cell: ({ cell: { value } }) => value || "-",
            },
            {
                Header: "Major Teacher",
                accessor: "major",
                Cell: ({ cell: { value } }) => value || "-",
            },
        ],
        []
    );

    return (
        <>
            <BackgroundLogo title="Students Classes Time" />
            <section className={classes.seactionConatainer}>
                <div className={classes.headerClassesTime}>
                    <Table columns={columns} data={[]} />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Students;
