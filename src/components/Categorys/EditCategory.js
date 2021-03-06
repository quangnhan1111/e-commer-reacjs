import React, { useState, useEffect, useContext } from 'react'
import API from "../../Config/config"
import {useHistory} from 'react-router-dom'
import {useGlobalContext} from "../../context/LoginContext";
// import { success } from '../Helper/Notification';
function EditCategory(props) {
    const { checklogin, IsLogin } = useGlobalContext();
    const [category, setCategory] = useState({
        id: "",
        category : ""
    });
    const history=useHistory();
    const id = props.match.params.id
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
    }
    useEffect(() => {
        checklogin();
        API.get('category/' + id, token).then((response)=> {
            setCategory(response.data);
        }).catch((error) =>{
        });
    }, []);


    const editCaegory =  (e) =>{
        e.preventDefault();
        const data = {
            "name": category.name
        }

        API.patch('category/' + id, data, token).then((response) => {
            console.log(response.data)
            history.push({
                pathname: '/categorys',
            })
            // success('Edit Success Category');

        }).catch((error) => {

        });
        console.log(category);
    }

    // const onChange = (e) => {
    //     e.persist();
    //     setCategory({...category, [e.target.name]: e.target.value});
    // }

    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">Category</h4>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body">
                            <h4 className="card-title">Edit Category</h4>
                            <form className="form-horizontal m-t-30" onSubmit={editCaegory}>
                                <div className="form-group" >
                                    <label>Name Category</label>
                                    <input type="text" className="form-control"
                                           onChange={e => setCategory({...category, name : e.target.value})}
                                           value={category.name}/>

                                </div>
                                <div className="form-group">
                                    <button type="submit" name="example-email" className="btn btn-success" >Save </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  EditCategory
