const Cart = require("../models/cart.model");
const User = require("../models/user.model");


exports.createCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        cartItems.forEach((item) => {
            item.userId = userId;
            item.serviceId = item.id;
            delete item.id;
        });

        const existingCart = await Cart.findOne({ userId });

        if (existingCart) {
            let updatedCartItems = [...existingCart.cartItems];

            cartItems.forEach((newItem) => {
                const exists = updatedCartItems.some(item => item.serviceId === newItem.serviceId);
                if (!exists) {
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
            const cart = new Cart({ userId, cartItems });
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







// exports.createCart = async (req, res) => {
//     try {
//         const { userId, cartItems } = req.body;
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         cartItems.map((item) => {
//             item.userId = userId;
//             item.serviceId = item.id
//             delete item.id
//         })
//         // console.log(cartItems);
//         const existingCart = await Cart.findOne({ userId });
//         if (existingCart) {
//             const mergedCartItems = [...existingCart.cartItems, ...cartItems];
//             const cart = await Cart.findOneAndUpdate({ userId }, { $set: { cartItems: mergedCartItems } }, { new: true });
//             console.log("existing cart: ",cart)
//             return res.status(200).json({ success: true, message: "Cart updated successfully", cart });
//         } else {
//             const cart = new Cart({ userId, cartItems });
//             console.log("new cart: ",cart)
//             await cart.save();
//             return res.status(201).json({ success: true, message: "Cart created successfully", cart });
//         }
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "Error creating cart", error: error.message });
//     }
// };
