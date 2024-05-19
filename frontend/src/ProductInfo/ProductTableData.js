import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ProductTableData = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        const fetchData = async () => {
            try {
                 const token = localStorage.getItem("token");
                const response = await axios.get('http://127.0.0.1:3000/newproducts', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token here
                    }
                });
                const { data } = response;
                // Update the state with the fetched data
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    

    const handleDelete = async (productid) => {
        try {
            
            
            await axios.delete(`http://127.0.0.1:3000/home/products/${productid}`);

            // Remove the deleted customer from the state
            setProducts(products.filter(product => product._id !== String(productid)));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
      <>
        {products.map((product) => (
          <tr>
            <td>{product.productName}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>{product.MRP}</td>
            <td>{product._id}</td>
            <td>
              <input
                type="button"
                value="Delete"
                className="cnclBtn"
                onClick={() => handleDelete(product._id)}
              />
              <EditButton product={product} />
            </td>
          </tr>
        ))}
      </>
    );
}


const EditButton = ({ product }) => {
    const [showForm, setShowForm] = useState(false);
    const [productName, setproductName] = useState();
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [mrp, setMrp] = useState();

    const handleInpt = (event) => {
      const { name, value } = event.target;

      if (name === "productName") setproductName(value);
      else if (name === "quantity") setQuantity(value);
      else if (name === "price") setPrice(value);
      else if (name === "mrp") setMrp(value);
    };
    
    const HandleSave = async (event) => {
      event.preventDefault();

      try {
        const id = product._id;
        const response = await fetch(
          `http://localhost:3000/updateProduct/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productName,
              quantity,
              price,
              mrp,
            }),
          }
        );
        setShowForm(false);

        const data = await response.text();
        alert(data); // Display success message
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating the student.");
      }
    };


  const handleEditClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <button onClick={handleEditClick}>
        <i className="fas fa-edit"></i> Edit
      </button>

      {showForm && (
        <div className="overlay">
          <Box
            className="centered-form"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-name"
                label="Product name"
                name="productName"
                onChange={handleInpt}
                defaultValue={product.productName}
              />
              <TextField
                id="outlined-city"
                label="Quantity"
                name="quantity"
                onChange={handleInpt}
                defaultValue={product.quantity}
              />
            </div>
            <div>
              <TextField
                id="outlined-phone"
                label="Price"
                name="price"
                onChange={handleInpt}
                defaultValue={product.price}
              />
              <TextField
                id="outlined-email"
                label="MRP"
                name="mrp"
                onChange={handleInpt}
                defaultValue={product.MRP}
              />
            </div>
            <div>
              <TextField
                id="outlined-id"
                label="ID"
                defaultValue={product._id}
                variant="standard"
                disabled
              />
            </div>
            <input
              type="button"
              value="Cancel"
              onClick={() => setShowForm(false)}
            />
            <input type="button" value="Save" onClick={HandleSave}/>
          </Box>
        </div>
      )}
    </>
  );
};



export default ProductTableData;