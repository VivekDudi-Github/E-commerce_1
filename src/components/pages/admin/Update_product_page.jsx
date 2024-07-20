import { doc, getDoc , setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { DB } from "../../../firebase/firebase";
import { useEffect, useState } from "react";
import Loader from "../../track/Loader";
import { useNavigate } from "react-router-dom";

const UpdateProductPage = () => {
const [loading, setloading] = useState(false)
const {id} = useParams() 
const navigate = useNavigate()

const [productDetail , setDetails] = useState({
    price : "" , 
    descripton : "" , 
    title : "" , 
    imageurl : "" , 
    catagory : "" ,
    time : "" ,
    date : "" , 
})
console.log(productDetail);
   
const categoryList = [
    {
        name: 'fashion'
    },
    {
        name: 'shirt'
    },
    {
        name: 'jacket'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'home'
    },
    {
        name: 'books'
    }
  ]


// getting the product
const getProduct = async () =>{
  try {
    setloading(true)
    await getDoc(doc(DB , "products" , id))
    .then((doc)=> {
    if(doc) {
        console.log(doc.data());
      setDetails({
        price : doc.data().price  , 
        title: doc.data().title , 
        imageurl : doc.data().image_url , 
        catagory : doc.data().catagory , 
        description : doc.data().descripton ,
        time : doc.data().time , 
        date : doc.data().date , 
      })
    } 
    setloading(false) ;
    }) 
    .catch((error) => {
        setloading(false) ;
        alert("error while ")
        console.log(error , "fetching successfull but error while getting the doc ");
    })
  } catch (error) {
    setloading(false) ;
    alert("error while ftching data from server")
    console.log( "error while fecthing the data from server ", error);
  }
}
useEffect(() => {
  getProduct() ;
}, [])


//updating the proDetail 
const updateDoc = async(event) => {
    event.preventDefault();
try {
    setloading(true)
        await setDoc( doc(DB , "products" , id) , productDetail)
        .then(() => {
            alert("Updated Successfully")
            navigate("/admin_dashbod")
        })
        .catch((error) => {
            setloading(false) ;
            console.log("error while updating the doc" , error);
        })
    setloading(false)    
} catch (error) {
    setloading(false)
    alert("error while updating the product")
    console.log(error);
}
}


//handle change in inputs 
const handleChange = (event) => {
    const newProdDetail =  {
        ...productDetail , 
        [event.target.name] : event.target.value , 
    } ;
    setDetails(newProdDetail);
}


    return (
      <div>
        { loading && < Loader/>}
          <div className='flex justify-center items-center h-screen'>
              {/* Login Form  */}
              <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                  {/* Top Heading  */}
                  <div className="mb-5">
                      <h2 className='text-center text-2xl font-bold text-pink-500 '>
                          Update Product
                      </h2>
                  </div>


            {/* Form */}
            <form onSubmit={updateDoc}>

                  {/* Input One  */}
                  <div className="mb-3">
                      <input
                          type="text"
                          name="title"
                          value= {productDetail.title || "" }
                          onChange={handleChange}
                          placeholder='Product Title' required
                          className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                      />
                  </div>

                  {/* Input Two  */}
                  <div className="mb-3">
                      <input
                          type="number"
                          name="price"
                          value= {productDetail.price || ""}
                          onChange={handleChange}
                          placeholder='Product Price' required
                          className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                      />
                  </div>

                  {/* Input Three  */}
                  <div className="mb-3">
                      <input
                          type="text"
                          name="imageurl"
                          value= {productDetail.imageurl || ""}
                          onChange={handleChange}
                          placeholder='Product Image Url' required
                          className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                      />
                  </div>

                  {/* Input Four  */}
                  <div className="mb-3">
                      <select
                          className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  "
                          value={productDetail.catagory ? productDetail.catagory :"fashion" }
                          onChange={(event) => handleChange(event)}>
                          <option disabled>Select Product Category</option>
                          {categoryList.map((value, index) => {
                              const { name } = value
                              return (
                                  <option className=" first-letter:uppercase" key={index} value={name}
                                  >{name}</option>
                              )
                          })}
                      </select>
                  </div>

                  {/* Input Five  */}
                  <div className="mb-3">
                      <textarea
                          name="description" required
                          value= {productDetail.descripton || ""}
                          onChange={handleChange}
                          placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 ">
                      </textarea>
                  </div>

                  {/* Update Product Button  */}
                  <div className="mb-3">
                      <button
                          type='submit'
                          className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                      >
                          Update Product
                      </button>
                  </div>
            </form>

              </div>
          </div>
      </div>
  );
}

export default UpdateProductPage;