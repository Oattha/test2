const BASE_URL = 'http://localhost:8000';

let mode = 'CREATE';
let selectedId = ''; //ตัวแปรแบบ Golbal ใช้ได้ทุกที่

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  console.log('id', id);
  if (id) {
    mode = 'EDIT';
    selectedId = id;

    try {
      const response = await axios.get(`${BASE_URL}/operation_reports/${id}`);
      const operation_report = response.data;

      let product_codeDOM = document.querySelector('input[name=product_code]');
      let delivery_issueDOM = document.querySelector('input[name=delivery_issue]');

      product_codeDOM.value = operation_report.product_code;
      delivery_issueDOM.value = operation_report.delivery_issue;

      let delivery_efficiencyDOMs = document.querySelectorAll('input[name=delivery_efficiency]');
      for (let i = 0; i < delivery_efficiencyDOMs.length; i++) {
        if (delivery_efficiencyDOMs[i].value === operation_report.delivery_efficiency) {
          delivery_efficiencyDOMs[i].checked = true;
          break;
        }
      }
      let delivery_timeDOMs = document.querySelectorAll('input[name=delivery_time]');
      for (let i = 0; i < delivery_timeDOMs.length; i++) {
        let delivery_time = new Date(operation_report.delivery_time);
        delivery_time.setTime(delivery_time.getTime() + 7 * 60 * 60 * 1000); // เพิ่ม 7 ชั่วโมง คอมเม้นไว้เผื่อ อ.ถาม
        delivery_timeDOMs[i].value = delivery_time.toISOString().slice(0, 16); // ตัดออกเพื่อให้เหลือ YYYY-MM-DDTHH:mm
      }      
      } catch (error) {
      console.log('error', error);
    }
  }
};

const validateData = (operation_reportData) => {
  let errors = [];
  if (!operation_reportData.product_code) {
    errors.push('กรุณากรอกรหัสสินค้า');
  }
  if (!operation_reportData.delivery_time) {
    errors.push('กรุณากรอกการส่งถึงเวลา');
  }
  if (!operation_reportData.delivery_issue) {
    errors.push('กรุณากรอกปัญหาในการขนส่ง');
  }
  if (!operation_reportData.delivery_efficiency) {
    errors.push('กรุณาให้คะแนนประสิทธิภาพของการจัดส่ง');
  }
  return errors;
};

const submitData = async () => {
  let product_codeDOM = document.querySelector('input[name=product_code]');
  let delivery_timeDOM = document.querySelector('input[name=delivery_time]');
  let delivery_issueDOM = document.querySelector('input[name=delivery_issue]');
  let delivery_efficiencyDOM = document.querySelector('input[name=delivery_efficiency]:checked') || {};

  let messageDOM = document.getElementById('message');

  try {
    let operation_reportData = {
      product_code: product_codeDOM.value,
      delivery_time: delivery_timeDOM.value,
      delivery_issue: delivery_issueDOM.value,
      delivery_efficiency: delivery_efficiencyDOM.value
    };
    console.log('submit data', operation_reportData);

    const errors = validateData(operation_reportData);

    if (errors.length > 0) {
      throw {
        message: 'กรอกข้อมูลไม่ครบ!',
        errors: errors
      };
    }

    let message = 'บันทึกข้อมูลสำเร็จ บู้วววววว!';

    if (mode === 'CREATE') {
      const response = await axios.post(`${BASE_URL}/operation_reports`, operation_reportData);
      console.log('response', response.data);
    } else {
      const response = await axios.put(`${BASE_URL}/operation_reports/${selectedId}`, operation_reportData);
      message = 'แก้ไขข้อมูลสำเร็จ!';
      console.log('response', response.data);
    }
    messageDOM.innerText = message;
    messageDOM.className = 'message success';

  } catch (error) {
    console.log('error message', error.message);
    console.log('error', error.errors);
    if (error.response) {
      console.log(error.response);
      error.message = error.response.data.message;
      error.errors = error.response.data.errors;
    }

    let htmlData = '<div>';
    htmlData += `<div>${error.message}</div>`;
    htmlData += '<ul>';
    for (let i = 0; i < error.errors.length; i++) {
      htmlData += `<li>${error.errors[i]}</li>`;
    }
    htmlData += '</ul>';
    htmlData += '<div>';

    messageDOM.innerHTML = htmlData;
    messageDOM.className = 'message danger';
  }
};

