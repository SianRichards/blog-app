import React from 'react';

import styles from '../../styles/field.module.scss';

const FormField = (props) => {

    const { field, setPasswordValue, setEmailValue, setUsernameValue, setConfirmPasswordValue } = props;

    return (
            <div key={field.id} className={styles.field}>
                <label>{field.label}</label>
                <input
                    className={styles.input}
                    name={field.name}
                    type={field.type}
                    pattern={field.pattern}
                    title={field.title}
                    autoComplete="off"
                    value={field.value}
                    onChange={(e) => {
                        if (field.name === 'password') {
                            setPasswordValue(e.target.value);
                        }
                        else if (field.name === 'email') {
                            setEmailValue(e.target.value)
                        }
                        else if (field.name === 'username') {
                            setUsernameValue(e.target.value)
                        }
                        else if (field.name === 'confirmPassword') {
                            setConfirmPasswordValue(e.target.value)
                        }
                    }}
                />
            </div>
    )
}

export default FormField;