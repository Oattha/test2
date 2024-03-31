const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE'
let selectedId = '' //ตัวแปรแบบ Golbal ใช้ได้ทุกที่

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  console.log('id', id)
  if (id) {
    mode = 'EDIT'
    selectedId = id

    try {
      const response = await axios.get(`${BASE_URL}/shipments/${id}`)
      const shipment = response.data

      let product_codeDOM = document.querySelector('input[name=product_code]')
      let source_destinationDOM = document.querySelector('input[name=source_destination]')

      product_codeDOM.value = shipment.product_code
      source_destinationDOM.value = shipment.source_destination

      let delivery_statusDOMs = document.querySelectorAll('input[name=delivery_status]')

      for (let i = 0; i < delivery_statusDOMs.length; i++) {
        if (delivery_statusDOMs[i].value == shipment.delivery_status) {
          delivery_statusDOMs[i].checked = true
        }
      }

    } catch (error) {
      console.log('error', error)
    }
  }
}
  const validateData = (shipmentData) => {
    let errors = []
    if (!shipmentData.product_code) {
      errors.push('กรุณากรอกรหัสสินค้า')
    }
    if (!shipmentData.source_destination) {
      errors.push('กรุณากรอกต้นทาง-ปลายทาง')
    }
    if (!shipmentData.delivery_status) {
      errors.push('กรุณาเลือกสถานะการจัดส่ง')
    }
    return errors
  }

  const submitData = async () => {
    let product_codeDOM = document.querySelector('input[name=product_code]')
    let source_destinationDOM = document.querySelector('input[name=source_destination]')
    let delivery_statusDOM = document.querySelector('input[name=delivery_status]:checked') || {}

    let messageDOM = document.getElementById('message')

    try {
      let shipmentData = {
        product_code: product_codeDOM.value,
        source_destination: source_destinationDOM.value,
        delivery_status: delivery_statusDOM.value
      }
      console.log('submit data', shipmentData)

      const errors = validateData(shipmentData)

      if (errors.length > 0) {
        throw {
          message: 'กรอกข้อมูลไม่ครบ!',
          errors: errors
        }
      }

      let message = 'บันทึกข้อมูลสำเร็จ บู้วววววว!'

      if(mode == 'CREATE'){
        const response = await axios.post(`${BASE_URL}/shipments`, shipmentData)
        console.log('response', response.data)
      } else {
        const response = await axios.put(`${BASE_URL}/shipments/${selectedId}`, shipmentData)
        message = 'แก้ไขข้อมูลสำเร็จ!'
        console.log('response', response.data)
      }
      messageDOM.innerText = message
      messageDOM.className = 'message success'

    } catch (error) {
      console.log('error message', error.message)
      console.log('error', error.erros)
      if (error.response) {
        console.log(error.response)
        error.message = error.response.data.message
        error.errors = error.response.data.errors
      }

      let htmlData = '<div>'
      htmlData += `<div>${error.message}</div>`
      htmlData += '<ul>'
      for (let i = 0; i < error.errors.length; i++) {
        htmlData += `<li>${error.errors[i]}</li>`
      }
      htmlData += '</ul>'
      htmlData += '<div>'


      messageDOM.innerHTML = htmlData
      messageDOM.className = 'message danger'
    }
  }
