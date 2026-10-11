const addBook = async (title, author) => {
  try {
    const response = await fetch(booksAPI, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, author, status: "available" }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const showAllBooks = async () => {
  try {
    const response = await fetch(booksAPI);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const deleteBook = async (id) => {
  try {
    const response = await fetch(`${booksAPI}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    console.log("წიგნი წაიშალა");
  } catch (error) {
    console.error(error.message);
  }
};
