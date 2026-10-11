const getUser = async (id) => {
  try {
    const response = await fetch(`${userAPI}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

const addUser = async (name, email) => {
  try {
    const d = new Date();
    const registrationDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

    const response = await fetch(userAPI, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, email, registrationDate }),
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

