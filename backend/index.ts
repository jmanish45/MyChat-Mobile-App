import app from "./src/app";
import { connectDB } from "./src/config/database.ts";


const PORT = process.env.PORT || 3000;


connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((err) => {
    console.log(err);
    process.exit(1);

});
