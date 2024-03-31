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
      const response = await axios.get(`${BASE_URL}/warehouses/${id}`)
      const shipment = response.data

      let warehouse_areaDOM = document.querySelector('input[name=warehouse_area]')

      warehouse_areaDOM.value = shipment.warehouse_area

      let product_storageDOMs = document.querySelectorAll('input[name=product_storage]')
      let area_arrangementDOMs = document.querySelectorAll('input[name=area_arrangement]')

      for (let i = 0; i < product_storageDOMs.length; i++) {
        if (product_storageDOMs[i].value == shipment.product_storage) {
            product_storageDOMs[i].checked = true
        }
      }
      for (let i = 0; i < area_arrangementDOMs.length; i++) {
        if (area_arrangementDOMs[i].value == shipment.area_arrangement) {
            area_arrangementDOMs[i].checked = true
        }
      }

    } catch (error) {
      console.log('error', error)
    }
  }
}
  const validateData = (warehouseData) => {
    let errors = []
    if (!warehouseData.warehouse_area) {
      errors.push('กรุณากรอกพื้นที่ในคลัง')
    }
    if (!warehouseData.product_storage) {
      errors.push('กรุณาเลือกการจัดเก็บสินค้า')
    }
    if (!warehouseData.area_arrangement) {
      errors.push('การจัดเรียงพื้นที่')
    }
    return errors
  }

  const submitData = async () => {
    let warehouse_areaDOM = document.querySelector('input[name=warehouse_area]')
    let product_storage = document.querySelector('input[name=product_storage]:checked') || {}
    let area_arrangementDOM = document.querySelector('input[name=area_arrangement]:checked') || {}


    let messageDOM = document.getElementById('message')

    try {
      let warehouseData = {
        warehouse_area: warehouse_areaDOM.value,
        product_storage: product_storage.value,
        area_arrangement: area_arrangementDOM.value
      }
      console.log('submit data', warehouseData)

      const errors = validateData(warehouseData)

      if (errors.length > 0) {
        throw {
          message: 'กรอกข้อมูลไม่ครบ!',
          errors: errors
        }
      }

      let message = 'บันทึกข้อมูลสำเร็จ บู้วววววว!'

      if(mode == 'CREATE'){
        const response = await axios.post(`${BASE_URL}/warehouses`, warehouseData)
        console.log('response', response.data)
      } else {
        const response = await axios.put(`${BASE_URL}/warehouses/${selectedId}`, warehouseData)
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
