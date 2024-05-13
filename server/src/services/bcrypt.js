import bcrypt from 'bcryptjs'



export const saltPassword = async (password) => {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound)
    return hashedPassword
}


export const matchPassword = async (passwordOne, passwordTwo) => {
    return await bcrypt.compare(passwordOne, passwordTwo)
}