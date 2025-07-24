const Order = require('../models/Order');

const Order = require('../models/Order');

// Crear un nuevo pedido
const createOrder = async (req, res) => {
  try {
    const userEmail = req.user.email; 

    if (!userEmail) {
      return res.status(401).json({ message: 'No autorizado. Usuario no encontrado.' });
    }

    const orderData = { ...req.body, userEmail: userEmail };
    const order = new Order(orderData);
    
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear pedido', error });
  }
};

// Obtener historial de pedidos DEL USUARIO LOGUEADO
const getOrders = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(401).json({ message: 'No autorizado. Usuario no encontrado.' });
    }

    const orders = await Order.find({ userEmail: userEmail }).sort({ timestamp: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error });
  }
};

module.exports = {
  createOrder,
  getOrders
};
