import Head from "next/head";
import Link from "next/link";
import { getBlogs } from "../lib/api";

export default function Home({ blogs, database }) {
  return (
    <>
      <Head>
        <title>Thierrie</title>
        <link rel="icon" href="favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&family=Inter:wght@300;400;600;700&family=Bitter:wght@300;400;500&family=Fraunces:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
        <body className="bg-design-light"></body>
      </Head>
      <nav className="flex flex-row justify-between items-center py-4 px-8 w-full fixed top-0 left-0 stick"><Link passHref href="/">
      <img width="48" height="48" className="cursor-pointer" src="https://github.com/Jukidesforets/notion-blog/blob/main/public/img/export_small.png?raw=true" alt="logor"/></Link>
        <ul className="flex flex-row space-x-8">
          <li className="text-gray-700 font-light font-inter"><Link passHref href="/">
        <a>
          Work
        </a>
      </Link></li>
        </ul>
		  </nav>
      <header div className="flex flex-col lg:flex-row lg:justify-center lg:item-center lg:h-screen lg:w-screen">
        <div className="lg:my-40 mt-40 mb-20 px-12 md:px-36 flex flex-col item-center justify-center">
              <h2 className="flex-row justify-center text-gray-800 font-test text-xl mb-4">
                Hello, I'm <span className="text-cyan-500">Juliette</span>!
              </h2>
              <h1 className="font-test text-gray-800 font-bold tracking-tight leading-normal text-4xl mb-8 mt-4">
              I’m a French <span className="text-cyan-500">Product Designer</span> living in Paris.
              </h1>
              
              <p className="mb-4 text-gray-700 font-light font-inter leading-8">Creative and innovative Product Designer with more than 8 years of experience
                in big companies, and start-ups.
                My skills range from user research, interfaces conception, workshop animation, usability testing, prototyping, design system conception and management.
                Constantly looking for turning out amazing experience, my work is always user-centered, 
                and focus on accessbility.</p>
              <p className="mt-2 font-test text-xl">&#128679;  Please, be nice, portfolio still in progress  &#128679;</p>
        </div>
      </header>
      <main className="py-20">
        <div className="md:mx-40 mx-10 pb-10">
          <h2 className="font-test text-gray-800 font-bold text-4xl mb-2 mt-10">.Work</h2>
          <div className="w-12 h-0.5 bg-gray-900"></div>
        </div>
        <div className="lg:mx-40 mx-10 grid gap-12 lg:grid-cols-3 md:gris-cols-2 grid-cols-1 auto-row-min">
        {blogs.map(blog => {
          const isPublished = blog.properties.Publication.checkbox
          if(isPublished){ 
          console.log(blog)
          return(
              <Link passHref key={blog.id} href={`/blog/${blog.id}`}>
                  <a className="shadow shadow-4xl overflow-hidden">
                    <div className="max-w-lg max-w-full overflow-hidden">
                    <img className=" object-cover transform transition-all hover:scale-125" src={blog.cover.external.url}/>
                    </div>
                    <div className="max-w-2xl p-8">
                      <h2 className="text-gray-800 font-test text-3xl font-bold mb-5">{blog.properties.Name.title[0].plain_text}</h2>
                      <p className="mb-4 text-gray-700 font-light font-inter leading-8 mb-5">{blog.properties.Tagline.rich_text[0].plain_text}</p>
                      <div className="flex items-center space-x-4 mb-10">
                      <img className="h-10" src={blog.properties.Logo.files.length ? blog.properties.Logo.files[0].external.url : ""}/>
                        <span className="text-gray-700 font-titles tracking-widest ">{blog.properties.Client.select.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-900 font-titles tracking-tight font-semibold">DISCOVER THE PROJECT</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.75 12H23.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLineJoin="round"/>
                          <path d="M12.75 22.5L23.25 12L12.75 1.5" stroke="black" strokeWidth="1.5" strokeLineCap="round" stroke-lineJoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </a>
              </Link>
        )}})}
        </div>
      </main>
      <footer className="bg-gray-100 py-20">
        <div className="md:mx-40 mx-10">
          <span className="font-test test-gray-800">Made with love with Next.js, Tailwind CSS, and Notion</span>
        </div>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  const blogs = await getBlogs();
  return {
    props: {
      blogs,
      database: process.env.NOTION_DATABASE
    },
    revalidate: 3600
  };
}
