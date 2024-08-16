import React from 'react'

const PrdListItem = ({ product }) => {
  const statusMap = {
    Available: { text: '上架', color: 'var(--side)' },
    Discontinued: { text: '下架', color: 'var(--err)' },
    'Out of Stock': { text: '售完', color: 'var(--cancel)' }
  }

  function getStatusInfo(status) {
    return statusMap[status]
  }

  const statusInfo = getStatusInfo(product.productStatus)
  const imagePath = `${process.env.REACT_APP_PRDIMAGE_BASE_PATH}${product.productImg}`

  return (
    <tr className='item'>
      <td>
        <img src={imagePath} alt={product.productName} className='prdImgPre' />
      </td>
      <td className='prdSort'>
        {product.categories.map((category, index, array) => (
          <React.Fragment key={index}>
            <div className='sort'>{category}</div>
            {index < array.length - 1 && <br />}
          </React.Fragment>
        ))}
      </td>
      <td className='prdId'>{product.productId}</td>
      <td className='prdName'>{product.productName}</td>
      <td className='prdPrice'>
        <span>NT$</span>{product.productPrice}
      </td>
      <td className='prdStock'>60</td>
      <td className='Status' style={{color: statusInfo.color}}>
        {statusInfo.text}
      </td>
      <td className='itemOpt'>
        <div className='flex'>
          <a href='addPrd.html'>
            <button id='btnEdit' className='btn itemOpr inline-flex'>
              <i className='fa-solid fa-pen' />
              編輯
            </button>
          </a>
          <a href='#'>
            <button id='btnView' className='btn itemOpr inline-flex'>
              <i className='fa-solid fa-eye' />
              檢視
            </button>
          </a>
        </div>
        <div className='flex'>
          <button className='btn btnSta itemOpr inline-flex'>
            <i className='fa-solid fa-arrow-down' />
            下架
          </button>
          <button className='btn itemOpr inline-flex'>
            <i className='fa-solid fa-trash'></i>刪除
          </button>
        </div>
      </td>
    </tr>
  )
}

export default PrdListItem
