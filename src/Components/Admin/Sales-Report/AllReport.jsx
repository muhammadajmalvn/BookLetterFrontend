import React from 'react'
import MUIDataTable from 'mui-datatables'
const AllReport = ({ salesData }) => {
    const columns = [{
        name: 'bookId',
        label: 'Book ID',
        options: {
            filter: 'true',
            sort: 'true',
            customHeadLabelStyle: {
                fontWeight: 'bold',
                fontSize: "16px",
                textAlign: "center",
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                return <div style={{ textAlign: "center" }}>{value}</div>;
            },
        }
    }, {
        name: "createdAt",
        label: "Booked Date",
        options: {
            filter: true,
            sort: false,
            customHeadLabelStyle: {
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                return <div style={{ textAlign: "center" }}>{value}</div>;
            },
        },
    },
    {
        name: "totalDays",
        label: "Total Days",
        options: {
            filter: true,
            sort: true,
            customHeadLabelStyle: {
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                return <div style={{ textAlign: "center" }}>{value}</div>;
            },
        },
    }, {
        name: "totalAmount",
        label: "Total Amount (in Rs)",
        options: {
            filter: true,
            sort: true,
            customHeadLabelStyle: {
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                return <div style={{ textAlign: "center" }}>{value}</div>;
            },
        },
    },
    {
        name: "paymentType",
        label: "Payment Type",
        options: {
            filter: true,
            sort: false,
            customHeadLabelStyle: {
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                return <div style={{ textAlign: "center" }}>{value}</div>;
            },
        },
    }, {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: false,
            customHeadLabelStyle: {
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                return <div style={{ textAlign: "center" }}>{value}</div>;
            },
        },
    },
    ];
    const data = Array.isArray(salesData) ? salesData.map((sale) => ({
        bookId: sale.bookId,
        createdAt: sale.createdAt,
        totalDays: sale.totalDays,
        totalAmount: sale.totalAmount,
        paymentType: sale.paymentType,
        status: sale.status,
    })) : [];
    const options = {
        filterType: "checkbox",
        customHeadLabelStyle: {
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
        },
        customBodyRender: (value, tableMeta, updateValue) => {
            return <div style={{ textAlign: "center" }}>{value}</div>;
        },
    };


    return (
        <div>
            <MUIDataTable title={"Sales Data"} data={data} columns={columns} options={options} />
        </div >
    )
}

export default AllReport