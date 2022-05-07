import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import {db} from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Show = () => {

  //configuracion de hooks (api de react que nos permite comprobar los estados en los componentes funcionales)
  const [products, setProducts] = useState( [] )
  // refenciamos db firestone
  const productsCollection = collection(db,"products") //pasamos base de datos y la coleccion
  //funcion mostrar todos DOCS
  const getProducts = async () => {
      const data= await getDocs(productsCollection)
      /*console.log(data)   con esto nos da todo el objeto
      console.log(data.docs) // con esto podemos ver la id
      en docs, _document, estan todos los datos  
      */
      setProducts(
          data.docs.map( (doc) => ( {...doc.data(), id:doc.id})) //pedimos la data, osea descripcion y stock, y el id
      )
      //console.log(products)
  }
  //funcion para eliminar doc
  const deleteProduct = async (id) => {
      const productDoc= doc(db,"products",id)
      await deleteDoc(productDoc)
      getProducts()
  }
  //funcion de confirmacion para Sweet Alert 2
  const confirmDelete= (id) => {
    MySwal.fire({
        title: '¿Eliminar producto?',
        text: "¡No vas a poder volver atras!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralo!'
      }).then((result) => {  
        if (result.isConfirmed) {
          deleteProduct(id)  
          Swal.fire(
            'Eliminado',
            'El registro ha sido eliminado.',
            'success'
          )
        }
      })

  }
  //usamos useEffect
  useEffect(() => {
      getProducts()
  }, [] )
  //devolvemos vista de nuestra componente

  return (
    <>
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <div className='d-grid gap-2'>
                    <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                </div>
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map( (product) => (
                            <tr key={product.id}>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pen"></i></Link>
                                    <button onClick={ ()=> {confirmDelete(product.id)}} className="btn btn-danger"><i className="fa-solid fa-trash-can"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Show