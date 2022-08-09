import axios from "../axios";

class UserService{
   /* postUser=async (data)=>{

        const promise=new Promise((resolve,reject)=>{
            /!*const headers = {
                "Content-Type": "application/json",
            };*!/
          //  let headers = new Headers();
            // headers.append('Content-Type', 'application/json');
            // headers.append('Accept', 'application/json');
            //
            // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
            // headers.append('Access-Control-Allow-Credentials', 'true');
            //
            // headers.append('GET', 'POST', 'OPTIONS');

            axios.post('users',data,)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise;
    }
*/
    createPost = async (data) => {
        console.log("form data: " + data)
        const promise = new Promise((resolve, reject) => {
            axios.post('https://jsonplaceholder.typicode.com/posts', data)   //10s
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }
    fetchUser = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('users')
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    }
    putCustomer = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.put('users', data)
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    };

    deleteCustomer = async (id) => {
        console.log(id)
        const promise = new Promise((resolve, reject) => {
            axios.delete('users/'+id)
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    };
}
export default new UserService();