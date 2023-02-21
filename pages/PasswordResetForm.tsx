import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { auth, sendPasswordResetEmail } from '../config/firebase';

const PasswordResetForm = () => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = async (email: string) => {
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            console.error('Invalid email format');
            return;
        }
        console.log('Sending password reset email to:', email);
        try {
            await sendPasswordResetEmail(auth, email);
            console.log('Password reset email sent successfully.')
        } catch (error) {
            console.log(error)
        }
        }

    const handleSendPasswordResetEmail = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            console.log('Invalid email format.');
        return;
        }
        handlePasswordReset(email);
    }

    return (
        <Container className='display-3'
        style={{
            marginTop:'120px', 
            width:'700px',
            display:'flex',
            flexDirection:'column',
            alignContent:'space-between',

        }}>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="^\S+@\S+\.\S+$"
                    required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSendPasswordResetEmail}>
                    Send Password Reset Email
                </Button>
            </Form>
        </Container>
    
    );
};

export default PasswordResetForm;
