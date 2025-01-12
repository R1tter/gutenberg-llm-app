import requests
from bs4 import BeautifulSoup

# Constants
GUTENBERG_BASE_URL = "https://www.gutenberg.org"

def fetch_book_data(book_id: int) -> dict:
    """
    Fetch metadata and content for a given book from Project Gutenberg.

    Args:
        book_id (int): The Project Gutenberg book ID.

    Returns:
        dict: Dictionary containing book metadata and content.

    Raises:
        ValueError: If the book data or content cannot be retrieved.
    """
    try:
        metadata_url = f"{GUTENBERG_BASE_URL}/ebooks/{book_id}"
        metadata_response = requests.get(metadata_url)
        metadata_response.raise_for_status()

        # Parse the HTML
        soup = BeautifulSoup(metadata_response.text, "html.parser")

        # Initialize variables
        title = None
        author = None
        summary = "No summary available."
        cover_image_url = None

        # Locate the "About this eBook" table
        about_table = soup.find("table", class_="bibrec")
        if about_table:
            rows = about_table.find_all("tr")
            for row in rows:
                header = row.find("th")
                value = row.find("td")
                if header and value:
                    header_text = header.get_text(strip=True)
                    value_text = value.get_text(strip=True)

                    if header_text == "Title":
                        title = value_text
                    elif header_text == "Author":
                        author = value_text
                    elif header_text == "Summary":
                        summary = value_text

        # Extract the book cover image
        cover_image = soup.find("img", class_="cover-art")
        if cover_image and "src" in cover_image.attrs:
            cover_image_url = f"{GUTENBERG_BASE_URL}{cover_image['src']}"

        # URL for book content
        content_url = f"{GUTENBERG_BASE_URL}/files/{book_id}/{book_id}-0.txt"
        content_response = requests.get(content_url)
        content_response.raise_for_status()
        content = content_response.text

        # Return a dictionary with the book data
        return {
            "id": book_id,
            "title": title or "Unknown Title",
            "author": author or "Unknown Author",
            "summary": summary,
            "cover_image_url": cover_image_url or f"https://via.placeholder.com/150?text=No+Cover+Available",
            "content": content
        }

    except requests.exceptions.RequestException as e:
        raise ValueError(f"Failed to fetch data for book ID {book_id}: {e}")
    except Exception as e:
        raise ValueError(f"An unexpected error occurred: {e}")
