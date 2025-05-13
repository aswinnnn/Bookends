import { useEffect, useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate
import Card from "./Card";
import SearchTools from "./SearchTools";
import { get_journals } from "../../services/journal";
import { Journal } from "../../models/types";
import { useSelected } from "../../context/SelectedContext";
import { getMedia } from "../../services/media";
import { useTheme } from "../../ThemeContext";

const ITEMS_PER_PAGE = 12; // Number of cards per page

interface HomeProps {
  setJournalId:  React.Dispatch<React.SetStateAction<string>>;
  setUpdatingState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({setJournalId, setUpdatingState}) => {
  const {applyTemporaryTheme} = useTheme();
  const {setSelected} = useSelected();
  const [journals, setJournals] = useState<Journal[]>([]); // Store all journals
  const [filteredJournals, setFilteredJournals] = useState<Journal[]>([]); // Store filtered journals
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize navigate

  const totalPages = Math.ceil(filteredJournals.length / ITEMS_PER_PAGE);

  // Fetch journals on component mount
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setIsLoading(true);
        const fetchedJournals = await get_journals();
        setJournals(fetchedJournals);
        setFilteredJournals(fetchedJournals); // Initialize filtered journals
      } catch (error) {
        console.error("Error fetching journals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJournals();
  }, []);

  // Handle search input changes
  const handleSearchChange = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = journals.filter(
      (journal) =>
        journal.title.toLowerCase().includes(lowerQuery) ||
        journal.content.toLowerCase().includes(lowerQuery) ||
        journal.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
    setFilteredJournals(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  // Handle sorting
  const handleSort = (sortOption: string) => {
    const sorted = [...filteredJournals];
    if (sortOption === "Last Edited") {
      sorted.sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime());
    } else if (sortOption === "Last Created") {
      sorted.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    } else if (sortOption === "Oldest") {
      sorted.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
    }
    setFilteredJournals(sorted);
    setCurrentPage(1); // Reset to the first page
  };

  // Handle filtering by tags
  const handleFilter = (selectedTags: string[]) => {
    if (selectedTags.length === 0) {
      setFilteredJournals(journals); // Reset to all journals if no tags are selected
    } else {
      setFilteredJournals(
        journals.filter((journal) =>
          selectedTags.every((tag) => journal.tags.includes(tag))
        )
      );
    }
    setCurrentPage(1); // Reset to the first page
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle deleting a journal
  const handleDeleteJournal = (id: string) => {
    // Remove the journal from both `journals` and `filteredJournals`
    setJournals((prevJournals) => prevJournals.filter((journal) => journal.id !== id));
    setFilteredJournals((prevFiltered) =>
      prevFiltered.filter((journal) => journal.id !== id)
    );
  };

  // // Handle card click
  // const handleCardClick = (journal: Journal) => {
  //   navigate("/create", { state: { journal } });
  //   setSelected("create");
  //   console.log("Navigating to create page with journal:", journal);
  // };

const handleCardClick = async (journal: Journal) => {
  try {
    const media = await getMedia(journal.id); // Fetch media row
    if (media && media.customenabled) {
      applyTemporaryTheme({
        primary: media.primary_color || "#ffffff",
        secondary: media.secondary_color || "#f0f0f0",
        accent: media.text_color || "#000000",
        wallpaperImage: media.backgroundimage || "",
        isWallpaperEnabled: media.isbgenabled || false,
        fontTitle: media.font_title || "Playfair Display",
        fontBody: media.font_body || "Lexend Deca",
        textColor: media.text_color || "#000000",
      }); // Apply theme
    }
    setUpdatingState(true); // will be set to false when state finally gets there => Notebook.tsx
    setJournalId(journal.id); 
    console.info("[handleCardClick] set journalId to", journal.id);
    // Set journal ID then navigate cuz state is too late sometimes and it ends up creating a new journal.
    navigate("/create", { state: { journal } });
    setSelected("create");
    console.log("Navigating to create page with journal:", journal);
  } catch (error) {
    console.error("Failed to fetch media for journal:", error);
  }
};
  // Paginate journals
  const paginatedJournals = filteredJournals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen w-full px-4 py-8">
      <div className="mx-auto max-w-[1920px]">
        {/* Search and Filter Tools */}
        <div className="mb-8">
          <SearchTools
            onSearchChange={handleSearchChange}
            onSort={handleSort}
            onFilter={handleFilter}
            suggestions={filteredJournals.map((journal) => ({
              title: journal.title,
              content: journal.content,
              backgroundImage: "/placeholder.jpg", // Placeholder image
            }))}
            availableTags={[
              ...new Set(journals.flatMap((journal) => journal.tags)), // Extract unique tags
            ]}
          />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading journals...</div>
        ) : (
          <>
            {/* Masonry Grid Layout */}
            <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedJournals.map((journal) => (
                <Card
                  id={journal.id}
                  key={journal.id}
                  title={journal.title}
                  content={journal.content}
                  createdAt={journal.created_at}
                  lastEdited={journal.updated_at}
                  backgroundImage={"/placeholder.jpg"} // Placeholder image
                  tags={journal.tags}
                  onClick={() => handleCardClick(journal)} // Navigate on card click
                  onDelete={() => handleDeleteJournal(journal.id)} // Update state on delete
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className={totalPages === 1 ? "hidden" : "mt-8 flex justify-center gap-4"}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`rounded-full px-4 py-2 text-sm ${
                  currentPage === 1
                    ? "cursor-not-allowed bg-gray-700 text-gray-400"
                    : "bg-white/10 text-white hover:bg-white/20"
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
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
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
                    ? "cursor-not-allowed bg-gray-700 text-gray-400"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;