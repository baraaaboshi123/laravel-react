import React, { useState, useEffect } from "react";
import Table from "../../base-components/Table";
import Button from "../../base-components/Button";
import Alert from "../../base-components/Alert";
import Modal from "../../base-components/Modal";
import { FormInput, FormLabel } from "../../base-components/Form";
import axios from "axios";

function Main() {
    const [users, setUsers] = useState([]);
    const [userName,setUserName] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const [userPassword,setUserPassword] = useState("");
    const [userCity,setUserCity] = useState("");
    const [userRegion,setUserRegion] = useState("");
    const [alertText,setAlertText] = useState("");
    const [userMobile,setUserMobile] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
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
                setAlertText("user deleted successfully.");
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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(csrfToken);
        try {
            const response = await axios.post('http://127.0.0.1:8000/addUser', {
                userName: userName,
                userEmail: userEmail,
                userMobile: userMobile,
                userCity: userCity,
                userRegion: userRegion,
                userPassword: userPassword,
              }, {
                headers: {
                    //'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json',
                },
                
              });
              //console.log(response);
              setAlertText("user added successfully.");
              setShowAlert(true);
              setTimeout(() => {
                  setShowAlert(false);
              }, 3000);
              closeModal()
              fetchUsers()

              // Optionally, show a success message or redirect to another page.
            } catch (error) {
              console.error('Error:', error);
              // Handle errors here.
            }
    };

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Users</h2>
                <button
                    onClick={openModal}
                    className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
                >
                    Add User
                </button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h2 className="text-xl font-bold mb-4">Add New User</h2>
                    <form onSubmit={handleSubmit}>
                        
                        <div className="grid grid-cols-2  gap-2">
                            <FormLabel htmlFor="userName">User Name</FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setUserName(e.target.value)
                                }}
                                id="userName"
                                name="userName"
                                value={userName}
                                placeholder="User name"
                            />
                            <FormLabel htmlFor="userMobile">
                                User Mobile Number
                            </FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setUserMobile(e.target.value)
                                }}
                                value={userMobile}
                                className="mb-2"
                                id="userMobile"
                                name="userMobile"
                                placeholder="User Mobile Number"
                            />
                        </div>

                        <div className="grid grid-cols-2  gap-2">
                            <FormLabel htmlFor="userEmail">
                                User Email
                            </FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setUserEmail(e.target.value)
                                }}
                                type="email"
                                value={userEmail}
                                id="userEmail"
                                name="userEmail"
                                placeholder="User Email"
                            />
                            <FormLabel htmlFor="userCity">User City</FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setUserCity(e.target.value)
                                }}
                                value={userCity}
                                className="mb-2"
                                id="userCity"
                                name="userCity"
                                placeholder="User City"
                            />
                        </div>
                        <div className="grid grid-cols-2  gap-2">
                            <FormLabel htmlFor="userRegion">
                                User Region
                            </FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setUserRegion(e.target.value)
                                }}
                                value={userRegion}
                                id="userRegion"
                                name="userRegion"
                                placeholder="User Region"
                            />
                            <FormLabel htmlFor="userPassword">
                                User Password
                            </FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setUserPassword(e.target.value)
                                }}
                                type="password"
                                value={userPassword}
                                id="userPassword"
                                name="userPassword"
                                placeholder="User Password"
                            />
                        </div>
                        <div className=" grid grid-cols-5 gap-2 my-2 ">
                            <div>
                                <button
                                    className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-success text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
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
                    cont={alertText}
                >
                  
                </Alert>
            )}
           </>
    );
}

export default Main;
