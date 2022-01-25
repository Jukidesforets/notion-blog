import Text from "./text";
import { getBlocks } from "../lib/api";

const Block = ({ block, blocks }) => {
  const { type } = block;
  const value = block[type];

  if (type === "paragraph") {
    return (
      <p className="my-2 text-gray-700 font-light font-inter leading-9">
        <Text text={value.text} />
      </p>
    );
  }
  if (type === "heading_1") {
    return (
      <h1 className="font-titles text-gray-700 font-light tracking-widest uppercase text-l mb-12">
        <Text text={value.text} />
      </h1>
    );
  }
  if (type === "heading_2") {
    return (
      <h2 className="text-gray-800 font-test text-3xl leading-normal font-bold mb-6 mt-20">
        <Text text={value.text} />
      </h2>
    );
  }
  if (type === "heading_3") {
    return (
      <h3 className="text-gray-800 font-test text-xl font-semibold mb-3 mt-10">
        <Text text={value.text} />
      </h3>
    );
  }
  if (type === "callout") {
    return (
      <div className="text-gray-700 font-light font-inter leading-9 bg-gray-100 p-5 my-8">
        <Text text={value.text} />
      </div>
    );
  }
  if (type === "quote") {
    return (
      <div className="flex text-gray-700 font-light tracking-wider font-inter leading-9 italic py-4 mb-4">
        <div className="w-1 min-h-full bg-gray-500 mr-4"></div>
        <Text text={value.text} />
        
      </div>
    );
  }
  if (type === "divider") {
    return (
      <div className="my-20"><svg width="38" height="4" viewBox="0 0 38 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L1.92598 2.42327C2.71479 3.63569 4.49003 3.63569 5.27884 2.42327L5.8296 1.57673C6.6184 0.364312 8.39365 0.36431 9.18245 1.57673L9.73321 2.42327C10.522 3.63569 12.2973 3.63569 13.0861 2.42327L13.6368 1.57673C14.4256 0.364313 16.2009 0.36431 16.9897 1.57673L17.5404 2.42327C18.3292 3.63569 20.1045 3.63569 20.8933 2.42327L21.5309 1.44328C22.2967 0.266158 24.0054 0.224177 24.8281 1.36227L25.6503 2.49955C26.4994 3.67411 28.2769 3.58373 29.0024 2.3291L29.2967 1.82033C30.0436 0.528723 31.8908 0.480244 32.7044 1.73089L32.9985 2.18292C33.8254 3.45383 35.7105 3.3784 36.4332 2.04549L37 1" stroke="#CAA1BA"/>
      </svg></div>
    );
  }
  if (type === "toggle") {
    return (
      <details className="my-8 bg-gray-50 sticky top-0">
          <summary className="text-gray-500 uppercase font-inter tracking-widest">
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
    );
  }
  if (type === "image") {
    const src = value.type === "external" ? value.external.url : value.file.url;
    
    return (
      <figure className="my-8">
          <img className="" src={src} alt="" />
          
      </figure>
    );
  }
  if (type === "video") {
    const src = value.type === "external" ? value.external.url : value.file.url;
    return (
      <figure className="my-8">
          <video autoplay="autoplay" loop muted className="" src={src} alt="video" />   
      </figure>
    );
  }
  if (type === "bulleted_list_item" || type === "numbered_list_item") {
    return (
      <li className=" mb-4 text-gray-700 font-light font-inter leading-8">
        <Text text={value.text} />
      </li>
    );
  }
  return (
    <p className="bg-red-600 px-4 py-2 mb-4">Not supported yet by Notion API</p>
  );
};

export async function getStaticProps(context) {
  const { id } = context.params;
  const blocks = await getBlocks(id);
  console.log(blocks);
  return {
    props: {
      blocks
    },
    revalidate: 3600
  };
}

export default Block;

