import React from 'react'
import { use } from 'react'
import { SidebarInput } from '../ui/sidebar'
import { Search } from 'lucide-react'


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
const SearchBar = async (props: {
  searchParams: SearchParams
}) => {
    const searchParams = use(props.searchParams)
    const query = searchParams.query

  return (
    <>
      <SidebarInput
          id="search"
          placeholder="Type to search..."
          className="h-8 pl-7"
        />
        <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
    </>
  )
}

export default SearchBar
