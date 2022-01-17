import Block from "./block";

const Column = ({ block }) => {
  const colLeft = block.column_list[0].left
  const colRight = block.column_list[0].right

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="">{colLeft.map(block => {
        return <Block key={block.id} block={block} />
      })}</div>
      <div className="">{colRight.map(block => {
        return <Block key={block.id} block={block} />
      })}</div>
    </div>
  )
};

export default Column;