import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { userDetailsFetch, deleteUser, adminSearch, userBlockUnblock } from '../../../Redux/Actions/adminActions/adminUserActions'
import { Box } from '@mui/material'
import './UserManage.css'
import Switch from '@mui/material/Switch';
import { Table, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import Pagination from 'react-bootstrap/Pagination';
import { userLogout } from '../../../Redux/Actions/userActions/LoginActions';


const UserManage = () => {
    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(userDetailsFetch());
    }, [dispatch]);
    
    const userDetails = useSelector(state => state.adminControl)
    let { loading, adminUserData, error } = userDetails
   

    const handleBlockUser = async (id) => {
        dispatch(userBlockUnblock(id));
        setTimeout(() => {
            dispatch(userDetailsFetch());
            dispatch(userLogout())
        }, 1000)

    }

    const [blockedUsers, setBlockedUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    const [sortColumn, setSortColumn] = useState("index");
    const [sortOrder, setSortOrder] = useState("asc");


    const [searchkeyword, setSearchKeyword] = useState('')
    const adminsearch = useSelector((state) => state.adminSearch)
    let { searchloading, searcherror, searchresult } = adminsearch

    const searchuser = () => {
        dispatch(adminSearch(searchkeyword))
    }
    if (searchresult) {
        adminUserData = searchresult
    }
    const settingsearch = (e) => {
        if (e.length == 0) {
            setSearchKeyword(e)
            dispatch(adminSearch(''))
        } else {
            setSearchKeyword(e)
        }
    }


    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };


    const sortedData = adminUserData?.data?.sort((a, b) => {
        const sortValueA = a[sortColumn];
        const sortValueB = b[sortColumn];
        if (sortValueA < sortValueB) {
            return sortOrder === "asc" ? -1 : 1;
        } else if (sortValueA > sortValueB) {
            return sortOrder === "asc" ? 1 : -1;
        } else {
            return 0;
        }
    });



    const handleToggle = async (id) => {
        const updatedUsers = [...blockedUsers];
        const userIndex = updatedUsers.findIndex(user => user === id);

        if (userIndex >= 0) {
            updatedUsers.splice(userIndex, 1);
        } else {
            updatedUsers.push(id);
        }

        setBlockedUsers(updatedUsers);
        await dispatch(userBlock(id));
    }

    const handleDeleteUser = async (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // Call the deleteUser function here if the user confirms the deletion
                    dispatch(deleteUser(id));
                    dispatch(userDetailsFetch());
                    swal("User deleted successfully!", {
                        icon: "success",
                    });
                } else {
                    swal("User deletion cancelled!");
                }
                dispatch(userDetailsFetch());

            });
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = adminUserData?.data?.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(adminUserData?.data?.length / usersPerPage);
    const pageItems = [];

    for (let number = 1; number <= totalPages; number++) {
        pageItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    const renderPageNumbers = pageItems.map(number => {
        return (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    });


    return (
        <>
            <Box sx={{ display: 'flex', marginLeft: '6%', marginTop: '6%' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
                    <Form style={{ width: "50%" }} className="d-flex mt-2 mb-2">
                        <Form.Control
                            type="search"
                            onChange={(e) => { settingsearch(e.target.value) }}
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button onClick={searchuser} style={{ backgroundColor: 'rgb(53, 91, 62)' }} >Search</Button>
                    </Form>
                    <Table bordered hover striped="columns" variant="dark " responsive>
                        <thead >
                            <tr>
                                <th>Sl.No</th>
                                <th onClick={() => handleSort("firstName")}>
                                    Firstname {sortOrder === "asc" ? <i className="fa fa-arrow-up"></i> : <i className="fa fa-arrow-down"></i>}
                                </th>
                                <th>Lastname</th>
                                <th onClick={() => handleSort("email")}>Email {sortOrder === "asc" ? <i className="fa fa-arrow-up"></i> : <i className="fa fa-arrow-down"></i>}</th>
                                <th onClick={() => handleSort("phone")}>Mobile {sortOrder === "asc" ? <i className="fa fa-arrow-up"></i> : <i className="fa fa-arrow-down"></i>}</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan="5" className="text-center">Loading...</td></tr> :
                                error ? <tr><td colSpan="5" className="text-center">{error}</td></tr> :
                                    currentUsers &&
                                    currentUsers.map((user, index) => (
                                        <tr key={user.email}>
                                            <td>{usersPerPage * (currentPage - 1) + index + 1}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>
                                                <Switch
                                                    checked={user.status}
                                                    onChange={() => handleBlockUser(user._id)}
                                                    name="blockUser"
                                                    inputProps={{ "aria-label": "Block User Switch" }}
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    className="btn btn-dark"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                >
                                                    <i
                                                        class="fa-sharp fa-solid fa-trash"
                                                        style={{ color: "red", fontSize: "150%" }}
                                                    ></i>
                                                </Button>{" "}
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </Table>
                    <Pagination className="pagination">
                        {/* <Pagination.First onClick={() => setCurrentPage(1)} /> */}
                        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
                        {renderPageNumbers}
                        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
                        {/* <Pagination.Last onClick={() => setCurrentPage(pageNumbers.length)} /> */}
                    </Pagination>
                </Box>
            </Box>
        </>
    );
}
export default UserManage;


