export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};
export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};


export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const findUser = (email, password) => {
  const users = getUsers();
  return users.find(
    (u) => u.email === email && u.password === password
  );
};

export const isUserExists = (email) => {
  const users = getUsers();
  return users.some((u) => u.email === email);
};

export const loginUser = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem("loggedInUser");
};
