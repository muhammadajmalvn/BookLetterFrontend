import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addAddress, getAddressAction } from '../../../Redux/Actions/userActions/addressActions';

const AddressModal = ({ isOpen, onRequestClose }) => {
    const [address, setAddress] = useState({
        addressLine1: '',
        addressLine2: '',
        postcode: '',
        state: '',
        phoneNumber: '',
    });

    const [isAddressAdded, setIsAddressAdded] = useState(false); 
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(address);
        dispatch(addAddress(address));
        setAddress({
            addressLine1: '',
            addressLine2: '',
            postcode: '',
            state: '',
            phoneNumber: '',
        });
        onRequestClose();
        setIsAddressAdded(true);
    };
    useEffect(() => {
        dispatch(getAddressAction());
    }, [dispatch, isAddressAdded]);
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <h2>Enter Address Details</h2>
            <form onSubmit={handleSubmit}>
                <div className='col-md-12'>
                    <label className='labels'>Address Line 1</label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='enter address line 1'
                        name='addressLine1'
                        value={address.addressLine1}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='col-md-12'>
                    <label className='labels'>Address Line 2</label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='enter address line 2'
                        name='addressLine2'
                        value={address.addressLine2}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-12">
                    <label className="labels">Postcode</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="enter the pincode"
                        name="postcode"
                        value={address.postcode}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className="col-md-12">
                    <label className="labels">State</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="enter the state"
                        name="state"
                        value={address.state}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className="col-md-12">
                    <label className="labels">Phone number</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="enter phone number"
                        name="phoneNumber"
                        value={address.phoneNumber}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className='mt-5'>
                    <button className='btn btn-success btn-lg w-100' type='submit'>Add Address</button>
                </div>
            </form>
        </Modal >
    );
};

const customStyles = {
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '50%', // Add this property to adjust the width of the modal

    },
};

export default AddressModal