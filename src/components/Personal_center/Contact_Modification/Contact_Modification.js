import React, { useState } from'react';
import './Contact_Modification.css';

const ContactModification = ({ phone, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPhone, setEditedPhone] = useState(phone);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setEditedPhone(e.target.value);
    };

    const handleSave = () => {
        onSave(editedPhone);
        setIsEditing(false);
    };

    return (
        <div className="contact-container">
            <div className="contact-info">
                <span>手机号</span>
                <div className="editable-field">
                    {!isEditing && (
                        <>
                            {phone}
                            <span className="edit-icon" onClick={handleEditClick}>✏️</span>
                        </>
                    )}
                </div>
            </div>
            {isEditing && (
                <div>
                    <input
                        type="tel"
                        value={editedPhone}
                        onChange={handleChange}
                    />
                    <button onClick={handleSave}>保存</button>
                    <button onClick={() => setIsEditing(false)}>取消</button>
                </div>
            )}
        </div>
    );
};

export default ContactModification;