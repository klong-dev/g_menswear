import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token')
    if (token) {
        toast.error('Bạn phải đăng nhập để sử dụng', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return (
            <>
                <ToastContainer />
                <Navigate to="/login" />
            </>
        )
    }
    return children
}
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}