import { server } from './api/server'
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`The server is listening on port: ${PORT}`);
});