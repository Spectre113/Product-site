'use client'

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Catalog from '../components/Catalog';
import About from "@/components/About";
import { useEffect, useState } from 'react';

const Home = () => {
  const [file, setFile] = useState<File>()
  const [category, setCategory] = useState<string>()
  const [measure, setMeasure] = useState<string>()
  const [lastPrice, setLastPrice] = useState<string>()
  const [currentPrice, setCurrentPrice] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [weight, setWeight] = useState<string>()
  const [image, setImage] = useState<string>()
  const [products, setProducts] = useState<any[]>([])

  
  useEffect(() => {
    fetch('/api/upload', {
      method: 'GET',
    }).then(resp => resp.json())
    .then(resp => setProducts(resp))
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)
      data.set('category', category as string)
      data.set('currentPrice', currentPrice as string)
      data.set('measure', measure as string)
      data.set('lastPrice', lastPrice as string)
      data.set('title', title as string)
      data.set('weight', weight as string)
      data.set('image', image as string)


      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
      setProducts(await res.json())
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }
  console.log(products)
  return <Layout>
    <Hero />
    <Catalog products={products}/>
    <form onSubmit={onSubmit}>
    
      <input onChange={(e) => setCategory(e.target.value)} name='category' type='text' />
      <input onChange={(e) => setCurrentPrice(e.target.value)} name='currentPrice' type='text' />
      <input onChange={(e) => setMeasure(e.target.value)} name='measure' type='text' />
      <input onChange={(e) => setLastPrice(e.target.value)} name='lastPrice' type='text' />
      <input onChange={(e) => setTitle(e.target.value)} name='title' type='text' />
      <input onChange={(e) => setWeight(e.target.value)} name='weight' type='text' />
      <input onChange={(e) => setImage(e.target.value)} name='image' type='text' />

      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" />
    </form>
  </Layout>
};

export default Home;