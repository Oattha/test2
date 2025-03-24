const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8000;

// Secret key สำหรับ JWT
const JWT_SECRET_KEY = 'ZlR9xFCNRB5l8F5lzI6lREzcL5FSPj3ZVgFkQXyLgQZSOXf8Od9m5wn8H3fA0XqA';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// ตรวจสอบ JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'ไม่มีสิทธิ์เข้าถึงข้อมูลนี้' });

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token หมดอายุหรือไม่ถูกต้อง' });
    req.user = decoded;
    next();
  });
};

let conn;

// เชื่อมต่อ MySQL
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 7777,
  });
};

// ฟังก์ชันตรวจสอบข้อมูล
const validateData = (data, requiredFields) => {
  return requiredFields
    .filter((field) => !data[field])
    .map((field) => `กรุณากรอก ${field}`);
};

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'กรุณากรอกชื่อ อีเมล และรหัสผ่าน'
      });
    }

    // ตรวจสอบว่า Email นี้มีในระบบหรือไม่
    const [existingUser] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({
        message: 'อีเมลนี้ถูกใช้ไปแล้ว'
      });
    }

    // Hash รหัสผ่านก่อนบันทึก
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // บันทึกข้อมูลผู้ใช้ลง MySQL
    const [result] = await conn.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [name, email, hashedPassword]
    );

    // สร้าง JWT Token
    const token = jwt.sign(
      { userId: result.insertId, email: email },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ',
      token: token
    });

  } catch (error) {
    console.error('error message', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
    });
  }
});



// Login API
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) return res.status(404).json({ message: 'ไม่พบผู้ใช้' });

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'ล็อกอินสำเร็จ', token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการล็อกอิน' });
  }
});

// ฟังก์ชัน CRUD ทั่วไป
const createCRUDRoutes = (tableName, validateFields) => {
  app.get(`/${tableName}`, async (req, res) => {
    try {
      const results = await conn.query(`SELECT * FROM ${tableName}`);
      res.json(results[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: `เกิดข้อผิดพลาดในการดึงข้อมูล ${tableName}` });
    }
  });

  app.post(`/${tableName}`, async (req, res) => {
    try {
      let data = req.body;
      const errors = validateData(data, validateFields);

      if (errors.length > 0) return res.status(400).json({ message: 'กรอกข้อมูลไม่ครบ', errors });

      const results = await conn.query(`INSERT INTO ${tableName} SET ?`, data);
      res.json({ message: 'insert ok', data: results[0] });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: `เกิดข้อผิดพลาดในการเพิ่มข้อมูล ${tableName}` });
    }
  });

  app.get(`/${tableName}/:id`, async (req, res) => {
    try {
      let id = req.params.id;
      const results = await conn.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);

      if (results[0].length === 0) return res.status(404).json({ message: 'หาไม่เจอ' });

      res.json(results[0][0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: `เกิดข้อผิดพลาดในการดึงข้อมูล ${tableName}` });
    }
  });

  app.put(`/${tableName}/:id`, async (req, res) => {
    try {
      let id = req.params.id;
      let updateData = req.body;
      const results = await conn.query(`UPDATE ${tableName} SET ? WHERE id = ?`, [updateData, id]);

      res.json({ message: `อัปเดตข้อมูล ${tableName} สำเร็จ`, data: results[0] });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: `เกิดข้อผิดพลาดในการอัปเดตข้อมูล ${tableName}` });
    }
  });

  app.delete(`/${tableName}/:id`, async (req, res) => {
    try {
      let id = req.params.id;
      const results = await conn.query(`DELETE FROM ${tableName} WHERE id = ?`, [parseInt(id)]);

      res.json({ message: `ลบข้อมูล ${tableName} สำเร็จ`, data: results[0] });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: `เกิดข้อผิดพลาดในการลบข้อมูล ${tableName}` });
    }
  });
};

// สร้าง CRUD API สำหรับ shipments, warehouses, operation_reports
createCRUDRoutes('shipments', ['product_code', 'source_destination', 'delivery_status']);
createCRUDRoutes('warehouses', ['warehouse_area', 'product_storage', 'area_arrangement']);
createCRUDRoutes('operation_reports', ['product_code', 'delivery_time', 'delivery_issue', 'delivery_efficiency']);

// เริ่มเซิร์ฟเวอร์
initMySQL().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
