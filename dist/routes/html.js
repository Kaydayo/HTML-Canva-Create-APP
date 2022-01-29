"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var htmlController_1 = require("../controllers/htmlController");
var router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).json({ message: 'you are here' });
});
router.post('/create', htmlController_1.createHtml);
router.get('/get/webview/:id', htmlController_1.getHtml);
exports.default = router;
