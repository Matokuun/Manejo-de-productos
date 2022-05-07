import {useEffect, useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { getDoc,updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Edit = () => {
    const [ description, setDescription ] = useState('') //valor x defecto
    const [stock, setStock] = useState(0) //valor x defecto

    const navigate= useNavigate()
    const {id} = useParams()

    const update = async (e) => { //e es un evento
        e.preventDefault() //para evitar comportamiento por defecto
        const product= doc(db, "products", id) //traemos todos los datos a product
        const data= {description: description, stock: stock} //obtenemos data
        await updateDoc(product, data) //la data son los datos actualizados, updateDoc es de firestore, para actualizar los datos
        navigate('/') //vamos a show
    }
    const getProductById = async (id) => {
        const product = await getDoc( doc(db,"products",id) )
        if(product.exists()){
            setDescription(product.data().description)
            setStock(product.data().stock)
        }else{
            console.log('el producto no existe')
        }
    }
    useEffect( () => {
        getProductById(id)
        // eslint-disable-next-time
    }, [])
  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Edit product</h1>
                <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            className='form-control'
                        />    
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Stock</label>
                        <input
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            type="text"
                            className='form-control'
                        />    
                    </div>
                    <button type='submit' className='btn btn-primary'>update</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Edit