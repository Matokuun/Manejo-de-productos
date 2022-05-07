import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
  const [ description, setDescription ] = useState( '' ) //valor x defecto
  const [stock, setStock] = useState(0) //valor x defecto
  const navigate = useNavigate()
  const productsCollection=collection(db,"products")
  const store= async (e) => { //funcion para almacenar
      e.preventDefault()
      await addDoc( productsCollection,{description:description,stock:stock} )
      navigate('/') //nos lleva a Show
  } //en el return es lo que se ve en pantalla, para is2, copiar y pegar desde el div classsname mb-3 hasta su cierre para cada dato
  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Create product</h1>
                <form onSubmit={store}>
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
                    <button type='submit' className='btn btn-primary'>store</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create