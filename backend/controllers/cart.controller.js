const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const Service = require("../models/services.model");
exports.createCart = async (req, res) => {
    try {
        const { userId, cartItems  } = req.body;
        if(!userId || !cartItems){ 
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("from create cart api",cartItems);
        // Normalize incoming cart items
        const newCartItems = cartItems.map((item) => ({
            ...item,
            userId,
            serviceId: item.id,
            quantity: item.quantity,
        }));

        const existingCart = await Cart.findOne({ userId });

        if (existingCart) {
            let updatedCartItems = [...existingCart.cartItems];

            newCartItems.forEach((newItem) => {
                const index = updatedCartItems.findIndex(item => item.serviceId === newItem.serviceId);
                if (index !== -1) {
                    // Replace quantity (or add to it — your choice here)
                    updatedCartItems[index].quantity = newItem.quantity;
                } else {
                    updatedCartItems.push(newItem);
                }
            });

            const cart = await Cart.findOneAndUpdate(
                { userId },
                { $set: { cartItems: updatedCartItems } },
                { new: true }
            );

            return res.status(200).json({ success: true, message: "Cart updated successfully", cart });
        } else {
            const cart = new Cart({ userId, cartItems: newCartItems });
            await cart.save();
            return res.status(201).json({ success: true, message: "Cart created successfully", cart });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error creating cart", error: error.message });
    }
};


exports.getCart = async (req, res) => {
    try {
        const { userId } = req.query;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
        return res.status(200).json({ success: true, message: "Cart found", cart });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error getting cart", error: error.message });
    }
};


// Update cart item quantity
exports.updateCart = async (req, res) => {
    try {
        console.log('hit update cart')
        const { userId, serviceId, quantity } = req.body

        if (!userId || !serviceId || typeof quantity !== 'number') {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields or invalid quantity'
            })
        }

        // Check if service exists
        const service = await Service.findById(serviceId)
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            })
        }

        // Find user's cart
        let cart = await Cart.findOne({userId})

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        // console.log("here all cart info: ",cart)

        // Find item index in cart
        const itemIndex = cart.cartItems.findIndex(item => 
            item.serviceId && item.serviceId.toString() === serviceId.toString()
        )
        

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            })
        }

        // Update or remove based on quantity
        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            cart.cartItems.splice(itemIndex, 1)
        } else {
            // Update quantity
            cart.cartItems[itemIndex].quantity = quantity
        }

        // Save updated cart
        await cart.save()

        res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            cart
        })

    } catch (error) {
        console.error('Error updating cart:', error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

// Delete item from cart
exports.deleteFromCart = async (req, res) => {
    try {
        const { userId, serviceId } = req.body

        // Validate input
        if (!userId || !serviceId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            })
        }

        // Find and update cart
        const cart = await Cart.findOneAndUpdate(
            { userId: userId },
            { $pull: { cartItems: { serviceId } } },
            { new: true }
        )

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            cart
        })

    } catch (error) {
        console.error('Error deleting from cart:', error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}