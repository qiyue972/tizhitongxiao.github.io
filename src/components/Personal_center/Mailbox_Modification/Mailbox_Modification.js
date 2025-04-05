import React, { useState } from'react';
import './Mailbox_Modification.css';

const MailboxModification = ({ email, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmail, setEditedEmail] = useState(email);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setEditedEmail(e.target.value);
    };

    const handleSave = () => {
        onSave(editedEmail);
        setIsEditing(false);
    };

    return (
        <div className="mailbox-container">
            <div className="mailbox-info">
                <span>邮箱</span>
                <div className="editable-field">
                    {!isEditing && (
                        <>
                            {email}
                            <span className="edit-icon" onClick={handleEditClick}>✏️</span>
                        </>
                    )}
                </div>
            </div>
            {isEditing && (
                <div>
                    <input
                        type="email"
                        value={editedEmail}
                        onChange={handleChange}
                    />
                    <button onClick={handleSave}>保存</button>
                    <button onClick={() => setIsEditing(false)}>取消</button>
                </div>
            )}
        </div>
    );
};

export default MailboxModification;