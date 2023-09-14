import React, { useState, useEffect } from "react";
import Table from "../../base-components/Table";
import Button from "../../base-components/Button";
import Alert from "../../base-components/Alert";
import axios from "axios";

function Main() {
    const [users, setUsers] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
    var csrfToken: any;
    if (csrfTokenElement !== null) {
        csrfToken = csrfTokenElement.getAttribute("content");
    }
    const handleDelete = (userId: any) => {
        axios
            .delete(`http://127.0.0.1:8000/u/${userId}`, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            })
            .then((response) => {
                // Handle success
                console.log(response.data.message);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get("http://127.0.0.1:8000/u")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Users</h2>
            </div>
            <div className="p-5 mt-5 intro-y box">
                <Table bordered>
                    <Table.Thead variant="default">
                        <Table.Tr>
                            <Table.Th align="center">Name</Table.Th>
                            <Table.Th align="center">Phone Number</Table.Th>
                            <Table.Th align="center">Address</Table.Th>
                            <Table.Th align="center">Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <tbody>
                        {users.map((user) => (
                            <Table.Tr key={user.id}>
                                <Table.Td>{user.full_name}</Table.Td>
                                <Table.Td>{user.mobile_number}</Table.Td>
                                <Table.Td>
                                    {user.address_city +
                                        "-" +
                                        user.address_region}
                                </Table.Td>
                                <Table.Td align="center">
                                    <Button className="mx-2" variant="primary">
                                        View
                                    </Button>
                                    <Button
                                        className="mx-2 bg-success text-white"
                                        variant="danger"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const ID = user.id;
                                            const updatedUsers = users.filter(
                                                (user) => user.id !== ID
                                            );
                                            setUsers(updatedUsers);
                                            handleDelete(user.id);
                                        }}
                                        className="mx-2 bg-danger text-white"
                                        variant="warning"
                                    >
                                        Delete
                                    </Button>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {showAlert && (
                <Alert
                    className="fixed bottom-0 left-0"
                    variant="success"
                    dismissible
                >
                    user deleted successfully
                </Alert>
            )}
           </>
    );
}

export default Main;
