const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

let conn = null;

// Initialize MySQL connection
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 7777
  });
};

// Validate user data
const validateData1 = (shipmentData) => {
  let errors = [];
  if (!shipmentData.product_code) {
    errors.push('กรุณากรอกรหัสสินค้า');
  }
  if (!shipmentData.source_destination) {
    errors.push('กรุณากรอกต้นทาง-ปลายทาง')
  }
  if (!shipmentData.delivery_status) {
    errors.push('กรุณาเลือกสถานะการจัดส่ง')
  }
  return errors;
};

const validateData2 = (userData) => {
  let errors = [];
  if (!userData.warehouse_area) {
    errors.push('กรุณากรอกพื้นที่ในคลัง');
  }
  if (!userData.product_storage) {
    errors.push('กรุณาเลือกการจัดเก็บสินค้า')
  }
  if (!userData.area_arrangement) {
    errors.push('กรุณาเลือกการจัดเรียงพื้นที่')
  }
  return errors;
};

const validateData3 = (operationData) => {
  let errors = [];
  if (!operationData.product_code) {
    errors.push('กรุณากรอกการรหัสสินค้า');
  }
  if (!operationData.delivery_time) {
    errors.push('กรุณากรอกการส่งถึงเวลา');
  }
  if (!operationData.delivery_issue) {
    errors.push('กรุณากรอกปัญหาในการขนส่ง')
  }
  if (!operationData.delivery_efficiency) {
    errors.push('กรุณาเลือกประสิทธิภาพของการจัดส่ง')
  }
  return errors;
};

// GET all shipments
app.get('/shipments', async (req, res) => {
  try {
    const results = await conn.query('SELECT * FROM shipments');
    res.json(results[0]);
  } catch (error) {
    console.error('error message', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลการจัดส่งทั้งหมด'
    });
  }
});

app.get('/warehouses', async (req, res) => {
  try {
    const results = await conn.query('SELECT * FROM warehouses');
    res.json(results[0]);
  } catch (error) {
    console.error('error message', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลรายงานการดำเนินงานทั้งหมด'
    });
  }
});

app.get('/operation_reports', async (req, res) => {
  try {
    const results = await conn.query('SELECT * FROM operation_reports');
    res.json(results[0]);
  } catch (error) {
    console.error('error message', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลการจัดส่งทั้งหมด'
    });
  }
});
// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/shipments', async (req, res) => {
  try {
      let shipments = req.body

      const errors = validateData1(shipments)
      if (errors.length > 0) {
        throw { 
          message: 'กรอกข้อมูลไม่ครบ',
          errors: errors }
      }
      const results = await conn.query('INSERT INTO shipments SET ?', shipments)
      res.json({
        message: 'insert ok',
        data: results[0]
      })
  } catch (error) {
      const errorMessage = error.message || 'something wrong'
      const errors = error.errors || []
      console.error('error message', error.message)
      res.status(500).json({
        message: errorMessage,
        errors: errors
      })
  }
})

app.post('/warehouses', async (req, res) => {
  try {
      let warehouses = req.body

      const errors = validateData2(warehouses)
      if (errors.length > 0) {
        throw { 
          message: 'กรอกข้อมูลไม่ครบ',
          errors: errors }
      }
      const results = await conn.query('INSERT INTO warehouses SET ?', warehouses)
      res.json({
        message: 'insert ok',
        data: results[0]
      })
  } catch (error) {
      const errorMessage = error.message || 'something wrong'
      const errors = error.errors || []
      console.error('error message', error.message)
      res.status(500).json({
        message: errorMessage,
        errors: errors
      })
  }
})

app.post('/operation_reports', async (req, res) => {
  try {
      let operation_reports = req.body

      const errors = validateData3(operation_reports)
      if (errors.length > 0) {
        throw { 
          message: 'กรอกข้อมูลไม่ครบ',
          errors: errors }
      }
      const results = await conn.query('INSERT INTO operation_reports SET ?', operation_reports)
      res.json({
        message: 'insert ok',
        data: results[0]
      })
  } catch (error) {
      const errorMessage = error.message || 'something wrong'
      const errors = error.errors || []
      console.error('error message', error.message)
      res.status(500).json({
        message: errorMessage,
        errors: errors
      })
  }
})
// GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/shipments/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM shipments WHERE id = ?', id)

    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }

    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

app.get('/warehouses/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM warehouses WHERE id = ?', id)

    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }

    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

app.get('/operation_reports/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM operation_reports WHERE id = ?', id)

    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }

    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

// PUT to update shipment status
app.put('/shipments/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let updateShipment = req.body;
    const results = await conn.query(
      'UPDATE shipments SET ? WHERE id = ?',
      [updateShipment, id]
    );
    res.json({
      message: 'การอัปเดตสถานะการจัดส่งเสร็จสมบูรณ์',
      data: results[0]
    });
  } catch (error) {
    console.error('error message', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการอัปเดตสถานะการจัดส่ง'
    });
  }
});

app.put('/warehouses/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let updatewarehouses = req.body;
    const results = await conn.query(
      'UPDATE warehouses SET ? WHERE id = ?',
      [updatewarehouses, id]
    );
    res.json({
      message: 'การอัปเดตข้อมูลพื้นที่เก็บสินค้าเสร็จสมบูรณ์', 
      data: results[0]
    });
  } catch (error) {
    console.error('error message', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลพื้นที่เก็บสินค้า'
    });
  }
});

app.put('/operation_reports/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let updateoperation_reports = req.body;
    const results = await conn.query(
      'UPDATE operation_reports SET ? WHERE id = ?',
      [updateoperation_reports, id]
    );
    res.json({
      message: 'การอัปเดตรายงานการดำเนินงานเสร็จสมบูรณ์',
      data: results[0]
    });
  } catch (error) {
    console.error('error message', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการอัปเดตรายงานการดำเนินงาน'
    });
  }
});

// DELETE a shipment
app.delete('/shipments/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query('DELETE from shipments WHERE id = ?', parseInt(id));
    res.json({
      message: 'การลบการจัดส่งเสร็จสมบูรณ์',
      data: results[0]
    });
  } catch (error) {
    console.error('error message', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการลบการจัดส่ง'
    });
  }
});

app.delete('/warehouses/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query('DELETE from warehouses WHERE id = ?', parseInt(id));
    res.json({
      message: 'การลบข้อมูลพื้นที่เก็บสินค้าเสร็จสมบูรณ์',
      data: results[0]
    });
  } catch (error) {
    console.error('error message', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการลบข้อมูลพื้นที่เก็บสินค้า'
    });
  }
});

app.delete('/operation_reports/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query('DELETE from operation_reports WHERE id = ?', parseInt(id));
    res.json({
      message: 'การลบรายงานการดำเนินงานเสร็จสมบูรณ์',
      data: results[0]
    });
  } catch (error) {
    console.error('error message', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการลบรายงานการดำเนินงาน'
    });
  }
});
// Start the server
app.listen(port, async () => {
  await initMySQL();
  console.log('เซิร์ฟเวอร์ HTTP ทำงานที่พอร์ต: ' + port);
});
