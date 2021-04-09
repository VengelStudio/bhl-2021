import 'dotenv/config';
import App from './app';
import BuildingRoute from './routes/building.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new BuildingRoute()]);

app.listen();
