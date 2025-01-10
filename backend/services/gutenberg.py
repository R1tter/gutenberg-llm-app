from bs4 import BeautifulSoup
import requests


def fetch_book_data(book_id: int) -> dict:
    # URL para metadados
    metadata_url = f"https://www.gutenberg.org/ebooks/{book_id}"
    metadata_response = requests.get(metadata_url)

    if metadata_response.status_code != 200:
        raise ValueError(f"Failed to fetch book metadata for ID {book_id}")

    metadata_html = metadata_response.text
    soup = BeautifulSoup(metadata_html, "html.parser")

    # Localizar a tabela "About this eBook"
    about_table = soup.find("table", class_="bibrec")

    # Inicializar variáveis
    title = None
    author = None
    summary = "No summary available."
    language = "Unknown"
    year = None
    cover_image_url = None

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
                elif header_text == "Language":
                    language = value_text
                elif header_text == "Release Date":
                    year = int(value_text.split(",")[-1].strip()) if value_text else None

    # Procurar por uma imagem de capa
    cover_image_tag = soup.find("img", class_="cover")
    if cover_image_tag:
        cover_image_url = f"https://www.gutenberg.org{cover_image_tag['src']}"

    # URL para conteúdo do livro
    content_url = f"https://www.gutenberg.org/files/{book_id}/{book_id}-0.txt"
    content = "Content not available."

    try:
        content_response = requests.get(content_url, timeout=10)
        if content_response.status_code == 200:
            content = content_response.text
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch content for book ID {book_id}: {e}")

    # Retornar dados do livro
    return {
        "id": book_id,
        "title": title or f"Book {book_id}",
        "author": author or "Unknown",
        "content": content,
        "language": language,
        "year": year,
        "cover_image_url": cover_image_url,
    }
