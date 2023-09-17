import React, { useState, useEffect, useRef } from "react";
import Table from "../../base-components/Table";
import Button from "../../base-components/Button";
import Alert from "../../base-components/Alert";
import Modal from "../../base-components/Modal";
import { FormInput, FormLabel } from "../../base-components/Form";
import axios from "axios";

function Main() {
    const [companies, setCompanies] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyRegion, setCompanyRegion] = useState("");
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const inputRef = useRef(null);
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
        fetchCompanies();
    }, []);
    let num: number = parseInt("-1");
    const fetchCompanies = () => {
        axios
            .get("http://127.0.0.1:8000/companies")
            .then((response) => {
                setCompanies(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Send the data to your server
        try {
            const response = await axios.post('http://127.0.0.1:8000/addCompany', {
                companyName: companyName,
                companyEmail: companyEmail,
                companyPhone: companyPhone,
                companyCity: companyCity,
                companyRegion: companyRegion,
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-TOKEN': csrfToken,
                },
              });
            
              console.log(response);
            
              // Optionally, show a success message or redirect to another page.
            } catch (error) {
              console.error('Error:', error);
              // Handle errors here.
            }
    };

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Companies</h2>
                <button
                    onClick={openModal}
                    className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
                >
                    Add Company
                </button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h2 className="text-xl font-bold mb-4">Add New Company</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2  gap-2">
                            <FormLabel htmlFor="companyName">Company Name</FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setCompanyName(e.target.value)
                                }}
                                ref={inputRef}
                                id="companyName"
                                name="companyName"
                                value={companyName}
                                placeholder="company name"
                            />
                            <FormLabel htmlFor="companyPhone">
                                Company Phone
                            </FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setCompanyPhone(e.target.value)
                                }}
                                value={companyPhone}
                                className="mb-2"
                                id="companyPhone"
                                name="companyPhone"
                                placeholder="company phone"
                            />
                        </div>

                        <div className="grid grid-cols-2  gap-2">
                            <FormLabel htmlFor="companyEmail">
                                Company Email
                            </FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setCompanyEmail(e.target.value)
                                }}
                                type="email"
                                value={companyEmail}
                                id="companyEmail"
                                name="companyEmail"
                                placeholder="company Email"
                            />
                            <FormLabel htmlFor="companyCity">Company City</FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setCompanyCity(e.target.value)
                                }}
                                value={companyCity}
                                className="mb-2"
                                id="companyCity"
                                name="companyCity"
                                placeholder="company City"
                            />
                        </div>
                        <div className="grid grid-cols-2  gap-2">
                            <FormLabel htmlFor="companyRegion">
                                Company Region
                            </FormLabel>
                            <FormInput
                                onChange={(e)=>{
                                    setCompanyRegion(e.target.value)
                                }}
                                value={companyRegion}
                                id="companyRegion"
                                name="companyRegion"
                                placeholder="company Region"
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
                            <Table.Th align="center">Email</Table.Th>
                            <Table.Th align="center">Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <tbody>
                        {companies.map((company) => (
                            <Table.Tr key={company.id}>
                                <Table.Td>{company.name}</Table.Td>
                                <Table.Td>{company.mobile_number}</Table.Td>
                                <Table.Td>
                                    {company.address_city +
                                        "-" +
                                        company.address_region}
                                </Table.Td>
                                <Table.Td> {company.email} </Table.Td>
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
