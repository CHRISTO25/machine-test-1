import { saveUser } from "../../repositories/userRepository.js";
import { saltPassword } from "../../services/bcrypt.js"
import { generateUserToken } from '../../middlewares/createToken.js';


//, name, idName, email, jobselect, job, phone, password


export const createUser = async (req,res) => {
  console.log("calling here-----------------------------------------");
  const name = req.session.globalName
  
  const email = req.session.globalEmail
 
  const phone = req.session.globalPhone
  const password = req.session.globalPassword


  console.log("session things ===============",);

  if (!name ||  !email || !phone || !password) {
    return { data: " All Fields Are Rquired - problem in saving" }
}
    let securePassword = await saltPassword(password);
    const newUser = await saveUser(name, email, phone, securePassword)
    if (newUser) {
      const token = await generateUserToken(res, newUser)
      console.log(token);
      if (token) {
        return { data: "SignUp  sucessfull", token }
      }else {
        return { data: "sorry SignUp cancelled" }
      }
      
    }
    
  }
