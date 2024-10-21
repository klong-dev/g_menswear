import './Admin.scss'
import { AdminHeader } from './components/Header/Header'

import { Hero } from './components/Hero/Hero'
export const Admin = () => {
    return (
        <div className="admin">
            <AdminHeader />
            <Hero />
        </div>
    )
}
