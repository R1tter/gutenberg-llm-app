import requests

def fetch_book_data(book_id: int):
  content_url = f"https://www.gutenberg.org/files/{book_id}/{book_id}-0.txt"
  metadata_url = f"https://www.gutenberg.org/ebooks/{book_id}"

  # Fetch the book content
  content_response = requests.get(content_url)
  if content_response.status_code != 200:
    raise ValueError("Failed to fetch book content")
  content = content_response.text

  # Fetch the book metadata
  metadata_response = requests.get(metadata_url)
  if metadata_response.status_code != 200:
    raise ValueError("Failed to fetch book metadata")
  metadata = metadata_response.text

  return { "content": content, "metadata": metadata}