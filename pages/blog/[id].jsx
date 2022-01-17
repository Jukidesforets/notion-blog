import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import React from "react";
import { getBlocks, getBlogs, getBlog } from "../../lib/api";
import Block from "../../components/block";
import Column from "../../components/column";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY
})

const BlogPage = ({ blocks, page }) => {
  const title = page.properties.Name.title[0].plain_text;
  const summary = page.properties.Summary.rich_text[0].plain_text;
  const year = page.properties.Year.rich_text[0].plain_text;
  const problem = page.properties.Problem.rich_text[0].plain_text;
  const audience = page.properties.Audience.rich_text[0].plain_text;
  const client = page.properties.Client.select.name;
  const role = page.properties.Role.rich_text[0].plain_text;
  const tools = page.properties.Tools.rich_text[0].plain_text;
  const cover = page.cover.file.url;
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&family=Inter:wght@300;400;600;700&family=Bitter:wght@300;400;500&family=Fraunces:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <nav className="flex flex-row justify-between items-center py-4 px-8 w-full fixed top-0 left-0 Z-10"><Link passHref href="/">
      <Image width={48} height={48} className="cursor-pointer" src="/../public/img/export_small.png" alt="logor"/></Link>
        <ul className="flex flex-row space-x-8">
          <li className="text-gray-700 font-light font-inter"><Link passHref href="/">
        <a>
          Work
        </a>
      </Link></li>
          <li className="text-gray-700 font-light font-inter">Resume</li>
          <li className="text-gray-700 font-light font-inter">Say Hi!</li>
        </ul>
		  </nav>
      <header div className="flex flex-col md:flex-row md:justify-center md:item-center md:h-screen md:w-screen">
        <div className="my-40 px-12 md:w-1/2 md:px-36 flex flex-col item-center justify-center">
          <h1 className="mb-10 font-test text-2xl font-bold md:text-5xl">{title}</h1>
          <p className="text-gray-700 font-light font-inter leading-8 mb-4">{summary}</p>
          <p className="">{year}</p>
        </div>
        <div className="md:w-1/2">
        <img src={cover} alt="cover" className="object-cover md:w-screen md:h-screen" />
        </div>
      </header>
      <section className="flex flex-col space-y-8 p-14 md:flex-row md:space-x-32 md:px-36 md:py-14 bg-gray-100 ">
        <div className="flex flex-col space-y-8 justify-center md:w-1/3">
          <div className="flex flex-col md:items-end"><span className="uppercase text-gray-500 font-light font-inter text-sm tracking-widest">Role</span><span className="text-gray-700 font-light font-inter leading-8">{role}</span></div>
          <div className="flex flex-col md:items-end"><span className="uppercase text-gray-500 font-light font-inter text-sm tracking-widest">Tools</span><span className="text-gray-700 font-light font-inter leading-8">{tools}</span></div>
          <div className="flex flex-col md:items-end"><span className="uppercase text-gray-500 font-light font-inter text-sm tracking-widest">Client</span><span className="text-gray-700 font-light font-inter leading-8">{client}</span></div>
        </div>
        <div className="md:w-2/3">
          <h2 className="text-gray-800 font-test text-2xl font-semibold tracking-tight leading-normal mb-2">Scope and goal</h2>
          <p className="text-gray-700 font-light font-inter leading-8 mb-4">{problem}</p>
          <h2 className="text-gray-800 font-test text-2xl font-semibold tracking-tight leading-normal mb-2 mt-8">Audience</h2>
          <p className="text-gray-700 font-light font-inter leading-8 mb-4">{audience}</p>
        </div>
      </section>
      <main className="sm:container md:mx-auto my-20 mx-12">
        
      {blocks.map(block => {
            if (block.values.type === "column_list") {
              return <Column key={block.values.id} block={block.values} />
            }
            else {
              return <Block key={block.values.id} block={block.values} />
            }
          })}
        
      </main>
      <footer className="bg-gray-100 py-20">
        <div className="md:mx-40 sm:mx-12">
        <span className="font-test test-gray-800">Made with love with Next.js, Tailwind CSS, and Notion</span>
        </div>
      </footer>
    </>
  );
};

export async function getStaticPaths() {
  const blogs = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE
  })
  return {
    paths: blogs.results.map(el => ({
      params: {
        id: el.id
      }
    })),
    fallback: "blocking"
  };
}

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const blocks = await fetchBlock(id)
  const page = await getBlog(id);

  async function fetchBlock(id) {
    let response = await notion.blocks.children.list({
      block_id: id
    });
    return await response;
  }

  async function buildContent(blocks) {
    let newBlocks = []
    await Promise.all(blocks.results.map(async (block, i) => {
      const data = await getColumnContent(block)
      newBlocks.push({
        key: i,
        values: data
      })
    }))
    newBlocks.sort(function (a, b) {
      return a.key - b.key
    })
    return newBlocks
  }

  async function getColumnContent(block){
    if (block.type === "column_list") {
      const columnListChildren = await fetchBlock(block.id)
      const colLeft = await fetchBlock(columnListChildren.results[0].id)
      const colRight = await fetchBlock(columnListChildren.results[1].id)
      return ({
        object: block.object,
        id: block.id,
        created_time: block.created_time,
        last_edited_time: block.last_edited_time,
        has_children: block.has_children,
        archived: block.archived,
        type: block.type,
        column_list: [{
          left: colLeft.results,
          right: colRight.results
        }]
      })
    }
    else {
      return block
    }
  }
  
  const processedData = await buildContent(blocks)

  return {
    props: {
      blocks: processedData,
      page
    },
    revalidate: 3600
  };
}

export default BlogPage;
