import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { SidebarInput } from '@/components/ui/sidebar';
import { getProjects } from '@/lib/actions/project.actions';
import Loader from '@/components/loader'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  //@ts-expect-error not sure why
  const query = await searchParams?.query as string;

  let searchResults = null

 try{
  const {success, data} = await getProjects(query)
  if(success && data){
    searchResults = data
  }

 }catch(error){
  console.log(error)
  throw new Error('something went wrong')
 }






  if(!searchResults && query){
    return (
          <div className="flex items-center justify-center min-h-screen">
            <Loader />
          </div>
        );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Search Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <form className="relative" >
          <SidebarInput
            name="query"
            defaultValue={query}
            className="w-full h-10 pl-7 py-3  pr-4 bg-white rounded-lg shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for projects, tasks, or anything..."

          />
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mr-4"
          />
        </form>
      </div>
      {/* Search Results */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div
              key={result.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">{result.projectName}</h3>
              <p className="mt-2 text-gray-600">{result.description}</p>
              <a
                href={`/projects/${result.id}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </a>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
