import { GetServerSideProps, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import {useKeenSlider} from 'keen-slider/react';
import { HomeContainer, Product } from "@/styles/pages/home";


import 'keen-slider/keen-slider.min.css'
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { Fragment } from 'react';

interface HomeProps {
  products:{
    id:string;
    name:string;
    imageUrl: string;
    price: number
  }[]
}

export default function Home({products}:HomeProps) {

  const [refSlider] = useKeenSlider({
    slides:{
      perView: 3,
      spacing: 48
    }
  })

  return (
        <Fragment>
        <Head>
          <title>Ignite Eshop</title>
        </Head>
          <HomeContainer ref={refSlider} className='keen-slider'>

              {products.map(product => (
                <Link key={product.id} href={`/product/${product.id}`} prefetch={false} >
                  <Product className='keen-slider__slide'>
                        <Image src={product.imageUrl} width={520} height={480} alt='' />
                        <footer>
                          <strong>{product.name}</strong>
                          <span>{product.price}</span>
                        </footer>
                  </Product>
                </Link>
                
              ))}
          </HomeContainer>
      </Fragment>
  )
}


export const getStaticProps:GetStaticProps = async()=>{
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });
  

  const products = response.data.map(product =>{
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price.unit_amount as number / 100),
    }
  })

  console.log(products);

  return {
    props:{
      products: products
    },
    revalidate: 60 * 60 * 2 //seconds * minutos * horas
  }
}
