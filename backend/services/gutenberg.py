import requests
from bs4 import BeautifulSoup

def fetch_book_data(book_id: int) -> dict:
    metadata_url = f"https://www.gutenberg.org/ebooks/{book_id}"
    metadata_response = requests.get(metadata_url)
    if metadata_response.status_code != 200:
        raise ValueError(f"Failed to fetch book metadata for ID {book_id}")

    metadata_html = metadata_response.text
    soup = BeautifulSoup(metadata_html, "html.parser")

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
        cover_image_url = f"https://www.gutenberg.org{cover_image['src']}"

    # URL for book content
    content_url = f"https://www.gutenberg.org/files/{book_id}/{book_id}-0.txt"
    content_response = requests.get(content_url)
    if content_response.status_code != 200:
        raise ValueError(f"Failed to fetch book content for ID {book_id}")
    content = content_response.text

    return {
        "id": book_id,
        "title": title,
        "author": author,
        "summary": summary,
        "cover_image_url": cover_image_url,
        "content": content
    }