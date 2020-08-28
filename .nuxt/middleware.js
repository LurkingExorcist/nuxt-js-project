const middleware = {}

middleware['no-student'] = require('../middleware/no-student.js')
middleware['no-student'] = middleware['no-student'].default || middleware['no-student']

export default middleware
