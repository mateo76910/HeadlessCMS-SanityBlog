import Head from 'next/head'
import Header from '../components/Header'
import {sanityClient,urlFor} from "../sanity"
import { Post } from '../typings'
import Link from "next/link";

interface Props{
  posts: Post[]
}


export default function Home({posts}:Props) {
  return (
    <div className="mx-auto">
      <Head>
        <title>Medium Blog </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <div className='bg-blue-200 border-y border-black '>
      <div className='flex justify-between items-center max-w-7xl mx-auto py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl font-serif'>
            <span className='underline decoration-black decoration-4'>
              Medium</span> {""}
              is the place to write, read and connect
            </h1>
          <h2>It's easy and free to post your thinking on any topic and connect with millions of readers. </h2>

        </div>
        <img className="hidden md:inline-flex h-32 lg:h-full" src="https://cdn4.iconfinder.com/data/icons/social-media-2210/24/Medium-512.png" alt="" />
      </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 p-2 lg:grid-cols-3 gap-3 md:gap-6 p2 md:p-6'>
        {posts.map(post =>(
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div>
              <div className='border rounded-lg group cursor-pointer overflow-hidden'>
              <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform druation-200 ease-in-out" src={urlFor(post.mainImage).url()!} alt="" />
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p>{post.description} by {post.author.name}</p>
                </div>
                <img  className="h-12 w-12 rounded-full" src={urlFor(post.author.image).url()!} alt="" />
              </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () =>{  //vraca sve postove na home screen- SSR
  const query = `*[_type=="post"]{
    _id,
    title,
    author ->{
    name,
    image
  },
  description,
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query);
  return {
    props:{
      posts
    }
  }
}
