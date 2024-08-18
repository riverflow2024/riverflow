import React from 'react'
import Select from 'react-select'

const MAX_SELECTIONS = 3

// 選項
const options = [
  { value: 'dj', label: 'DJ' },
  { value: 'streetDance', label: '街舞' },
  { value: 'rap', label: '饒舌' },
  { value: 'graffiti', label: '塗鴉' },
  { value: 'skate', label: '滑板' },
  { value: 'new', label: '新上市' },
  { value: 'discount', label: '優惠' }
]

const MultiSelectDropdown = ({ selectedOptions, onChange }) => {
  const handleChange = (selected) => {
    if (selected.length <= MAX_SELECTIONS) {
      onChange(selected)
    }
  }

  return (
    <div className='infoItem'>
      <label htmlFor='prdSort' className='editTitle'>
        商品分類：
      </label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder="選擇商品分類"
      />
    </div>
  )
}
export default MultiSelectDropdown
