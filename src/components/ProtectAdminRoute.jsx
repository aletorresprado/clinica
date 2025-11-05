import {Navigate} from 'react-router-dom'


function ProtectedAdminRoute({children}) {

    const user = localStorage.getItem('user')
    if (!user) {
        return <Navigate to='/login' replace/>
    }


    return children
       
}

export default ProtectedAdminRoute
