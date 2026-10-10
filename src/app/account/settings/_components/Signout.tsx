"use client"
import { Button } from '@/components/ui/button'
import { removeUser } from '@/redux/slices/userSlice';
import { AppDispatch } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';

function Signout() {

    const activeRout = usePathname();
    const navig = useRouter();

    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = useCallback(() => {
        dispatch(removeUser())
        navig.replace(`/auth/login?next=${activeRout}`)
        navig.refresh();
    }, [dispatch, activeRout, navig])

    return (
        <Button onClick={handleLogout} variant={"destructive"} className='rounded'>Logout</Button>
    )
}

export default Signout