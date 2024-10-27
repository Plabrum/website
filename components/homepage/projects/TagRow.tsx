import React from 'react'
import { TagType } from 'schemas/schema_types'

// type Props = { tags:  };

export default function TagRow({ tags }: { tags: TagType[] }) {
  const colors = [
    'bg-fuchsia-500',
    'bg-orange-500',
    'bg-rose-500',
    'bg-lime-500',
    'bg-teal-500',
    'bg-sky-500',
    'bg-yellow-500',
  ]
  function assign_color(tag: TagType) {
    if (tag.color !== undefined) {
      const index = tag.color % colors.length
      return colors[index]
    }
    return 'bg-gray-500'
  }
  return (
    <div className="col-span-2 max-md:hidden mx-2 flex flew-row gap-2 h-8 justify-start overflow-auto">
      {tags.slice(0, 3).map(
        (tag, index) =>
          tag && (
            <div className={`flex rounded-md items-center whitespace-nowrap ${assign_color(tag)}`} key={index}>
              <p className="px-4 text-custom-t3 text-sm ">{tag.name}</p>
            </div>
          ),
      )}
    </div>
  )
}
