import React, { useState } from "react";



interface ProductModel {
    id:string;
    name:string;
    imageUrl: string;
    price: string,
    description:string,
    priceId:string,
    priceNumber: number
}

interface ShoppingCartManager {
    products:ProductModel [],
    add: (product:ProductModel) => void,
    remove: (id:string) => void,
    update: (products:ProductModel[]) => void;
}


type StoreContextProviderProps = {
    children: string | JSX.Element | JSX.Element[] 
  }

export const StoreContextProvider = ({children}:StoreContextProviderProps)=>{

    const [products,setProducts] = useState<ProductModel[]>([]);
    const addProduct = (product:ProductModel)=>{
        setProducts((currentProduts) => [...currentProduts, product])
    }
    const removeProduct = (id:string)=>{
        setProducts((currentProduts) => currentProduts.filter(product => product.id !== id));
    }

    const upadateProducs = (products:ProductModel[])=>{
        setProducts(products);
    }


    return <StoreContext.Provider value={{
        products: products,
        add: addProduct,
        remove: removeProduct,
        update: upadateProducs
    }}>

        {children}

            
    </StoreContext.Provider>
}

export const StoreContext = React.createContext<ShoppingCartManager>({} as ShoppingCartManager);