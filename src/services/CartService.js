import axios from "../axios";

class CartService {
    cartPost = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('carts',data)
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    }
}
export default new CartService()