import { useState } from 'react'
import Card from './Card'
import SearchTools from './SearchTools'

const sampleJournals = [
  {
    title: "A Quiet Morning Reflection",
    content: "The sun peaked through my window this morning, casting long shadows across my desk. I've been thinking about how the smallest moments often carry the most weight...",
    createdAt: new Date("2024-04-22T08:30:00"),
    lastEdited: new Date("2025-04-23T10:00:00"),
    backgroundImage: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    tags: ["morning", "reflection", "personal"]
  },
  {
    title: "Learning to Code: The Journey Continues",
    content: "Today I finally understood how useEffect truly works. It's fascinating how hooks have revolutionized the way we think about component lifecycle...",
    createdAt: new Date("2024-04-21T15:45:00"),
    lastEdited: new Date("2024-04-22T09:00:00"),
    backgroundImage: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
    tags: ["coding", "learning", "react"]
  },
  {
    title: "Midnight Musings",
    content: "There's something magical about the stillness of night. When the world sleeps, thoughts flow more freely, unbound by the constraints of daylight...",
    createdAt: new Date("2024-04-20T23:15:00"),
    lastEdited: new Date("2024-04-21T01:30:00"),
    backgroundImage: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    tags: ["night", "thoughts"]
  },
  {
    title: "Weekend Adventure: Hidden Trails",
    content: "Discovered a beautiful hiking trail just outside the city. The way the light filtered through the canopy created the most enchanting patterns...",
    createdAt: new Date("2024-04-19T12:00:00"),
    lastEdited: new Date("2024-04-20T08:00:00"),
    tags: ["adventure", "nature", "hiking"]
  },
  {
    title: "Coffee and Contemplation",
    content: "The aroma of freshly ground coffee beans fills my apartment. These morning rituals have become anchors in the chaos of daily life...",
    createdAt: new Date("2024-04-18T09:20:00"),
    lastEdited: new Date("2024-04-18T18:00:00"),
    backgroundImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    tags: ["coffee", "routine", "mindfulness"]
  },
  {
    title: "Exploring the Cosmos",
    content: "Staring at the night sky, I can't help but wonder about the vastness of the universe. Each star tells a story, and I feel so small yet so connected...",
    createdAt: new Date("2024-04-17T22:00:00"),
    lastEdited: new Date("2024-04-18T02:00:00"),
    backgroundImage: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    tags: ["space", "cosmos", "wonder"]
  },
  {
    title: "A Day at the Beach",
    content: "The sound of waves crashing, the salty breeze, and the warm sand beneath my feet. Today was a perfect escape from the hustle and bustle of life...",
    createdAt: new Date("2024-04-16T14:30:00"),
    lastEdited: new Date("2024-04-17T09:00:00"),
    backgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    tags: ["beach", "relaxation", "nature"]
  },
  {
    title: "Urban Exploration",
    content: "Wandering through the city, I discovered hidden gems tucked away in alleys. The blend of old and new architecture tells a story of resilience...",
    createdAt: new Date("2024-04-15T18:45:00"),
    lastEdited: new Date("2024-04-16T12:00:00"),
    backgroundImage: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    tags: ["urban", "exploration", "architecture"]
  }
]

const ITEMS_PER_PAGE = 12 // Number of cards per page

const Home = () => {
  const [filteredJournals, setFilteredJournals] = useState(sampleJournals)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(filteredJournals.length / ITEMS_PER_PAGE)

  const handleSearchChange = (query: string) => {
    const lowerQuery = query.toLowerCase()
    const filtered = sampleJournals.filter(
      (journal) =>
        journal.title.toLowerCase().includes(lowerQuery) ||
        journal.content.toLowerCase().includes(lowerQuery) ||
        journal.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
    setFilteredJournals(filtered)
    setCurrentPage(1) // Reset to the first page
  }

  const handleSort = (sortOption: string) => {
    const sorted = [...filteredJournals]
    if (sortOption === 'Last Edited') {
      sorted.sort((a, b) => (b.lastEdited?.getTime() || 0) - (a.lastEdited?.getTime() || 0))
    } else if (sortOption === 'Last Created') {
      sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } else if (sortOption === 'Oldest') {
      sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    }
    setFilteredJournals(sorted)
    setCurrentPage(1) // Reset to the first page
  }

  const handleFilter = (selectedTags: string[]) => {
    if (selectedTags.length === 0) {
      setFilteredJournals(sampleJournals)
    } else {
      setFilteredJournals(
        sampleJournals.filter((journal) =>
          selectedTags.every((tag) => journal.tags.includes(tag))
        )
      )
    }
    setCurrentPage(1) // Reset to the first page
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const paginatedJournals = filteredJournals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen w-full px-4 py-8">
      <div className="mx-auto max-w-[1920px]">
      
        <div className="mb-8">
          <SearchTools
            onSearchChange={handleSearchChange}
            onSort={handleSort}
            onFilter={handleFilter}
            suggestions={filteredJournals.map((journal) => ({
              title: journal.title,
              content: journal.content,
              backgroundImage: journal.backgroundImage,
            }))}
            availableTags={[
              'morning',
              'reflection',
              'personal',
              'coding',
              'learning',
              'react',
              'night',
              'thoughts',
              'adventure',
              'nature',
              'hiking',
              'coffee',
              'routine',
              'mindfulness',
              'space',
              'cosmos',
              'wonder',
              'beach',
              'relaxation',
              'urban',
              'exploration',
              'architecture',
            ]}
          />
        </div>

        {/* Masonry Grid Layout */}
        <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedJournals.map((journal, index) => (
            <Card
              key={index}
              title={journal.title}
              content={journal.content}
              createdAt={journal.createdAt}
              lastEdited={journal.lastEdited}
              backgroundImage={journal.backgroundImage}
              tags={journal.tags}
              onDelete={() => {
                console.log('Delete:', journal.title)
              }}
              onViewInfo={() => {
                console.log('View info:', journal.title)
              }}
              onShare={() => {
                console.log('Share:', journal.title)
              }}
              onBookmark={() => {
                console.log('Bookmark:', journal.title)
              }}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className={totalPages == 1 ? 'hidden ':'mt-8 flex justify-center gap-4'}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-full px-4 py-2 text-sm ${
              currentPage === 1
                ? 'cursor-not-allowed bg-gray-700 text-gray-400'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`rounded-full px-4 py-2 text-sm ${
                currentPage === page
                  ? 'bg-white/20 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-full px-4 py-2 text-sm ${
              currentPage === totalPages
                ? 'cursor-not-allowed bg-gray-700 text-gray-400'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home