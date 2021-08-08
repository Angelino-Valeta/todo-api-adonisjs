'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

class UserController {

  async create({ request, response }){

    try{

      const data = request.only(["username", "email", "password"])

      const erroMessage = {
        'username.required': 'Esse campo é obrigatório',
        'username.unique': 'Já existe um usuário com este nome',
        'username:min': 'O seu nome ter mais de 5 caracteres',
        'email.required': 'Precisas fornecer o seu email',
        'email.unique': 'Já existe uma conta com este email',
        'password.required': 'A password é obriatório',
        'password.min': 'A sua palavra passe deve ter mais de 5 caracteres'
      }

      const validation = await validateAll(data,{
        username: 'required|min:5|unique:users',
        email: 'required|email|unique:users',
        password: 'required|min:6'
      }, erroMessage)

      if(validation.fails()){
        return response.status(401).send({ messages: validation.messages() })
      }

      const user = await User.create(data)
      return user

    }catch(err){
      response.status(500).send({message: `Error: ${err.message}`})
    }

  }

  async login({ request, response, auth }){
    try{

      const { email, password } = request.all()

      const user = await auth.attempt(email, password)

      return user;

    }catch(err){
      return response.status(500).send({ message: `Errors: ${err.message}` })
    }
  }

}

module.exports = UserController
