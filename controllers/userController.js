import db from "../db.js";

// Get all users
export const getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

// Create a user
export const createUser = (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({
      id: result.insertId,
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });
  });
};

// Update a user
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ id, name, email, updated_at: new Date() });
  });
};

// Delete a user
export const deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "User deleted successfully" });
  });
};
