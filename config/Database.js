const mongoose = require('mongoose')

const url = 'mongodb+srv://Darshan4450:Darshan@nodeapi-xhr57.mongodb.net/lsa?retryWrites=true&w=majority'
mongoose.connect(url, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
.then((data) => {
    console.log(`MongoDB is Connected On ${data.connection.host}`)
})