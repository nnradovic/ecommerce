import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import { signin, authenticate } from '../auth'

const Signin = () => {


    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirecToRefeerer: false
    })

    const { email, password, loading, error, redirecToRefeerer } = values
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }



    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirecToRefeerer: true
                        })
                    })
                }
            })
    }

    const signUpForm = () => {
        return (
            <form>

                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </form>

        )
    }

    const showError = (error) => {
        return (

            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}

            </div>

        )
    }

    const showLoading = () => {
        return (

            loading && (
                <div className="alert alert-info" >
                    <h2>Loading...</h2>
                </div>)


        )
    }


    const redirectUser = () => {
        if (redirecToRefeerer) {
            return <Redirect to="/" />
        }
    }


    return (
        <Layout title="Signin" description=" Signin to Node React E-commerce App" className="container col-md-9 offset-2">
            {showError(error)}
            {showLoading()}
            {signUpForm()}
            {redirectUser()}
        </Layout>

    )
}

export default Signin

