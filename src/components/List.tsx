import { Dispatch, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, deleteProduct, fetchProducts, updateProduct } from "../actions/product";

const List = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const { products } = useSelector((state: any) => state.products);

    const [updatedName, setUpdatedName] = useState('');
    const [updatedPrice, setUpdatedPrice] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const handleUpdateClick = (id: any, name: any, price: any) => {
        setSelectedProductId(id);
        setUpdatedName(name);
        setUpdatedPrice(price);
    };
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div>
            {products?.map((item: any) => {
                return (
                    <div key={item.id}>
                        <div> Name: &nbsp;
                            {item.name}
                        </div>
                        <div> Price: &nbsp;
                            {item.price}VND
                        </div>
                        <button className="border bg-blue-500 p-2" onClick={() => dispatch(deleteProduct(item.id))}>
                            Delete Product
                        </button>
                        <br />
                        {selectedProductId === item.id ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Tên sản phẩm"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Giá sản phẩm"
                                    value={updatedPrice}
                                    onChange={(e) => setUpdatedPrice(e.target.value)}
                                />
                                <button
                                    className="border bg-blue-500 p-2"
                                    onClick={() => { dispatch(updateProduct({ name: updatedName, price: updatedPrice, id: item.id })); setName(''); setPrice('') }}
                                >
                                    Cập nhật sản phẩm
                                </button>
                            </>
                        ) : (
                            <button
                                className="border bg-blue-500 p-2"
                                onClick={() => handleUpdateClick(item.id, item.name, item.price)}
                            >
                                Update Product
                            </button>
                        )}
                        <hr />

                    </div>
                );
            })}
            <input type="text" placeholder="Ten san pham" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <input type="text" placeholder="Gia san pham" value={price} onChange={(e) => setPrice(e.target.value)} />
            <br />
            <button
                className="border bg-blue-500 p-2"
                onClick={() => { dispatch(addProduct({ name: name, price: price })); setName(''); setPrice('') }}
            >
                Add Product
            </button>
        </div >
    )
}

export default List;










