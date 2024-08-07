'use client';

import styles from '@/styles/onboarding.module.scss';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { FormEvent } from 'react';

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // const formData = new FormData(event.currentTarget)
    // const email = formData.get('email')
    // const password = formData.get('password')

    // const response = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    // })

    // if (response.ok) {
    //     router.push('/profile')
    // } else {
    //     // Handle errors
    // }
}

export default function DoneeAccountLoginPage() {
    return (
        <div className={styles['main-center-container']}>
            <h1>I am a Donee</h1>
            <p className={styles['instruction-subtitle']}>Dono will sign you in, or create an account if you don’t have one.</p>
            <form onSubmit={handleSubmit} className={styles['login-form']}>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
