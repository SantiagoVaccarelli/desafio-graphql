import productsController from "../controllers/products.js";
const productController = new productsController();

export const resolvers = {
  Query: {
    getAllProducts: () => {
      return productController.getAll();
    },
  },
  Mutation: {
    addProduct: async (_, { input }) => {
      return productController.createProduct(input);
    },
    deleteProduct: async (_, { id }) => {
      return productController.deleteProduct(id);
    },
    updateProduct: async (_, { id, input }) => {
      return productController.updateProduct(id, input);
    },
  },
};