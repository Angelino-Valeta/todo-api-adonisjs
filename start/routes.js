'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/user', 'UserController.create')
Route.post('/login', 'UserController.login')

Route.get('/todos', 'TodoController.index')
Route.get('/todo/:id', 'TodoController.show')
Route.post('/todo/create', 'TodoController.store')
Route.put('/todo/update/:id', 'TodoController.update')
Route.put('/todo/delete/:id', 'TodoController.delete')
