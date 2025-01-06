import requests
from bs4 import BeautifulSoup

def fetch_book_data(book_id: int) -> dict:
    content_url = f"https://www.gutenberg.org/files/{book_id}/{book_id}-0.txt"
    metadata_url = f"https://www.gutenberg.org/ebooks/{book_id}"

    # Fetch book content
    content_response = requests.get(content_url)
    if content_response.status_code != 200:
        raise ValueError(f"Failed to fetch book content for ID {book_id}")
    content = content_response.text

    # Fetch book metadata
    metadata_response = requests.get(metadata_url)
    if metadata_response.status_code != 200:
        raise ValueError(f"Failed to fetch book metadata for ID {book_id}")
    metadata_html = metadata_response.text

    # Process metadata with BeautifulSoup
    soup = BeautifulSoup(metadata_html, "html.parser")

    # Title
    title = soup.find("meta", {"property": "og:title"})["content"] if soup.find("meta", {"property": "og:title"}) else f"Book {book_id}"

    # Author extracted from title
    author = None
    if " by " in title:
        author = title.split(" by ")[-1]
        title = title.split(" by ")[0]

    return {
        "id": book_id,
        "title": title,
        "author": author,
        "content": content
    }