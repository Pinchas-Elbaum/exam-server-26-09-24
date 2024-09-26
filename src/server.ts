import express from 'express';
import userRoutes from './routes/routers';

const app = express();
const port = 3000;



app.use(express.json());

app.use('/api/beepers', userRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
