import Client from '../controllers/HttpClient';
class UserController {
    

    static async searchCall(url, payload) {
      console.log(JSON.stringify(payload))
      return new Promise((resolve, reject) => {
        

        Client
          .post(url, payload)
          .then(async (response) => {
          
            // if(data.status=='true')
            // resolve(data);
            // else reject(new Error(data.message))
            if(response)
            resolve(response.data);
            else reject(new Error("Operator Not Found"))
            
          })
          .catch(async (error) => {
            
            reject(new Error(error))
          })

        
      
    });

  }
    

  
    
  }
  
  export default UserController;