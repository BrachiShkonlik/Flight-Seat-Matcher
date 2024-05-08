import React, { Component } from 'react';
import EasyEdit from 'react-easy-edit';

export default function EditFlight() {
    const save = (value) => { alert(value) }
    const cancel = () => { alert("Cancelled") }
    return (
        <EasyEdit
            type="text"
            onSave={save}
            onCancel={cancel}
            saveButtonLabel="Save Me"
            cancelButtonLabel="Cancel Me"
            attributes={{ name: "awesome-input", id: 1 }}
            instructions="Star this repo!"
            value = {"gjhbvh"}
        />
    );
}
