// Importa todos tus modelos
import { User } from "../models/user.model.js";
import { Note } from "../models/note.model.js";
import { Category } from "../models/category.model.js";

export function setupAssociations() {
  console.log("Setting up database associations...");

  // Relación User <-> Note (Uno a Muchos)
  User.hasMany(Note, { foreignKey: "userId", onDelete: "CASCADE" });
  Note.belongsTo(User, { foreignKey: "userId" });

  // Relación Note <-> Category (Muchos a Muchos)
  Note.belongsToMany(Category, {
    through: "NoteCategory",
    foreignKey: "noteId",
    timestamps: false,
  });
  Category.belongsToMany(Note, {
    through: "NoteCategory",
    foreignKey: "categoryId",
    timestamps: false,
  });

  console.log("Associations setup complete.");
}
