'use client'

import { useState } from 'react'
import { login } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending ? 'Logging in...' : 'Sign In'}
        </Button>
    )
}

export default function LoginPage() {
    const [error, setError] = useState(null)

    async function handleSubmit(formData) {
        const res = await login(formData)
        if (res?.error) {
            setError(res.error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-center">Admin Login</CardTitle>
                    <CardDescription className="text-center">Enter your credentials to access the dashboard.</CardDescription>
                </CardHeader>
                <form action={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                            <Input id="email" type="email" name="email" placeholder="admin@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                            <Input id="password" type="password" name="password" required />
                        </div>
                        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                    </CardContent>
                    <CardFooter>
                        <SubmitButton />
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
