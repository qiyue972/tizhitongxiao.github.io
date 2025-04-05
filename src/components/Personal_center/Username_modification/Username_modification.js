import React, { useState } from'react';
import './Username_modification.css';

const UsernameModification = ({ username, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(username);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setEditedUsername(e.target.value);
    };

    const handleSave = () => {
        onSave(editedUsername);
        setIsEditing(false);
    };

    return (
        <div className="username-container">
            <div className="username-info">
                <span>用户名</span>
                <div className="editable-field">
                    {!isEditing && (
                        <>
                            {username}
                            <span className="edit-icon" onClick={handleEditClick}>✏️</span>
                        </>
                    )}
                </div>
            </div>
            {isEditing && (
                <div>
                    <input
                        type="text"
                        value={editedUsername}
                        onChange={handleChange}
                    />
                    <button onClick={handleSave}>保存</button>
                    <button onClick={() => setIsEditing(false)}>取消</button>
                </div>
            )}
        </div>
    );
};

export default UsernameModification;